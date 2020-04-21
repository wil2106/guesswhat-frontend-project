class Player{ 
    constructor(socket,username, round, isGameMaster = false) { 
       this._points = 0; 
       this._username = username;
       let r = getRandomValue(0,255);
       let g = getRandomValue(0,255);
       let b = getRandomValue(0,255);
       this._color = `rgb(${r},${g},${b})`;
       this._joinedAtRound = round;
       this._socket = socket;
       this._isGameMaster = isGameMaster;
    }
    get points(){
      return this._points;
    }

    set points(points) {
      this._points = points;
    }

    get username(){
      return this._username;
    }

    get joinedAtRound(){
      return this._joinedAtRound;
    }

    get socket(){
      return this._socket;
    }

    get color(){
      return this._color;
    }

    get isGameMaster(){
      return this._isGameMaster;
    }

 }

function getRandomValue(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}
 
 module.exports = Player;