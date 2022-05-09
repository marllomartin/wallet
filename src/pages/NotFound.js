import React from 'react';
import notFound from '../animations/notfound-animate.svg';
import '../styles/NotFound/styles.css';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="notfound-page">
        <img src={ notFound } alt="Página não encontrada."/>
      </div>
    )
  }
}
