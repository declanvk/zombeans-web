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
    room_code_failure: boolean,
    room_code_fail_reason: string
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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNameChange= this.handleNameChange.bind(this);
  }

  handleCodeChange(evt) {
    this.setState({room_code: evt.target.value});
  }

  handleNameChange(evt) {
    this.setState({name: evt.target.value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.submit_form(this.state.room_code, this.state.name);
  }

  render() {
    return (
      <div className='z-mobile-landing-page transition-item'>
        <div className='z-mobile-landing-failure'
            style={{display: this.props.room_code_failure ? '' : 'None'}}>
          <p>{this.props.room_code_fail_reason}</p>
        </div>
        <div className={'z-mobile-landing-form white'} >
            <p>what's your name?</p>
            <input value={this.state.name} onChange={this.handleNameChange} type="text" maxlength={10} />

            <p className="no-margin">room code:</p>
            <input className={'z-mobile-landing-form-code'} maxLength={6} value={this.state.room_code} onChange={this.handleCodeChange} type="text" />
          
          
          <button onClick={this.handleSubmit}
          className="join-button"
              disabled={(this.state.room_code.length != 6 || !this.state.name.length) ? true : false}>
            <p>Join</p>
          </button>
        </div>
      </div>
    );
  }
}