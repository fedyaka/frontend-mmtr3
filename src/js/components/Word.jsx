import React, { useState } from 'react';
import path from '../path.js';

export default function Word(props){

    const {dictionary} = props;
    const [word, setWord] = useState(props.word);
    const [patchWord, setPatchWord] = useState(null);
    const [patchWordDirty, setPatchWordDirty] = useState(false);
    const [patchWordError, setPatchWordError] = useState("");
    const [inputValid, setInputValid] = useState(false);
    
    function saveWord(){
        fetch(path.word, {
            method: "PATCH",
            body: JSON.stringify(patchWord),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.json()))
            .then(result =>{
                setWord(result);
                setInputValid(false);
                setPatchWord(null);
                setPatchWordDirty(false);
                setPatchWordError("");
            })
            .catch(result =>{
                result.then(error =>{
                    setInputValid(false);
                    setPatchWordError(error.message);
                })
            })
    }

    function patchHandler(){
        setPatchWord({
            dictionaryId: word.dictionaryId,
            id: word.id,
            word: word.word
        });
    }

    function changeHandler(e){
        setPatchWord({
            dictionaryId: patchWord.dictionaryId,
            id: patchWord.id,
            word: e.target.value
        });

        let regex = new RegExp(dictionary.rule.pattern);
        if (!regex.test(String(e.target.value))){
            setPatchWordError("Некорректный ввод")
            setInputValid(false);
        } else {
            setPatchWordError("");
            setInputValid(true);
        }
    }

    function cancelHandler(){
        setInputValid(false);
        setPatchWord(null);
        setPatchWordDirty(false);
        setPatchWordError("");
    }

    function blurHandler(){
        setPatchWordDirty(true);
    }
    
    if (!patchWord){
        return(
        <div className='show__word-wrap'>
            {word.word}
            <button onClick={patchHandler} className="button show__button-change">Ред.</button>
        </div>)
    }else{
        return(
        <div className='show__word-wrap align-items-center'>
            <p>Введите новое слово:</p>
            <div>
                <input value={patchWord.word} onBlur={blurHandler} onChange={changeHandler}></input>
                <button onClick={cancelHandler} className="button del-button">x</button>
            </div>
            {patchWordDirty && patchWordError && <p className='show__error'>{patchWordError}</p>}
            <button onClick={saveWord} disabled={!inputValid} className="button margin-top">Сохранить</button>
        </div>)
    }

}
