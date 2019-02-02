import * as React from "react";
import {IUser} from '../../types';
import { characters } from "../../data";

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
    let player_cards = characters.map((character: any, idx: number) => {
      return (
        <div className={'z-desktop-landing-players-card'}>
          <img className={'z-desktop-landing-players-card-img'}
              src={character.normal_img}
              style={{display: (idx < this.props.users.length) ? '' : 'None'}}>
          
          </img>
        </div>
      )
    })

    return (
      <div className={'z-desktop-landing-page transition-item'} >
        <div className={'z-desktop-landing-header-spacer'} />
        <img className="logo" src="../../../src/assets/img/logo.png" />
        <div className={'z-desktop-landing-code'} >
          <p>Your room code is: <span className="z-bold">{this.props.room_code}</span></p>
        </div>
        <div className={'z-desktop-landing-players-container'}>
          {player_cards}
        </div>
      </div>
    );
  }
}