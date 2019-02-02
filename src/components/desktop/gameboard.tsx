import * as React from "react";
import * as io from "socket.io-client";

const CANVAS_ID = 'z-gameboard-canvas-id';

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

  render() {
    return (
      <div>
        <canvas id={CANVAS_ID} height={800} width={1024}
            className={'z-gameboard-canvas'}/>
      </div>
    );
  }
}