import React, { Component, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import path from '../path';

export default function Header(props){
    
    const defaultOption = "Все";
    const [option, setOption] = useState(defaultOption);
    const [word, setWord] = useState("");
    const [dictionaries, setdictionaries] = useState([]);
    const [outputWords, setOutputWords] = useState([]);
    const [outputError, setOutputError] = useState("");
    const [isHide, setIsHide] = useState(true);

    useEffect(()=>{
        fetch(path.dictionary)
        .then(res => res.json())
        .then(result => {
            setdictionaries(result);
        })
    }, []);

    useEffect(()=>{
        searchFetch();
    }, [word,option]);

    function searchFetch(){
        if (word === ""){
            setOutputError("")
            return;
        }
        let requestObj = {word: word};
        if (option != defaultOption){
            requestObj = {
                dictionaryId: option,
                word: word
            }
        }
        fetch(path.search, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObj)
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.json()))
        .then(result =>{
            setOutputWords(result);
            setOutputError("");
        })
        .catch(reject =>{
            reject.then(error =>{
                setOutputError(error.message);
                setOutputWords([]);
            })
        })
    }

    function changeSelect(e) {
        setOption(e.target.value);
    }

    function searcherChangeHandler(e){
        setWord(e.target.value)
    }

    function onHideResult(){
        setIsHide(true);
        setOutputWords([])
    }

    function onShowResult(e){
        setIsHide(false);
        searchFetch();
    }

    return (<>
    <header className='header'>
        <NavLink to="/" className="header__nav">
            Главная
        </NavLink>
        <div className='header__wrap-search-module'>
            <div className='header__search-module'>
                <input value={word} onChange={searcherChangeHandler} onClick={onShowResult} placeholder="Поиск..."></input>
                
                {!isHide &&
                    <ul>
                        {outputWords.map(outputWord =>{
                            return(
                                <NavLink to={"/show/" + outputWord.id} onClick={onHideResult}>
                                    <li key={outputWord.id}>{outputWord.word}</li>
                                </NavLink>
                            )
                        })}
                        {outputError && <li>{outputError}</li>}
                    </ul>
                }
            </div>
            {!isHide && <div className='header__overlay' onClick={onHideResult}></div>}
            <div className="header__selector">
                <p>Фильтр:</p>
                <select value={option} onChange={changeSelect}>
                    <option key={0} defaultValue={defaultOption}>{defaultOption}</option>
                    {dictionaries.map(dictionary =>{
                        return(<option key={dictionary.id} value={dictionary.id} >{dictionary.name}</option>)
                    })}
                </select>
            </div>
        </div>
    </header>
    </>)
}
