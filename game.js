const Room = require('./room.js');
const CategoriesEnum = require('./public/categoriesEnum.js');
const fs = require('fs');

var game = {};
const IDLENGTH = 8;
var rooms = [];

game.init = function (server) {
    // socket.io setup
    var io = require('socket.io').listen(server);

    //load json in sync
    let rawdata = fs.readFileSync('data.json','utf8');
    let data = JSON.parse(rawdata);

    //create rooms
    initRooms(data);
    
    //io endpoints
    io.on('connection', function(socket){
        console.log(`a client connected : ${socket.handshake.address}`);

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
                        room.welcome(socket,data.username,room.round);

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
                requestedRoomToLeave[0].farewell(socket.id)
            }
        });

        socket.on('disconnect', function(){
            console.log(`a user disconnected : ${socket.handshake.address}`);
            for(let room of rooms){
                room.farewell(socket.id)
            }
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
    }); 
}

module.exports = game;




function initRooms(data){
    createRooms(5,CategoriesEnum.mangas,data);
    createRooms(5,CategoriesEnum.games,data);
}

function createRooms(number, category, data){
    let id;
    for (let i = 0; i < number; i++) {       
        do{
            id = generateId(IDLENGTH);
        }while(rooms.includes(id));
        var room = new Room(id,category,data)
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



