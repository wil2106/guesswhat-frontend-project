const Room = require('./room.js');
const CategoriesEnum = require('./public/categoriesEnum.js');
const fs = require('fs');

var game = {};
const IDLENGTH = 8;
var rooms = [];
var clientsOnLobby = [];

game.init = function (server) {
    // socket.io setup
    var io = require('socket.io').listen(server);
    
    //load json in sync
    let rawdata = fs.readFileSync('data.json','utf8');
    let jsonData = JSON.parse(rawdata);

    //create rooms
    initRooms(jsonData);
    
    //io endpoints
    io.on('connection', function(socket){
        console.log(`a client connected : ${socket.handshake.address}`);

        console.log(`client ${socket.handshake.address} joined lobby`);
        clientsOnLobby.push(socket);

        socket.on('getRoomsByCategory', function(data){
            let roomsByCategory = rooms.filter( room => {
                return (room.category === data.category && !room.isPrivate);
            });
            let roomsInfoByCategory = roomsByCategory.map(room=>{
                return room.roomInfo; 
            });
            socket.emit('roomsByCategory',{ rooms: roomsInfoByCategory});
        });

        socket.on('joinRoom', function(data){
            let roomId = data.roomId;
            //check that room exists
            let requestedRoomToJoin = rooms.filter( room => {
                return (room.id === roomId);
            });
            if(requestedRoomToJoin.length>0){
                var room = requestedRoomToJoin[0];

                if(!room.isFull()){
                    if(!room.isUsernameAlreadyTaken(data.username)){
                        
                        console.log(`client ${socket.handshake.address} left lobby`);
                        removeClientFromLobby(socket.id);
                        room.welcome(socket,data.username,room.round);
                        broadcastRoomPlayersUpdate(room);
                        
                        socket.emit('joinRoomResponse',{error : false, message: '', room: room.id});
                    }
                    else {
                        socket.emit('joinRoomResponse',{error : true, message: 'Username already existing'});
                    }
                        
                }else
                    socket.emit('joinRoomResponse',{error : true, message: 'Room is full'});
            

            }else{
                socket.emit('joinRoomResponse',{error : true, message: 'wrong room id or room not existing anymore'});
            }
        });

        socket.on('leaveRoom', function(data){
            
            let roomId = data.roomId;
            //get room
            let requestedRoomToLeave = rooms.filter( room => {
                return (room.id === roomId);
            });
            if(requestedRoomToLeave.length>0){
                if(requestedRoomToLeave[0].farewell(socket.id))
                    broadcastRoomPlayersUpdate(requestedRoomToLeave[0]);

            }
            //if private room
            if(requestedRoomToLeave[0].isPrivate && requestedRoomToLeave[0].players.length==0){
                for(let i=0;i<rooms.length;i++){
                    if(rooms[i].id == requestedRoomToLeave[0].id){
                        console.log('Destroying private room '+requestedRoomToLeave[0].id);
                        rooms.splice(i, 1);
                        break;
                    }
                }
            }

            //put client socket in lobby
            console.log(`client ${socket.handshake.address} joined lobby`);
            clientsOnLobby.push(socket);
            
        });

        socket.on('disconnect', function(){
            //remove client socket of lobby if exists
            console.log(`client ${socket.handshake.address} left lobby`);
            removeClientFromLobby(socket.id);
            //remove client socket from room where exists
            for(let room of rooms){
                if(room.farewell(socket.id)){
                    //if private room
                    if(room.isPrivate && room.players.length==0){
                        for(let i=0;i<rooms.length;i++){
                            if(rooms[i].id == room.id){
                                console.log('Destroying private room '+room.id);
                                rooms.splice(i, 1);
                                break;
                            }
                        }
                    }else
                        broadcastRoomPlayersUpdate(room);
                }
                    
            }
            console.log(`a client disconnected : ${socket.handshake.address}`);
        });

        socket.on('submitMessage', function(data){
            let requestedRoom = rooms.filter( room => {
                return (room.id === data.roomId);
            });
            if(requestedRoom.length>0){
                requestedRoom[0].submitMessage(socket.id,data.text);
            }
        });

        socket.on('voteToSkip', function(data){
            let requestedRoom = rooms.filter( room => {
                return (room.id === data.roomId);
            });
            if(requestedRoom.length>0){
                requestedRoom[0].voteToSkip(socket.id);
            }
        });

        socket.on('getPrivateRoomId', function(data){
            let id;
            do{
                id = generateId(IDLENGTH);
            }while(rooms.includes(id));
            let message = {
                roomId : id
            }
            socket.emit('privateRoomId',message);
        });

        socket.on('createPrivateRoom', function(data){
            var room = new Room(data.roomId,data.category,jsonData,true)
            console.log(`New private room created, id: ${room.id}, category: ${room.category}`);
            rooms.push(room);
            console.log(`client ${socket.handshake.address} left lobby`);
            removeClientFromLobby(socket.id);
            room.welcome(socket,data.username,room.round,true);//true for gamemaster
            socket.emit('joinRoomResponse',{error : false, message: '', room: room.id});
        });

        socket.on('startPrivateGame', function(data){
            let requestedRoomToStart = rooms.filter( room => {
                return (room.id === data.roomId);
            });
            if(requestedRoomToStart.length>0){
                if(requestedRoomToStart[0].isPlayerTheGameMaster(socket.id)){
                    requestedRoomToStart[0].startGame();
                }
            }
        });

        socket.on('getCategories', function(data){
            let categories = []
            for (let [key, value] of Object.entries(CategoriesEnum)) {
                categories.push(value);
            }
            socket.emit('categories',categories);
        });


    }); 
}

module.exports = game;




function initRooms(jsonData){
    createRooms(5,CategoriesEnum.mangas,jsonData);
    createRooms(5,CategoriesEnum.games,jsonData);
}

function createRooms(number, category, jsonData){
    let id;
    for (let i = 0; i < number; i++) {       
        do{
            id = generateId(IDLENGTH);
        }while(rooms.includes(id));
        var room = new Room(id,category,jsonData)
        console.log(`New room created, id: ${room.id}, category: ${room.category}`);
        rooms.push(room);
    }
}


function generateId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


function removeClientFromLobby(socketId) {
    for (let i = 0; i < clientsOnLobby.length; i++) {
       if(clientsOnLobby[i].id ===  socketId){ 
          clientsOnLobby.splice(i, 1);
          return;
       }
    }
    return null;
 }



 function broadcastRoomPlayersUpdate(room){
    for(let socket of clientsOnLobby){
        socket.emit('roomPlayersUpdate',room.roomInfo);
    }
}


