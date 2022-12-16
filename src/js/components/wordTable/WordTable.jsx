import React from "react";
import path from "../../path.js";
import TableRow from "./TableRow.jsx";
import { NavLink } from "react-router-dom";

export default class WordTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            words: []
        }
    }

    componentDidMount() {
        const { dictionary } = this.props;

        //Запрос на все слова без списка переводов
        fetch(path.word + "?dictionaryId=" + dictionary.id)
            .then(res => res.ok ? res.json() : Promise.reject(res.json()))
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        words: result,
                    })
                }
            )
            .catch(result => {
                result.then(error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
            })
    }

    render() {
        const { words, error, isLoaded } = this.state;
        const { dictionary } = this.props;

        if (error) {
            return (<>
            <div className="tables-wrap__word-table">
                <h2>{dictionary.name}</h2>
                <NavLink to={`/add/${dictionary.id}`}>Добавить слово</NavLink>
                <h3>{error.message}</h3>
            </div>
            </>)
        } else if (!isLoaded) {
            return <h3>Загрузка...</h3>
        } else {
            return (
                <div className="tables-wrap__word-table">
                    <h2>{dictionary.name}</h2>
                    <NavLink to={`/add/${dictionary.id}`} className={"tables-wrap__button-add"}>Добавить слово</NavLink>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>
                                    Слово
                                </th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {words.map(word =>
                                <TableRow key={word.id} word={word} />
                            )}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}