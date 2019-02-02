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
        <div className={'z-desktop-landing-header-spacer'} />
        <div className={'z-desktop-landing-code'} >
          <p>Your lounge code is: <span className="z-bold">{this.props.room_code}</span></p>
        </div>
        <div className={'z-desktop-landing-players-container'}>

        </div>
      </div>
    );
  }
}