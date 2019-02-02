import * as React from "react";
import * as io from "socket.io-client";

const CANVAS_ID = 'z-gameboard-canvas-id';

export
namespace Controller {
  export
  interface IState {
    screen_orientation: 'vertical' | 'horizontal';
  }
  export
  interface IProps {
    room_code: string;
    user_name: string;
    character: string;
  }
}

export
class Controller extends React.Component<Controller.IProps, Controller.IState> {

  socket: SocketIO.Socket;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(props: any) {
    super(props);

    this.state = {
      screen_orientation: screen.orientation.angle == 0 ? 'vertical' : 'horizontal'
    }
   // this.socket = io('some endpoint');
  }

  componentDidMount() {
    window.addEventListener('orientationchange', () => {
      this.setState({
        screen_orientation: screen.orientation.angle == 0 ? 'vertical' : 'horizontal'
      });
    })
  }

  render() {
    if (this.state.screen_orientation == 'vertical') {
      return (
        <div>
          <h1>Rotate Screen!</h1>
        </div>
      )
    }
    return (
      <div className='z-mobile-controller transition-item' >
        <p>{this.props.user_name}</p>
        <p>{this.props.room_code}</p>
      </div>
    );
  }
}