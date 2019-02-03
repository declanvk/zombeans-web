import * as React from "react";
import * as io from "socket.io-client";
import {IUser} from '../../types';
import {characters} from "../../data";

const rotate_phone = require("../../../src/assets/img/rotate-phone.png");

export
namespace Controller {
  export
  interface IProps {
    user: IUser;
    room_code: string;
    on_release: (evt: any, dir: string) => void;
    on_press: (evt: any, dir: string) => void;
    screen_orientation: 'vertical' | 'horizontal';
  }
}

export
class Controller extends React.Component<Controller.IProps, any> {
  render() {
    if (this.props.screen_orientation == 'vertical') {
      return (
        <div className="z-mobile-controller-page transition-item rotate">
          <img src={rotate_phone}/>
          <p>now, rotate your phone</p>
        </div>
      )
    }

    return (
      <div className='z-mobile-controller-page z-mobile-controller transition-item'>
        <div className='z-mobile-controller-player'>
          <p className='players-name'>{this.props.user.name}</p>
          <img className='players-bean' src={characters[this.props.user.character].normal_img}/>
          <div id='oval'></div>
        </div>
        <div className='z-mobile-controller-controller'>
          <DirectionalPad on_press={this.props.on_press}
              on_release={this.props.on_release}/>

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