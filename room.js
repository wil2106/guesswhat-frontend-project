const Player = require('./player.js')
const { createCanvas, loadImage } = require('canvas');
var SAMPLESIZE = 20;

class Room{ 
   constructor(id,category,data,isPrivate = false) { 
   	//this._io = io;
   	this._id = id;
      this._isPrivate = isPrivate;
      this._category = category;
      this._data = data;
      this._playerLimit = 5;
      this._pixelisedImage = null;
      this._rawImage = null;
      this._canvas = null;
      this._canvasWidth = 600;
      this._timer = null;
      this._secretWords = []; //or or more valid word
      this._renderPeriod = 1000; //ms
      this._sampleSize = SAMPLESIZE;//size of pixel
      this._sampleSizeStep = 1;
      this._round = 1;
      this._players = [];
      this._gameInProgress = false;
      this._skipRequests = [];
    } 

   isFull(){
      return (this._players.length === this._playerLimit)
   }
   isUsernameAlreadyTaken(username){
      let players = this._players.filter( player => {
         return (player.username === username);
      });
      return (players.length>0)
   }
   welcome(socket,username,round,isGameMaster = false){
      let player = new Player(socket,username,round,isGameMaster);
      this._players.push(player)
      console.log(`${username} joined room : ${this._id}`);
      
      //boadcast to every one the new player username
      for(let aPlayer of this._players){
         if(aPlayer.username === username)
            continue;
         aPlayer.socket.emit('playerJoined',{joined: true,playerUsername : username});
      }

      //emit players info to joining player
      var playerList = [];
      for(let aPlayer of this._players){
         let playerInfo = {username:aPlayer.username,points:aPlayer.points};
         playerList.push(playerInfo);
      }
      socket.emit('playerList',{playerList :playerList});
   
      //if first one to join
      if(this._players.length===1 && !this._isPrivate){
         this.startGame();
      }else if(this._players.length>1){
         //emit current image to player
         socket.emit('imageUpdate',{image : this._pixelizedImage});
      }
   }

   farewell(socketId){
      var player = this.getPlayerBysocketId(socketId);
      if(player != null){
            console.log(`${player.object.username} left room : ${this._id}`);
            this._players.splice(player.index, 1);
            //if last one to leave
            if(this._players.length===0 && this._gameInProgress){
               this.endGame();
            }else {
               //broadcast to every player that a player just left 
               for(let aPlayer of this._players){
                  aPlayer.socket.emit('playerLeft',{joined: false, playerUsername : player.object.username});
               }
            }
            return true;
      }
      return false;
   }

   startGame(){
       console.log(`Room ${this._id} : game started`);
       this._gameInProgress = true;
       this.startNewRound();
   }

   endGame(){
      clearInterval(this._timer);
      this._gameInProgress = false;
      console.log(`Room ${this._id} : game ended`);
   }


   startNewRound(){
      //stop timer
      clearInterval(this._timer);
      //clear skip requests
      this._skipRequests = [];
      //initialize sample size
      this._sampleSize = SAMPLESIZE;

      //choose randomly a new image from the right category
      let randomImageId = Math.floor(Math.random()*(this._data[this._category].length));
      var imageData = this._data[this._category][randomImageId];

      //set secret words to find
      this._secretWords = imageData.secretWords;

      //broadcast new round is starting
      this.broadcastNewRound();

      //load image
      loadImage(imageData.link).then((image) => {
         this._rawImage = image;
         //compute canvas size
         const scaleFactor = this._canvasWidth / this._rawImage.width;
         var computedCanvasHeight = this._rawImage.height * scaleFactor;
         this._canvas = createCanvas(this._canvasWidth, computedCanvasHeight)
         //start timer
         this._timer = setInterval(this.render.bind(this), this._renderPeriod); //bind room object reference
         
      })
   }

