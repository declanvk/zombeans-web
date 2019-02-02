import * as React from "react";
import {App} from "./app";

export
namespace Landing {
   export
   interface IProps {
      room_code: string;
      users: App.IUser[];
   }
}

export
class Landing extends React.Component<Landing.IProps, undefined> {
   render() {
      return (
         <div className='z-landing-page transition-item'>
            <div className={'z-landing-header-spacer'} />
            <div className={'z-landing-code'} >
               <p>Your lounge code is: <span className="z-bold">{this.props.room_code}</span></p>
            </div>
            <div className={'z-landing-players-container'}>
               
            </div>
         </div>
      );
   }
}