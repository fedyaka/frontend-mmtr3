import React from "react";
import { NavLink } from "react-router-dom";
import path from "../../path";
import ShowTranslation from "./ShowTranslation.jsx";

export default class TableRow extends React.Component{

    constructor(props){
        super(props);
        this.state = {isDelete: false};

        //Эта привязка обязательна для работы `this` в колбэке.
        this.deleteWord = this.deleteWord.bind(this);
    }

    deleteWord(e){
        fetch(path.word + "/" + this.props.word.id, {
            method: "DELETE" 
        })
        .then(()=>{
            this.setState(prevState => ({
                isDelete: !prevState.isDelete
            }))
        })
    }

    render(){
        const {isDelete} = this.state;
        const {word} = this.props;
        if (!isDelete){
            return(
                <tr key={word.id}>
                    <td>{word.id}</td>
                    <td>
                        <details> 
                            <summary>{word.word}</summary>
                            <ShowTranslation word={word}></ShowTranslation>
                        </details>
                    </td>
                    <td><NavLink to={"show/" + word.id}><button className="button">Просмотр</button></NavLink></td>
                    <td><button onClick={this.deleteWord} className="button del-button">удалить</button></td>
                </tr>
            );
        }
    }
}