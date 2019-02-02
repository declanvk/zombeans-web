import * as React from "react";
import * as io from "socket.io-client";
import { Controller } from './mobile/controller';
import { MobileLanding } from './mobile/landing';
import PageTransition from 'react-router-page-transition';
import "./../assets/scss/app.scss";

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
    room_code: string;
    users: IUser[];
  }
}

export
default class MobileApp extends React.Component<any, MobileApp.IState> {

  socket: SocketIO.Socket;

  constructor(props: any) {
    super(props);

    this.state = {
      display: 'landing',
      room_code: '000000',
      users: []
    };

    this.socket = io('/player');
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(room_code: string, name: string) {
    let join_request = {
      pkt_name: 'player_join_request',
      room_code: room_code,
      user_name: name
    }
    console.log(join_request);
    this.socket.emit('player_join_request', join_request);
  }

  componentDidMount() {
    this.socket.on('player_join_response', (data: any) => {
       console.log(data);
    });
  }

  render() {
    let page: any;

    if (this.state.display == 'landing')
      page = (<MobileLanding submit_form={this.joinGame} />);
    else
      page = (<Controller room_code={this.state.room_code} />);

    return (
      <div>
        <PageTransition>
          {page}
        </PageTransition>
      </div>
    );
  }
}

