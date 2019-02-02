import * as React from "react";
import * as io from "socket.io-client";

const CANVAS_ID = 'z-gameboard-canvas-id';

export
namespace Controller {

  export
  interface IProps {
    room_code: string;
    user_name: string;
  }
}

export
class Controller extends React.Component<Controller.IProps, any> {

  socket: SocketIO.Socket;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(props: any) {
    super(props);
   // this.socket = io('some endpoint');
  }

  render() {
    return (
      <div className='z-mobile-controller transition-item' >
        <p>{this.props.user_name}</p>
        <p>{this.props.room_code}</p>
      </div>
    );
  }
}