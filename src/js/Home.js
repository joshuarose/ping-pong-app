import React, { Component } from "react";
import "../css/Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Ping Pong</h1>
          <h2>By: Amy Howes</h2>
          <p>Managing everything you need to play!</p>
        </div>
      </div>
    );
  }
}