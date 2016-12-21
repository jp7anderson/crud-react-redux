import React, { Component } from 'react';
var IndexLink = require('react-router').IndexLink;

export default class Header extends Component {
  render() {
    return <nav className="navbar navbar-inverse">
      <div className='container'>
        <div className="navbar-header">
          <IndexLink to="/" className="navbar-brand">React redux</IndexLink>
        </div>
        <div className="collapse navbar-collapse">
          <ul className='nav navbar-nav'>
            <li><IndexLink to='/' activeClassName='active'>Home</IndexLink></li>
          </ul>
        </div>
      </div>
    </nav>
  }
}
