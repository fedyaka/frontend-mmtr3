import React, { Component } from 'react'

export default class Error extends Component {
  render() {
    return (<div className='error'>
      <h1>Ошибочка</h1>
      <h2>Такой страницы не существует</h2>
      <div className='error__img'></div>
    </div>)
  }
}
