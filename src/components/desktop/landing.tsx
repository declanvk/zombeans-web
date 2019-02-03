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
      let in_view = (idx < this.props.users.length);
      return (
        <div className={'z-desktop-landing-players-card z-desktop-landing-players-card' + idx} key={idx}>
          <img className={'z-desktop-landing-players-card-img animated bounce'}
              style={{animationPlayState: (in_view ? 'running' : 'paused')}}
              src={character.normal_img}>
          
          </img>
          <h1 style={{opacity: in_view ? 1 : 0}}>{ (idx < this.props.users.length) ? this.props.users[idx].name : '' }</h1>
        </div>
      )
    })

    return (
      <div className={'z-desktop-landing-page transition-item'} >
        <img className="logo" src="../../../src/assets/img/logo.png" />
        
        <p className="white">Go to www.join-game.com on your phone <br></br> and enter the room code:</p>
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