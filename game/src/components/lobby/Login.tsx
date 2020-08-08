import React, { Component } from 'react';
import './Login.scss';
export interface LoginState {
  username: string
  password: string
  loggedIn: boolean
}

export default class Login extends Component<any, LoginState> {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
    };
  }

  componentDidMount(): void {
  }

  componentWillUnmount(): void {
  }

  render() {
    if (this.state.loggedIn) {
      return '';
    }
    return <div className="login">
    <h2>Please Login</h2>
    </div>;
  }
}