import * as React from "react";
import * as io from "socket.io-client";
import { Controller } from './mobile/controller';
import { GodController } from './mobile/god_controller';
import { MobileLanding } from './mobile/landing';
import PageTransition from 'react-router-page-transition';
import { IUser } from "../types";
import "./../assets/scss/mobile_app.scss";

const GOD_CHAR = 1;

export
namespace MobileApp {
  export
  interface IState {
    display: 'landing' | 'controller' | 'god_controller';
    room_code_failure: boolean;
    room_code_fail_reason: string;
    screen_orientation: 'vertical' | 'horizontal';
    height: number;
    width: number;
    possible_spells: boolean[];
  }
}

export
default class MobileApp extends React.Component<any, MobileApp.IState> {

  socket: SocketIO.Socket;
  room_code: string;
  user: IUser;

  static compareChildren(prevChild: any, nextChild: any) {
    return prevChild.type === nextChild.type;
  }

  constructor(props: any) {
    super(props);

    this.state = {
      display: 'landing',
      room_code_failure: false,
      room_code_fail_reason: '',
      screen_orientation:  window.orientation == 0 ? 'vertical' : 'horizontal',
      height: screen.availHeight,
      width: screen.availWidth,
      possible_spells: [false, false, false, false]
    };
    this.user = {
      name: '',
      character: 0
    }
    this.room_code = '';

    this.socket = io('/player');
    this._joinGame = this._joinGame.bind(this);
    this._onPress = this._onPress.bind(this);
    this._onRelease = this._onRelease.bind(this);
    this._handleResize = this._handleResize.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._onGodPress = this._onGodPress.bind(this);
  }

  private _joinGame(room_code: string, name: string) {
    this.room_code = room_code;
    this.user.name = name;
    let join_request = {
      pkt_name: 'player_join_request',
      room_code: room_code,
      user_name: name
    }
    this.socket.emit('player_join_request', join_request);
  }

  private _handleKeyPress(evt: any) {
    if(evt.key == 'g') {
      this.setState({
        display: 'god_controller',
      });
    }
  }

  private _handleResize() {
    this.setState({
      screen_orientation: window.orientation == 0 ? 'vertical' : 'horizontal',
      height: screen.availHeight,
      width: screen.availWidth
    });
  }

  private _onPress(evt: any, dir: string) {
    console.log('Press: ' + dir);
    this.socket.emit('make_move', {
        "pkt_name": "make_move",
        "origin":"normal",
        "action":{
          "key":dir,
          "state":"pressed"
        }
    });
  }

  private _onGodPress(evt: any, type: number) {
    console.log('God Press: ' + type);
     this.socket.emit('make_move', {
      "pkt_name": "make_move",
      "origin":"god",
      "action":{
        "code":type,
      }
    });
  }

  private _onRelease(evt: any, dir: string) {
    console.log('Release: ' + dir);
    this.socket.emit('make_move', {
      "pkt_name": "make_move",
      "origin":"normal", 
      "action":{
        "key":dir,
        "state":"released"
      }
    });    
  }

  componentDidMount() {
    window.addEventListener('orientationchange', () => setTimeout(this._handleResize, 200));
    //document.addEventListener("keydown", this._handleKeyPress);
    this.socket.on('player_join_response', (data: any) => {
      if (data.status === 'failure') {
        this.setState({
          room_code_failure: true,
          room_code_fail_reason: data.aux_data
        });
      } else {
        this.user.character = data.aux_data.character;
        let display;
        if (this.user.character == GOD_CHAR)
          display = 'god_controller';
        else
          display = 'controller';

        this.setState({
          display: display
        });
      }
    });
    this.socket.on('god_spells', (data: any) => {
      let enable_spells = [false, false, false, false];
      data.god_spells.possible.forEach(s => {
        enable_spells[s-1] = true;
      });

      this.setState({
        possible_spells: enable_spells
      })
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  render() {
    let page: any;

    if (this.state.display == 'landing')
      page = (<MobileLanding submit_form={this._joinGame}
          room_code_failure={this.state.room_code_failure}
          room_code_fail_reason={this.state.room_code_fail_reason}
          screen_orientation={this.state.screen_orientation}/>);
    else if (this.state.display == 'god_controller')
      page = (<GodController room_code={this.room_code} user={this.user} enabled_spells={this.state.possible_spells}
          on_press = {this._onGodPress} screen_orientation={this.state.screen_orientation}/>);
    else
      page = (<Controller room_code={this.room_code} user={this.user}
          on_press = {this._onPress} on_release = {this._onRelease}
          screen_orientation={this.state.screen_orientation}/>);

    return (
      <div className={'z-mobile-container'} style={{height: this.state.height, width: this.state.width}}>
        <PageTransition compareChildren={MobileApp.compareChildren}>
          {page}
        </PageTransition>
      </div>
    );
  }
}

