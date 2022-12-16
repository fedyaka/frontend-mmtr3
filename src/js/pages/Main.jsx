import React, { Component } from 'react';
import path from '../path.js';
import WordTable from "../components/wordTable/WordTable.jsx";

export default class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        dictionaries:[]
    }
  }

  componentDidMount(){
    //запрос на все словари без списка слов
    fetch(path.dictionary)
    .then(res => res.ok ? res.json() : Promise.reject(res.json()))
    .then(result => {
      this.setState({
        isLoaded:true,
        dictionaries:result
      })
    })
    .catch(error => {
      error.then(error =>{
        this.setState({
          isLoaded:true,
          error
        })
      })
    })
  }

  render() {
    const {isLoaded, error, dictionaries} = this.state;

    if (!isLoaded){
      return <h2>Загрузка...</h2>
    } else if(error){
      return <h2>{error.message}</h2>
    } else{
      return  (
        <div className='tables-wrap'>
          {
            dictionaries.map(dictionary => <WordTable key={dictionary.id} dictionary={dictionary}></WordTable>)
          }
        </div>
        )
    }
  }
  
}
