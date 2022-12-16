import React, { Component } from 'react'

export default class Error extends Component {
  render() {
    return (<>
      <h1>Ошибочка</h1>
      <h2>Такой страницы не существует</h2>
      <img src='/img/errorCat.png'></img>
    </>)
  }
}
