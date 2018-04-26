import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  PageHeader,
  Table,
  thead,
  tr,
  th,
  tbody,
  td
} from 'react-bootstrap';
import { Cookies } from 'react-cookie';
import { LinkContainer } from 'react-router-bootstrap';
import '../sass/Forms.css';
import '../sass/Home.css';

export default class RegisterUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      players: [],
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  async componentDidMount() {
    const cookies = new Cookies();

    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const players = await this.players;
      this.setState({ players });
    } catch (e) {
      console.log(e);
    }

    fetch('https://player-api.developer.alchemy.codes/api/players', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + cookies.get('pingPongJWT')
      }
    })
      .then(results => {
        return results.json();
      })
      .then(data => {
        let players = data.players;
        this.setState({ players: players });
      });
    this.setState({ isLoading: false });
  }

  validateForm() {
    let confirmPasswordError =
      this.state.password === this.state.confirmPassword;
    return confirmPasswordError;
  }

  deletePlayer = (event, player) => {
    const cookies = new Cookies();

    fetch(
      'https://player-api.developer.alchemy.codes/api/players/' + player.id,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + cookies.get('pingPongJWT')
        }
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success) {
          window.location.replace('/');
        } else {
          console.log(data);
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

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
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        cookies.set('pingPongJWT', data.token, { path: '/' });
      });

    if (
      cookies.get('pingPongJWT') !== 'undefined' &&
      cookies.get('pingPongJWT') !== 'null' &&
      cookies.get('pingPongJWT') !== undefined
    ) {
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    } else {
      this.props.userHasAuthenticated(false);
    }
  };

  renderPlayersList(players) {
    if (players === undefined || players.length === 0) {
      return (
        <tr key="none">
          <td colSpan="4" className="text-center">
            Add a new player to see details
          </td>
        </tr>
      );
    }
    return players.map(function(player, i) {
      return (
        <tr key={player.id}>
          <td>
            {player.first_name} {player.last_name}
          </td>
          <td>{player.handedness}</td>
          <td>{player.rating}</td>
          <td className="text-right">
            <a onClick={e => this.deletePlayer(e, player)}>
              <i className="fas fa-trash-alt" />
            </a>
          </td>
        </tr>
      );
    }, this);
  }

  renderLander() {
    return (
      <div>
        <div className="text-center">
          <h3>Register Account</h3>
        </div>

        <div className="form">
          <form onSubmit={this.handleSubmit}>
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

  renderPlayers() {
    return (
      <div className="players">
        <PageHeader>Your Players</PageHeader>

        <div className="text-right">
          <LinkContainer to="/player/new">
            <Button>
              <i className="fas fa-user-plus" />Add New Player
            </Button>
          </LinkContainer>
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Dominant Hand</th>
              <th>Rating</th>
              <th className="text-right">Delete</th>
            </tr>
          </thead>

          <tbody>
            {!this.state.isLoading &&
              this.renderPlayersList(this.state.players)}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated
          ? this.renderPlayers()
          : this.renderLander()}
      </div>
    );
  }
}
