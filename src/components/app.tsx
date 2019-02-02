import * as React from "react";
import * as io from "socket.io-client";
import {GameBoard} from './gameboard';
import {Landing} from './landing';
import PageTransition from 'react-router-page-transition';
import "./../assets/scss/app.scss";

export
namespace App {
   export
   interface IUser {
      name: string;
      character: string;
   }
   export 
   interface IState {
      display: 'landing' | 'game';
      room_code: string;
      users: IUser[];
   }
}

export 
default class App extends React.Component<undefined, App.IState> {

   socket: SocketIO.Socket;

   constructor(props: any) {
      super(props);

      this.state = {
        display: 'landing',
        room_code: '000000',
        users: []
      };
      this.socket = io('/game/web');
   }

   componentDidMount() {
      // this.socket.on('room_code', (data: any) => {
      //    this.setState({
      //       room_code: data.room_code
      //    });
      // });
      // this.socket.on('player_joined', (data: any) => {
      //    let users = data.players.map((user: any) => {
      //       return {name: user.name, character: user.character}
      //    });
      //    this.setState({
      //       users: users
      //    });
      // });
   }

   render() {
      let page: any;
   
      if (this.state.display == 'landing')
         page = (<Landing  room_code={this.state.room_code} users={this.state.users} />);
      else
         page = (<GameBoard room_code={this.state.room_code} />);

      return (
         <div>
            <PageTransition>
               {page}
            </PageTransition>
         </div>
      );
   }
}

