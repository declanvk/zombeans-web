import * as React from "react";
import * as io from "socket.io-client";
import {IUser} from '../../types';
import {characters} from "../../data";

const CANVAS_ID = 'z-gameboard-canvas-id';

export
namespace Controller {
  export
  interface IState {
    screen_orientation: 'vertical' | 'horizontal';
  }
  export
  interface IProps {
    user: IUser;
    room_code: string;
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
    this.onPress = this.onPress.bind(this);
    this.onRelease = this.onRelease.bind(this);
  }

  componentDidMount() {
    window.addEventListener('orientationchange', () => {
      this.setState({
        screen_orientation: screen.orientation.angle == 0 ? 'vertical' : 'horizontal'
      });
    })
  }

  onPress(evt: any, dir: string) {
    console.log('Press: ' + dir);
    evt.stopPropagation();
  }

  onRelease(evt: any, dir: string) {
    console.log('Release: ' + dir);    
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
          <h1>{this.props.user.name}</h1>
          <img src={characters[this.props.user.character].normal_img}/>
        </div>
        <div className='z-mobile-controller-controller'>
          <DirectionalPad on_press={this.onPress}
              on_release={this.onRelease}/>

        </div>
      </div>
    );
  }
}

export
namespace DirectionalPad {
  export
  interface IProps {
    on_press: (evt: any, button: string) => void;
    on_release: (evt: any, button: string) => void;
  }
}

const DirectionalPad = (props: DirectionalPad.IProps) => {
  return (
    <div className='z-mobile-dpad'>
      <div className='z-mobile-dpad-col'>
        <div className='z-mobile-dpad-left z-mobile-dpad-button'
            onTouchStart={(evt)=>props.on_press(evt, 'left')}
            onTouchEnd={(evt)=>props.on_release(evt, 'left')}
            onContextMenu={(evt)=>evt.preventDefault()}>

          
        </div>
      </div>
      <div className='z-mobile-dpad-col'>
        <div className='z-mobile-dpad-up z-mobile-dpad-button'
            onTouchStart={(evt)=>props.on_press(evt, 'up')}
            onTouchEnd={(evt)=>props.on_release(evt, 'up')}
            onContextMenu={(evt)=>evt.preventDefault()}>
          
        </div>
        <div className='z-mobile-dpad-button z-mobile-dpad-spacer' />
        <div className='z-mobile-dpad-down z-mobile-dpad-button'
            onTouchStart={(evt)=>props.on_press(evt, 'down')}
            onTouchEnd={(evt)=>props.on_release(evt, 'down')}
            onContextMenu={(evt)=>evt.preventDefault()}>
          
        </div>
      </div>
      <div className='z-mobile-dpad-col'>
        <div className='z-mobile-dpad-right z-mobile-dpad-button'
            onTouchStart={(evt)=>props.on_press(evt, 'right')}
            onTouchEnd={(evt)=>props.on_release(evt, 'right')}
            onContextMenu={(evt)=>evt.preventDefault()}>
          
        </div>
      </div>
    </div>
  )
}