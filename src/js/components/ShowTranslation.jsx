import React, { Component } from 'react'
import path from '../path.js';

export default class ShowTranslation extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            translations: []
        }
    }

    componentDidMount(){
        fetch(path.translation + "?wordId=" + this.props.word.id)
        .then(res => res.ok ? res.json() : Promise.reject(res.json()))
        .then(result =>{
            this.setState({
                isLoaded: true,
                translations:result
            })
        })
        .catch(result=>{
            result.then(error=>{
                this.setState({
                    isLoaded: true,
                    error
                })
            })
        })
    }

    render() {
        const {isLoaded, error, translations} = this.state;
        
        if (!isLoaded){
            return <b>Загрузка</b>
        }else if (error){
            return <p>{error.message}</p>
        }else{
            return(<>
                <p>Перевод:</p>
                <ul>
                    {translations.map(translation => {
                        return (
                            <li key={translation.id}>{translation.translation}</li>
                        );
                    })}
                </ul>
            </>)
        }
    }
}
