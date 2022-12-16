import React, { Component } from 'react'
import LiTranslations from './LiTranslations.jsx';

export default class ULTranslations extends Component {

    constructor(props){
        super(props);
    }

    render() {
        if (this.props.translations.length != 0){
            return (
                <ul>
                    {this.props.translations.map(translation => {
                        return (
                            <LiTranslations key={translation.id} translation={translation} dictionary={this.props.dictionary}></LiTranslations>
                        );
                    })}
                </ul>
            )
        } else{
            return (
                <p>Перевод не найден</p>
            )
        }
        
    }
}
