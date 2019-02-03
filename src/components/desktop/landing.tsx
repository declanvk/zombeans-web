import * as React from "react";
import {IUser} from '../../types';

export
namespace Landing {
  export
    interface IProps {
    room_code: string;
    users: IUser[];
  }
}

export
class DesktopLanding extends React.Component<Landing.IProps, undefined> {
  render() {
    return (
      <div className={'z-desktop-landing-page transition-item'} >
        <img className="logo" src="../../../src/assets/img/logo.png" />
        
        <p className="white">Go to www.join-game.com on your phone <br></br> and enter the room code:</p>
        <div className={'z-desktop-landing-code'} >
          <p><span className="z-bold">{this.props.room_code}</span></p>
        </div>
        <div className={'z-desktop-landing-players-container'}>

        </div>
      </div>
    );
  }
}