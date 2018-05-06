import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import { Cookies } from 'react-cookie';
import {FormErrors} from './components/FormError';

export default class UserRegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      formErrors: []
    };
  }

  validateForm() {
    let confirmPasswordError =
      this.state.password === this.state.confirmPassword;
    return confirmPasswordError;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    let component = this;
    const cookies = new Cookies();

    fetch('https://player-api.developer.alchemy.codes/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirmPassword
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success) {
          cookies.set('pingPongJWT', data.token, { path: '/' });
        	
          component.props.childProps.userHasAuthenticated(true)
          component.props.childProps.history.push('/');
        } else {
          component.setState({formErrors: data.error});
          component.props.childProps.userHasAuthenticated(false);
        }
      });
  };

  render(){
  	    return (
      <div>
        <div className="text-center">
          <h3>Register Account</h3>
        </div>

        <div className="form">
          <form onSubmit={this.handleSubmit}>

            <FormErrors formErrors={this.state.formErrors} />

            <FormGroup controlId="firstName" bsSize="large">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                value={this.state.firstName}
                onChange={this.handleChange}
                placeholder="First Name"
                required
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="lastName" bsSize="large">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                value={this.state.lastName}
                onChange={this.handleChange}
                placeholder="Last Name"
                required
                type="text"
              />
            </FormGroup>

            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
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
                required
              />
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                placeholder="Confirm Password"
                type="password"
                required
              />
            </FormGroup>

            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}