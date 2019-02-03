import * as React from "react";
import * as io from "socket.io-client";
import { Controller } from './mobile/controller';
import { MobileLanding } from './mobile/landing';
import PageTransition from 'react-router-page-transition';
import { IUser } from "../types";
import "./../assets/scss/mobile_app.scss";

export
namespace MobileApp {
  export
  interface IState {
    display: 'landing' | 'controller';
    room_code_failure: boolean;
    room_code_fail_reason: string;
    screen_orientation: 'vertical' | 'horizontal';
    height: number;
    width: number;
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
      screen_orientation:  screen.orientation.angle == 0 ? 'vertical' : 'horizontal',
      height: window.innerHeight,
      width: window.innerWidth
    };
    this.user = {
      name: '',
      character: 0
    }
    this.room_code = '';

    this.socket = io('/player');
    this.joinGame = this.joinGame.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  joinGame(room_code: string, name: string) {
    this.room_code = room_code;
    this.user.name = name;
    let join_request = {
      pkt_name: 'player_join_request',
      room_code: room_code,
      user_name: name
    }
    this.socket.emit('player_join_request', join_request);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.socket.on('player_join_response', (data: any) => {
      if (data.status === 'failure') {
        this.setState({
          room_code_failure: true,
          room_code_fail_reason: data.aux_data
        });
      } else {
        this.user.character = data.aux_data.character;
        this.setState({
          display: 'controller'
        });
      }
    });
  }

  handleResize() {
    this.setState({
      screen_orientation: screen.orientation.angle == 0 ? 'vertical' : 'horizontal',
      height: window.innerHeight,
      width: window.innerWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  onPress(evt: any, dir: string) {
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

  onRelease(evt: any, dir: string) {
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

  render() {
    let page: any;

    if (this.state.display == 'landing')
      page = (<MobileLanding submit_form={this.joinGame}
          room_code_failure={this.state.room_code_failure}
          room_code_fail_reason={this.state.room_code_fail_reason}
          screen_orientation={this.state.screen_orientation}/>);
    else
      page = (<Controller room_code={this.room_code} user={this.user}
          on_press = {this.onPress} on_release = {this.onRelease}
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

