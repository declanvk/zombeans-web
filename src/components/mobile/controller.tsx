import * as React from "react";
import * as io from "socket.io-client";

const CANVAS_ID = 'z-gameboard-canvas-id';

export
namespace MobileController {

  export
  interface IProps {
    room_code: string;
  }
}

export
class MobileController extends React.Component<MobileController.IProps, undefined> {

  socket: SocketIO.Socket;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(props: any) {
    super(props);
   // this.socket = io('some endpoint');
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}