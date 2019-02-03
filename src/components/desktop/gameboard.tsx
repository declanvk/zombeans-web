import * as React from "react";
import * as io from "socket.io-client";
import { characters } from '../../data'; 

const CANVAS_ID = 'z-desktop-gameboard-canvas-id';
export
namespace GameBoard {

  export
  interface IProps {
    room_code: string;
  }

  export
  interface IState {
    board_description?: BoardDescription,
    player_descriptions: Map<string, PlayerDescription>;
    player_render_data: Map<string, PlayerRenderData>;
  }

  export
  interface BoardDescription {
    width: number;
    height: number;
    player_radius: number;
  }

  export
  interface PlayerRenderData {
    x: number;
    y: number;
    is_zombie: boolean;
  }

  export
  interface PlayerDescription {
    user_name: string;
    character: number;
  }

  
}

export
class GameBoard extends React.Component<GameBoard.IProps, GameBoard.IState> {

  private _socket: SocketIO.Socket;
  private _canvas?: React.RefObject<HTMLCanvasElement>;
  private _ctx?: CanvasRenderingContext2D;

  constructor(props: any) {
    super(props);
    this._socket = io('/viewer');

    this._onGameStarting = this._onGameStarting.bind(this);
    this._onGameTick = this._onGameTick.bind(this);
    this._onGameViewResponse = this._onGameViewResponse.bind(this);

    this.state = {
      board_description: null,
      player_descriptions: new Map(),
      player_render_data: new Map(),
    };

    this._canvas = React.createRef();
  }

  private _onGameStarting(data: any): void {

  }

  private _onGameTick(data: any): void {
    let player_render_data: Map<string, GameBoard.PlayerRenderData> = data['player_pos_data'];

    this.setState({
      player_render_data
    })
  }

  private _onGameViewResponse(data: any): void {
    if (data['view_status'] == 'success') {
      let player_raw_descriptions: Array<{
        user_name: string;
        character: number;
        player_id: string;
      }> = data['aux_data']['current_players'];
      let board_description: GameBoard.BoardDescription = data['aux_data']['board_description'];

      let player_descriptions = player_raw_descriptions.reduce(function(map, obj) {
        map[obj.player_id] = {
          user_name: obj.user_name,
          character: obj.character
        };
        return map;
      }, new Map());

      this.setState({
        board_description,
        player_descriptions
      });
    } else {
      console.warn(`Failed to request view access to room: ${this.props.room_code}`);
    }
  }

  componentDidMount() {
    this._socket.on('game_starting', this._onGameStarting);
    this._socket.on('game_tick', this._onGameTick);
    this._socket.on('game_view_response', this._onGameViewResponse);

    this._socket.emit("request_game_view", {
      "room_code": this.props.room_code
    })
  }

  componentDidUpdate() {
    if (this._canvas && this.state.board_description) {
      if (this._canvas.current) {
        const canvas = this._canvas.current;
        const ctx = canvas.getContext('2d');

        let characters = new Map()
        for (let pair of Array.from(this.state.player_descriptions)) {
          characters[pair[0]] = pair[1].character;
        }

        draw(ctx, characters, this.state.board_description, this.state.player_render_data);
      }
    }
    
  }

  render() {
    let height: number;
    let width: number;
    if (this.state.board_description) {
      height = this.state.board_description.height;
      width = this.state.board_description.width;
    } else {
      height = 800;
      width = 1200
    }

    return (
      <div className={'z-desktop-gameboard transition-item'}>
        <canvas className={'z-desktop-gameboard-canvas'} ref={this._canvas} id={CANVAS_ID} height={width} width={height}/>
        <div className={'gameplay-box'}></div>
      </div>
    );
  }
}

function draw(ctx: CanvasRenderingContext2D, characters: Map<string, number>, 
  board: GameBoard.BoardDescription, players: Map<string, GameBoard.PlayerRenderData>)
{
  ctx.save();

  ctx.clearRect(0, 0, board.width, board.height);
  drawBoard(ctx, board.width, board.height);

  let player_ids: Array<String> = Array.from(players, (v) => v[0]);

  for (let p_id in player_ids) {
    let player: GameBoard.PlayerRenderData = players[p_id];
    let character: number = characters[p_id];
    drawPlayer(ctx, player.x, player.y, character, player.is_zombie, board.player_radius);
  }

  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, x: number, y: number, character, is_zombie: boolean, radius: number) {
  ctx.save();

  if (is_zombie) {
    ctx.fillStyle = 'green';
  } else {
    ctx.fillStyle = 'brown';
  }

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2*Math.PI);
  ctx.stroke()
  
  ctx.restore();
}

function drawBoard(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();

  ctx.lineWidth = 5;
  ctx.strokeStyle = 'black';

  ctx.moveTo(0,0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.restore();
}