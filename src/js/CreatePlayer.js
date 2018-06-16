import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Cookies } from 'react-cookie';
import Login from './Login';
import '../sass/Forms.css';

export default class CreatePlayer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			rating: '',
			handedness: 'right',
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	};

	handleSubmit = async event => {
		event.preventDefault();

		let component = this;
		const cookies = new Cookies();

		fetch('https://players-api.developer.alchemy.codes/api/players', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + cookies.get('pingPongJWT'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				first_name: this.state.firstName,
				last_name: this.state.lastName,
				rating: this.state.rating,
				handedness: this.state.handedness,
			}),
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				if (data.success) {
					component.props.history.push('/roster');
				} else {
					console.log(data);
				}
			});
	};

	renderCreatePlayerForm() {
		return (
			<div>
				<div className="text-center">
					<h3>Player Details</h3>
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
						<FormGroup controlId="rating" bsSize="large">
							<ControlLabel>Rating</ControlLabel>
							<FormControl
								type="text"
								placeholder="Rating"
								value={this.state.rating}
								onChange={this.handleChange}
								required
							/>
						</FormGroup>
						<FormGroup controlId="handedness" bsSize="large">
							<ControlLabel>Handedness</ControlLabel>
							<FormControl
								componentClass="select"
								value={this.state.handedness}
								onChange={this.handleChange}
								required
							>
								<option value="right">Right</option>
								<option value="left">Left</option>
							</FormControl>
						</FormGroup>
						<Button id="create" block bsSize="large" type="submit">
							<i className="fas fa-user-plus" />Add New Player
						</Button>
					</form>
				</div>
			</div>
		);
	}

	renderLander() {
		return (
			<div>
				<Login />
			</div>
		);
	}

	render() {
		return (
			<div className="Home">
				{this.props.isAuthenticated ? this.renderCreatePlayerForm() : this.renderLander()}
			</div>
		);
	}
}
