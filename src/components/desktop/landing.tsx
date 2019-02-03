import * as React from "react";
import {IUser} from '../../types';
import { characters } from "../../data";

const logo = require('../../../src/assets/img/logo.png');
const god_img = require("../../../src/assets/img/wizard.png");

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
      // Check if god
      if (idx == 1) {
        return (
          <div className='z-desktop-landing-god' key={idx}>
            <img className={'animated bounce'}
                style={{
                  animationPlayState: (in_view ? 'running' : 'paused'),
                  display: (in_view ? '' : 'none')
                }}
                src={god_img}>
            
            </img>
            <h1 style={{opacity: in_view ? 1 : 0}}>{ (idx < this.props.users.length) ? this.props.users[idx].name : '' }</h1>
          </div>
        )
      } else {
        return (
          <div className={'z-desktop-landing-players-card z-desktop-landing-players-card' + idx} key={idx}>
            <img className={'animated bounce'}
                style={{
                  animationPlayState: (in_view ? 'running' : 'paused'),
                  display: (in_view ? '' : 'none')
                }}
                src={idx == 0 ? character.zombie_img : character.normal_img}>
            
            </img>
            <h1 style={{opacity: in_view ? 1 : 0}}>{ (idx < this.props.users.length) ? this.props.users[idx].name : '' }</h1>
          </div>
        )
      }
    })

    return (
      <div className={'z-desktop-landing-page transition-item'} >
        <img className="logo" src={logo} />
        
        <p className='white'>Go to <span className='website'>Zombeans.HerokuApp.com</span> on your phone <br></br> and enter the room code:</p>
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