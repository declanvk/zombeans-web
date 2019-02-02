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
        <img className="logo" src="../../../src/assets/img/logo.png" />
        
        <p>Go to www.join-game.com on your phone <br></br> and enter the room code:</p>
        <div className={'z-desktop-landing-code'} >
          <p><span className="z-bold">{this.props.room_code}</span></p>
        </div>
        <div className={'z-desktop-landing-players-container'}>
          {player_cards}
        </div>
      </div>
    );
  }
}