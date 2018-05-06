import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import { Cookies } from 'react-cookie';
import {FormErrors} from './components/FormError'
import '../sass/Forms.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formErrors: []
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

    let component = this;
    let props;
    const cookies = new Cookies();

    if(component.props.childProps){
      props = component.props.childProps;
    }else{
      props = component.props;
    }

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

          props.userHasAuthenticated(true);
          props.history.push('/');
        } else {
          component.setState({formErrors: data.error});

          props.userHasAuthenticated(false);
        }
      });
  };

  render() {
    return (
      <div>
        <div className="text-center">
          <h1>Ping Pong Manager</h1>
        </div>

        <div className="form">
          <form onSubmit={this.handleSubmit}>

            <FormErrors formErrors={this.state.formErrors} />

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

            <Col xs={12}>
              <LinkContainer
                className="text-center col-xs-12 register-link"
                to="/"
              >
                <a>Create An Account</a>
              </LinkContainer>
            </Col>
          </form>
        </div>

        <Col xs={12}>
          <div className="wrapper">
            <div className="left_wall"></div>
            <div className="ball"></div>
            <div className="right_wall"></div>
            <div className="clear"></div>
          </div>
        </Col>
      </div>
    );
  }
}
