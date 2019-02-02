import * as React from "react";


export
namespace GameBoard {

  export
    interface IProps {
    room_code: string;
  }
}

export
class GameBoard extends React.Component<GameBoard.IProps, undefined> {
  render() {
    return (
      <div></div>
    );
  }
}