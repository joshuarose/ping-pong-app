import React, { Component } from 'react';
import {
  Button,
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
import UserRegisterForm from './UserRegister';
import '../sass/Forms.css';
import '../sass/Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      players: []
    };

    console.log(this.props);
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

  deletePlayer = (event, player) => {
    let component = this;
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
          component.props.history.push('/');
        } else {
          console.log(data);
        }
      });
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
        <UserRegisterForm childProps={this.props} />
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
