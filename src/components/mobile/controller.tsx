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
      <div className='z-mobile-controller transition-item'
          style={{height: window.innerHeight, width: window.innerWidth}}>
        <div className='z-mobile-controller-player'>
          <p>{this.props.user_name}</p>
        </div>
        <div className='z-mobile-controller-controller'>
          <DirectionalPad on_press={(dir)=>{console.log(dir)}}
              on_release={(dir)=>{console.log(dir)}}/>

        </div>
      </div>
    );
  }
}

export
namespace DirectionalPad {
  export
  interface IProps {
    on_press: (button: string) => void;
    on_release: (button: string) => void;
  }
}

const DirectionalPad = (props: DirectionalPad.IProps) => {
  return (
    <div className='z-mobile-dpad'>
      <div className='z-mobile-dpad-col'>
        <div className='z-mobile-dpad-left z-mobile-dpad-button'
            onMouseDown={()=>this.props.on_press('left')}
            onMouseUp={()=>this.props.on_release('left')}>
          
        </div>
      </div>
      <div className='z-mobile-dpad-col'>
        <div className='z-mobile-dpad-up z-mobile-dpad-button'
            onMouseDown={()=>this.props.on_press('up')}
            onMouseUp={()=>this.props.on_release('up')}>
          
        </div>
        <div className='z-mobile-dpad-button z-mobile-dpad-spacer' />
        <div className='z-mobile-dpad-down z-mobile-dpad-button'
            onMouseDown={()=>this.props.on_press('down')}
            onMouseUp={()=>this.props.on_release('down')}>
          
        </div>
      </div>
      <div className='z-mobile-dpad-col'>
        <div className='z-mobile-dpad-right z-mobile-dpad-button'
            onMouseDown={()=>this.props.on_press('right')}
            onMouseUp={()=>this.props.on_release('right')}>
          
        </div>
      </div>
    </div>
  )
}