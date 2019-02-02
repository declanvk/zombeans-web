import * as React from "react";
import * as io from "socket.io-client";
import { Controller } from './mobile/controller';
import { MobileLanding } from './mobile/landing';
import PageTransition from 'react-router-page-transition';
import "./../assets/scss/mobile_app.scss";

export
namespace MobileApp {
  export
  interface IUser {
    name: string;
    character: string;
  }
  export
  interface IState {
    display: 'landing' | 'controller';
    room_code_failure: boolean;
    room_code_fail_reason: string;
  }
}

export
default class MobileApp extends React.Component<any, MobileApp.IState> {

  socket: SocketIO.Socket;
  room_code: string;
  user_name: string;
  character: string;

  static compareChildren(prevChild: any, nextChild: any) {
    return prevChild.type === nextChild.type;
  }

  constructor(props: any) {
    super(props);

    this.state = {
      display: 'landing',
      room_code_failure: false,
      room_code_fail_reason: ''
    };
    this.room_code = '';

    this.socket = io('/player');
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(room_code: string, name: string) {
    this.room_code = room_code;
    this.user_name = name;
    let join_request = {
      pkt_name: 'player_join_request',
      room_code: room_code,
      user_name: name
    }
    this.socket.emit('player_join_request', join_request);
  }

  componentDidMount() {
    this.socket.on('player_join_response', (data: any) => {
      if (data.status === 'failure') {
        this.setState({
          room_code_failure: true,
          room_code_fail_reason: data.aux_data
        });
      } else {
        this.character = data.aux_data.character;
        this.setState({
          display: 'controller'
        });
      }
    });
  }

  render() {
    let page: any;

    if (this.state.display == 'landing')
      page = (<MobileLanding submit_form={this.joinGame}
          room_code_failure={this.state.room_code_failure}
          room_code_fail_reason={this.state.room_code_fail_reason}/>);
    else
      page = (<Controller user_name={this.user_name} room_code={this.room_code} />);

    return (
      <div>
        <PageTransition compareChildren={MobileApp.compareChildren}>
          {page}
        </PageTransition>
      </div>
    );
  }
}

