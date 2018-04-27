import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import '../sass/About.css';

export default class About extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <p>
            <a
              targe="_blank"
              href="https://giphy.com/gifs/tennis-4IAzyrhy9rkis"
            >
              <iframe
                src="https://giphy.com/embed/4IAzyrhy9rkis"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
                title="Ping Pong Cats"
              />
            </a>
          </p>
          <h1>Amy Howes</h1>
        </div>

        <Col xs={6} xsOffset={3}>
          <section className="about-me">
            <p>
              Amy is a web developer, working with AngularJS, front end design
              and implementation. She volunteers as a Chapter Leader for Girl
              Develop It Cincinnati, which empowers women via tech
              education. In her free time, she likes to knit, practice yoga,
              throw down puns, or play with her ferrets.
            </p>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/thecodeferret/ping-pong-app"
            >
              See this project on github!
            </a>
          </section>
        </Col>

        <Col xs={6} xsOffset={3} className="text-center">
          <section className="social-icons">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/thecodeferret"
            >
              <img src="./images/github.svg" alt="Amy on github" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/acodeferret"
            >
              <img src="./images/twitter.svg" alt="Amy on twitter" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/thecodeferret/"
            >
              <img src="./images/linkedin.svg" alt="Amy on linkedin" />
            </a>
          </section>
        </Col>
      </div>
    );
  }
}
