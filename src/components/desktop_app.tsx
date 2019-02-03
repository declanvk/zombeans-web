import * as React from "react";
import * as io from "socket.io-client";
import { GameBoard } from './desktop/gameboard';
import { DesktopLanding } from './desktop/landing';
import PageTransition from 'react-router-page-transition';
import {IUser} from '../types';
import "./../assets/scss/desktop_app.scss";

export
namespace DesktopApp {
  export
  interface IState {
    display: 'landing' | 'game';
    room_code: string;
    users: IUser[];
  }
}

export
default class DesktopApp extends React.Component<any, DesktopApp.IState> {

  socket: SocketIO.Socket;

  static compareChildren(prevChild: any, nextChild: any) {
    return prevChild.type === nextChild.type;
  }

  constructor(props: any) {
    super(props);

    this.state = {
      display: 'landing',
      room_code: '000000',
      users: []
    };

    this.socket = io('/host');
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.start_game = this.start_game.bind(this);
  }
  start_game(){
    this.socket.emit("request_start_game",{});
    //setInterval(function(){ this.socket.emit("request_update_game",{}); }, 50);
  }

  private _handleKeyPress(evt: any) {
    if(evt.key == 't') {
      this.setState({
        display: 'game',
      });
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyPress);
    this.socket.on('room_code', (data: any) => {
       this.setState({
          room_code: data.room_code
       });
    });
    this.socket.on('player_joined', (data: any) => {
       let users = data.players.map((user: any) => {
          return {name: user.user_name, character: user.character}
       });
       this.setState({
          users: users
       });
    });
  }

  render() {
    let page: any;

    if (this.state.display == 'landing')
      page = (<DesktopLanding room_code={this.state.room_code} users={this.state.users} />);
    else
      page = (<GameBoard room_code={this.state.room_code} gameboard_ready={this.start_game}/>);

    return (
      <div>
        <PageTransition compareChildren={DesktopApp.compareChildren}>
          {page}
        </PageTransition>
      </div>
    );
  }
}

