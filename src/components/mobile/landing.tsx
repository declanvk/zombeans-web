import * as React from "react";

export
namespace MobileLanding {
  export
  interface IState {
    name: string;
    room_code: string;
  }
  export
  interface IProps {
    submit_form: (room_code: string, name: string) => void;
    room_code_failure: boolean;
    room_code_fail_reason: string;
    screen_orientation: 'vertical' | 'horizontal';
  }
}

export
class MobileLanding extends React.Component<MobileLanding.IProps, MobileLanding.IState> {
  constructor(props: MobileLanding.IProps) {
    super(props);

    this.state = {
      name: '',
      room_code: ''
    }

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCodeChange = this._handleCodeChange.bind(this);
    this._handleNameChange= this._handleNameChange.bind(this);
  }

  private _handleCodeChange(evt) {
    this.setState({room_code: evt.target.value});
  }

  private _handleNameChange(evt) {
    this.setState({name: evt.target.value});
  }

  private _handleSubmit(evt) {
    evt.preventDefault();
    this.props.submit_form(this.state.room_code.toUpperCase(),
        this.state.name.toUpperCase());
  }

  render() {
    return (
      <div className='z-mobile-landing-page transition-item'>
        <div className='z-mobile-landing-failure'
            style={{display: this.props.room_code_failure ? '' : 'None'}}>
          <p>{this.props.room_code_fail_reason}</p>
        </div>
        <div className={'z-mobile-landing-form-container'}>
          <div className={'z-mobile-landing-form white'} >
              <p>what's your name?</p>
              <input value={this.state.name} onChange={this._handleNameChange} type="text" maxLength={10} />

              <p className="no-margin">room code:</p>
              <input className={'z-mobile-landing-form-code'} maxLength={6}
                  value={this.state.room_code} onChange={this._handleCodeChange}
                  type="text"/>
            
            
            <button onClick={this._handleSubmit}
            className="join-button"
                disabled={(this.state.room_code.length != 6 || !this.state.name.length) ? true : false}>
              <p>Join</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}