import * as React from "react";
import * as io from "socket.io-client";

const CANVAS_ID = 'z-desktop-gameboard-canvas-id';

export
namespace GameBoard {

  export
  interface IProps {
    room_code: string;
  }
}

export
class GameBoard extends React.Component<GameBoard.IProps, undefined> {

  socket: SocketIO.Socket;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  players:any;
  boardSize:[number, number];
  playerRadius:number


  constructor(props: any) {
    super(props);
   // this.socket = io('some endpoint');
  }

  componentDidMount() {
    // Send room code over socket

    this.canvas = (document.getElementById(CANVAS_ID) as HTMLCanvasElement);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(10, 10, 20, 20);
  }
  draw(){
    this.ctx.moveTo(0,0);
    this.ctx.clearRect(0,0,this.boardSize[0], this.boardSize[1]);
    for(var i in this.players){
        this.drawPlayer(this.players[i]["position"], this.playerRadius, i);
    }

  }
  makeBoard(){
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(this.boardSize[0], 0);
    this.ctx.lineTo(this.boardSize[0], this.boardSize[1]);
    this.ctx.lineTo(0, this.boardSize[1]);
    this.ctx.lineTo(0, 0);
    this.ctx.stroke();
  }
  drawPlayer(pos:[number, number], radius:number, id:string){
    this.ctx.beginPath()
    if(this.players[id]["isZombie"] === true){
      this.ctx.fillStyle = 'green';
    }else{
      this.ctx.fillStyle = 'brown';
    }
    this.ctx.arc(pos[0], pos[1], radius, 0, 2*Math.PI);
    this.ctx.fill();
  }
  render() {
    return (
      <div className={'z-desktop-gameboard transition-item'}>
        <canvas id={CANVAS_ID} height={800} width={1024}
            className={'z-desktop-gameboard-canvas'}/>
      </div>
    );
  }
}