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
  players:any;
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
      data =  data["board_description"];
      this.boardSize[0] = data["width"];
      this.boardSize[1] = data["height"];
      this.playerRadius = data["player_radius"];
      console.log("game starting message");
    });
    this.socket.on('game_tick', (data: any) => {
      console.log("here");
      console.log(data);
      this.players = data["player_pos_data"]
      console.log(this.players);
      console.log(this.boardSize);
      this.draw();
    });
    this.socket.on("game_view_response", (data:any) => {
      console.log(data);
      this.props.gameboard_ready();
    });
    this.socket.emit("request_game_view", {"room_code":this.props.room_code})
    this.draw();

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