   render(finalRender = false){

         //if sample size <= 1 means that image have already been rendered and sent without pixelisation so no need to re render
         if(this._sampleSize>1){
            
            //if final Render, render without pixelisation 
            if(finalRender)
               this._sampleSize = 1;

            var ctx = this._canvas.getContext('2d')
            ctx.drawImage(this._rawImage, 0, 0, this._canvas.width, this._canvas.height);
   
            for(let y=0;y<this._canvas.height;y+=this._sampleSize){
               for(let x=0;x<this._canvas.width;x+=this._sampleSize){
   
                  const data = ctx.getImageData(x, y, this._sampleSize, this._sampleSize).data;
   
                  const components = data.length;
   
                  let wR = 0;
                  let wG = 0;
                  let wB = 0;
                  let wTotal = 0;
   
                  for (let i = 0; i < components; i += 4) {
                      // A single pixel (R, G, B, A) will take 4 positions in the array:
                      const r = data[i];
                      const g = data[i + 1];
                      const b = data[i + 2];
                      const a = data[i + 3];    
                      
                      // Update components for alpha-weighted average:
                      const w = a / 255;
                      wR += r * w;
                      wG += g * w;
                      wB += b * w;
                      wTotal += w;
                   }
   
                   const pixelsPerChannel = components / 4;
                   wR = wR / wTotal | 0;
                   wG = wG / wTotal | 0;
                   wB = wB / wTotal | 0;
   
                  ctx.fillStyle = "rgb("+wR+","+wG+","+wB+")";
                  ctx.fillRect(x, y, this._sampleSize, this._sampleSize);
               }
            }
   
            this._pixelisedImage = this._canvas.toDataURL();
            //once image is pixelized, broadcast to to all players of the room
            this.broadcastImage();
            
            //decrease sample size
            this._sampleSize -=this._sampleSizeStep;
   
            //stop timer
            if(this._sampleSize<=1)
               clearInterval(this._timer);
         }

         //if final render start new round in 2 seconds
         if(finalRender){
            setTimeout(()=>{
               this.startNewRound();
            }, 2000);
         }     
   }


   submitMessage(socketId,text){
      let player = this.getPlayerBysocketId(socketId);
      if(player != null && this._gameInProgress){
         if(this._secretWords.includes(text.toLowerCase())){
            //build message
            var message = {
               playerUsername : player.object.username,
               playerColor : player.object.color,   
               text : text,
               valid : true
            }
            
            //broadcast message
            this.broadcastMessage(message);
            //increase winner points
            player.object.points+=1;

            //build point update
            var pointUpdate = {
               playerUsername : player.object.username,
               points :  player.object.points
            }

            //render with true parameter to render depixelised image and start a new round
            this.render(true);

            //broadcast point update
            this.broadcastPointUpdate(pointUpdate);
         } else {
            //build message
            var message = {
               playerUsername : player.object.username,
               playerColor : player.object.color,   
               text : text,
               valid : false
            }
            //broadcast message
            this.broadcastMessage(message);
         }
      }
   }


   broadcastImage(){
      for(var player of this._players){
         player.socket.emit('imageUpdate',{image : this._pixelisedImage});
      }
   }

   broadcastMessage(message){
      for(var player of this._players){
         player.socket.emit('message',{message : message});
      }
   }

   broadcastPointUpdate(pointUpdate){
      for(var player of this._players){
         player.socket.emit('pointUpdate',{pointUpdate : pointUpdate});
      }
   }

   broadcastSkipVotesUpdate(username){
      for(var player of this._players){
         player.socket.emit('playerVotedToSkip',{username : username, skipCount : this._skipRequests.length, playerCount: this._players.length});
      }
   }

   broadcastNewRound(){
      for(var player of this._players){
         player.socket.emit('newRoundStarting');
      }
   }


   getPlayerBysocketId(socketId){
      for (let i = 0; i < this._players.length; i++) {
         if(this._players[i].socket.id ===  socketId){
            var player = {index:i, object:this._players[i]}
            return player;
         }
      }
      return null;
   }

   isPlayerTheGameMaster(socketId){
      let player = this.getPlayerBysocketId(socketId);
      if(player!=null){
         return player.object.isGameMaster;
      }
      return false;
   }

   voteToSkip(socketId){
      var player = this.getPlayerBysocketId(socketId);
      if(!this._skipRequests.includes(player.object.username)){
         this._skipRequests.push(player.object.username);
         
         this.broadcastSkipVotesUpdate(player.object.username);

         if(this._skipRequests.length==this.players.length)
            this.startNewRound();
      }
   }

   get id(){
   		return this._id;
   }

   get image(){
      return this._image;
   }

   get category(){
    return this._category;
    }

   get numberOfPlayers(){
   		return this._players.length;
   }

   get isPrivate(){
      return this._isPrivate;
   }
   
   get players(){
      return this._players;
   }

   get playerLimit(){
      return this._playerLimit;
   }
   
   get round(){
      return this._round;
   }

   get roomInfo(){
      let roomInfo = {
         id : this._id,
         playerLimit : this._playerLimit,
         nbPlayers : this._players.length,
         category : this._category
      }
      return roomInfo;
   }
} 


module.exports = Room;