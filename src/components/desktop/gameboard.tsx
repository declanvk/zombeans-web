import * as React from "react";
import * as io from "socket.io-client";
import { deflateRaw } from "zlib";

const CANVAS_ID = 'z-desktop-gameboard-canvas-id';
export
namespace GameBoard {

  export
  interface IProps {
    room_code: string;
    gameboard_ready?: () => void;
  }
}

export
class GameBoard extends React.Component<GameBoard.IProps, undefined> {

  socket: SocketIO.Socket;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  players = {};
  boardSize = [0,0];
  playerRadius:number
  gameState = "";


  constructor(props: any) {
    super(props);
    this.socket = io('/viewer');
   // this.socket = io('some endpoint');
  }

  componentDidMount() {
    // Send room code over socket
    this.canvas = (document.getElementById(CANVAS_ID) as HTMLCanvasElement);
    this.ctx = this.canvas.getContext('2d');
    this.socket.on('game_starting', (data: any) => {
      console.log(data);
      console.log("game starting message");
    });
    this.socket.on('game_tick', (data: any) => {
      console.log("here");
      console.log(data);
      this.update_player_pos(data["player_pos_data"])
      console.log(this.players);
      console.log(this.boardSize);
      this.draw();
    });
    this.socket.on("game_view_response", (data:any) => {
      console.log(data);
      data = data["aux_data"]
      console.log(data);
      var cur_players = data["current_players"]
      for(var player = 0; player < cur_players.length; player++){
        this.players[cur_players[player]["player_id"]] = 
        {
          "id": cur_players[player]["player_id"],
          "user_name": cur_players[player]["user_name"],
          "character": cur_players[player]["character"],
          "isZombie": false,
          "position":{
            "x":0,
            "y":0
          }
        }
      }
      console.log(this.players)
      var board_data = data["board_description"];
      this.boardSize[0] = board_data["width"];
      this.boardSize[1] = board_data["height"];
      this.playerRadius = board_data["player_radius"];
      this.props.gameboard_ready();
    });
    this.socket.emit("request_game_view", {"room_code":this.props.room_code})
    this.draw();

  }
  update_player_pos(data:any){
    console.log("here");
    console.log(data);
    for(var player in data){
      this.players[player]["position"] = data[player]["position"];
      this.players[player]["isZombie"] = data[player]["isZombie"];
    }
  }
  draw(){
    this.ctx.moveTo(0,0);
    this.ctx.clearRect(0,0,this.boardSize[0], this.boardSize[1]);
    this.makeBoard();
    for(var i in this.players){
        this.drawPlayer(this.players[i]["position"], this.playerRadius, i);
    }

  }
  makeBoard(){
    this.ctx.moveTo(10,10);
    this.ctx.lineTo(this.boardSize[0], 10);
    this.ctx.lineTo(this.boardSize[0], this.boardSize[1]);
    this.ctx.lineTo(10, this.boardSize[1]);
    this.ctx.lineTo(10, 10);
    this.ctx.stroke();
  }
  drawPlayer(pos:any, radius:number, id:string){
    console.log(id)
    console.log(pos);
    console.log(radius)
    this.ctx.beginPath()
    if(this.players[id]["isZombie"] === true){
      this.ctx.fillStyle = 'green';
    }else{
      this.ctx.fillStyle = 'brown';
    }
    this.ctx.arc(pos.x, pos.y, radius, 0, 2*Math.PI);
    this.ctx.stroke();
  }
  render() {
    return (
      <div className={'z-desktop-gameboard transition-item'}>
        <canvas id={CANVAS_ID} height={800} width={1200}/>
      </div>
    );
  }
}