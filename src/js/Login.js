import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Cookies } from 'react-cookie';
import '../sass/Forms.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const cookies = new Cookies();

    fetch('https://player-api.developer.alchemy.codes/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success) {
          cookies.set('pingPongJWT', data.token, { path: '/' });
          window.location.replace('/');
        } else {
          console.log(data);
        }
      });

    if (
      cookies.get('pingPongJWT') !== 'undefined' &&
      cookies.get('pingPongJWT') !== 'null' &&
      cookies.get('pingPongJWT') !== undefined
    ) {
      this.props.userHasAuthenticated(true);
    } else {
      this.props.userHasAuthenticated(false);
    }
  };

  render() {
    return (
      <div>
        <div className="text-center">
          <h1>Ping Pong Manager</h1>
        </div>

        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                placeholder="emailAddress@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="password"
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              required
            >
              Login
            </Button>

            <LinkContainer
              className="text-center col-xs-12 register-link"
              to="/"
            >
              <a>Create An Account</a>
            </LinkContainer>
          </form>
        </div>
      </div>
    );
  }
}
