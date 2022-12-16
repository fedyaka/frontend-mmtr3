import React, { Component, useState } from 'react'
import path from '../path.js';

export default function LiTranslations(props){

    const {dictionary} = props;
    const [translation, setTranslation] = useState(props.translation);
    const [isDelete, setIsDelete] = useState(false);
    const [patchTranslation, setPatchTranslation] = useState(null);
    const [patchTranslationDirty, setPatchTranslationDirty] = useState(false);
    const [patchTranslationError, setPatchTranslationError] = useState("");
    const [inputValid, setInputValid] = useState(false);


    function deleteTranslation(){
        fetch(path.translation + "/" + translation.id, {
            method: "DELETE"
        })
        .then(res =>{
            if (res.ok){
                setIsDelete(true);
            }
        })
    }

    function saveTranslation(){
        fetch(path.translation, {
            method: "PATCH",
            body: JSON.stringify(patchTranslation),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.json()))
            .then(result =>{
                setTranslation(result);
                setInputValid(false);
                setPatchTranslation(null);
                setPatchTranslationDirty(false);
                setPatchTranslationError("");
            })
            .catch(result =>{
                result.then(error =>{
                    setInputValid(false);
                    setPatchTranslationError(error.message);
                })
            })
    }

    function patchHandler(){
        setPatchTranslation({
            wordId: translation.wordId,
            id: translation.id,
            translation: translation.translation
        });
    }

    function changeHandler(e){
        setPatchTranslation({
            wordId: patchTranslation.wordId,
            id: patchTranslation.id,
            translation: e.target.value
        });

        let regex = new RegExp(dictionary.rule.pattern);
        if (!regex.test(String(e.target.value))){
            setPatchTranslationError("Некорректный ввод")
            setInputValid(false);
        } else {
            setPatchTranslationError("");
            setInputValid(true);
        }
    }

    function cancelHandler(){
        setInputValid(false);
        setPatchTranslation(null);
        setPatchTranslationDirty(false);
        setPatchTranslationError("");
    }

    function blurHandler(){
        setPatchTranslationDirty(true);
    }
    
    if (!isDelete){
        if (!patchTranslation){
            return(<>
                <li>
                    {translation.translation} 
                    <button className='button show__button-change' onClick={patchHandler}>Ред.</button>
                    <button className='button del-button' onClick={deleteTranslation}>x</button>
                </li>
            </>)
        } else{
            return(<div className='align-items-center'>
                <p>Введите новое слово:</p>
                <div> 
                    <input value={patchTranslation.translation} onBlur={blurHandler} onChange={changeHandler}></input>
                    <button className='button del-button' onClick={cancelHandler}>x</button>
                </div>
                <button className='button margin-top' onClick={saveTranslation} disabled={!inputValid}>Сохранить</button>
                {patchTranslationDirty && patchTranslationError && 
                    <p className='show__error' >{patchTranslationError}</p>}
            </div>)
        }
    }
}
