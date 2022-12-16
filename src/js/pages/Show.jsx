import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ULTranslations from '../components/ULTranslations.jsx';
import Word from '../components/Word.jsx';
import path from '../path.js';

export default function Show(props) {

    const { wordId } = useParams()
    const [dictionary, setDictionary] = useState(null);
    const [word, setWord] = useState(null);
    const [isDelete, setIsDelete] = useState(false);

    const [translations, setTranslations] = useState([]);
    const [newTranslation, setNewTranslation] = useState(null);
    const [newTranslationDirty, setNewTranslationDirty] = useState(false);
    const [newTranslationError, setNewTranslationError] = useState("Не может быть пустым");
    const [inputValid, setInputValid] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            let wordRes = await fetch(path.word + "/" + wordId);
            let wordResult = await wordRes.json();

            let dictionaryRes = await fetch(path.dictionary + "/" + wordResult.dictionaryId);
            let dictionaryResult = await dictionaryRes.json();

            setWord(wordResult);
            setDictionary(dictionaryResult)
            try{
                if (wordResult.translations){
                    setTranslations(wordResult.translations);
                }
            }
            catch{
                setTranslations([]);
            };
            setIsLoaded(true);
        }
        fetchData();
    }, []);

    function addInputTranslation(){
        let translation = {
            wordId: word.id,
            translation: ""
        }
        setNewTranslation(translation);
    }

    function saveTranslation(){
        fetch(path.translation, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTranslation)
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.json()))
            .then(result =>{
                setTranslations([...translations, result]);
                setInputValid(false);
                setNewTranslation(null);
                setNewTranslationDirty(false);
                setNewTranslationError("Не может быть пустым");
            })
            .catch(result =>{
                result.then(error =>{
                    setNewTranslationError(error.message);
                    setInputValid(false);
                })
            })
        
    }

    function cancelHandler(){
        setInputValid(false);
        setNewTranslation(null);
        setNewTranslationDirty(false);
        setNewTranslationError("Не может быть пустым");
    }

    function blurHandler(){
        setNewTranslationDirty(true);
    }

    function changeHandler(e){
        setNewTranslation({
            wordId: word.id,
            translation: e.target.value
        });

        let regex = new RegExp(dictionary.rule.pattern);
        if (!regex.test(String(e.target.value))){
            setNewTranslationError("Некорректный ввод")
            setInputValid(false);
        } else {
            setNewTranslationError("");
            setInputValid(true);
        }
    }

    function deleteWord(e){
        fetch(path.word + "/" + word.id, {
            method: "DELETE" 
        })
        .then(()=>{
            setIsDelete(true);  
        })
    }
    if (isLoaded && word == null){
        return <Navigate to={"error"}></Navigate>
    }

    if (isDelete){
        return <Navigate to={"/"}></Navigate>
    }

    if (isLoaded){
        return (<>
            <div className='show'>
                <h4>Слово:</h4>
                <Word word={word} dictionary={dictionary}></Word>
                <br></br>
                <h4>Пренадлежит:</h4>
                <p>{dictionary.name}</p>
                <br></br>
                <h4>Переводы:</h4>
                <ULTranslations translations={translations} dictionary={dictionary}></ULTranslations>
                {!newTranslation && 
                    <button onClick={addInputTranslation} className="button margin-top">Добавить перевод</button>}

                {newTranslation && 
                    <div>
                        <input onBlur={blurHandler} onChange={changeHandler} value={newTranslation.translation}/>
                        <button onClick={cancelHandler} className="button del-button">x</button><br></br>
                    </div>}
                {newTranslationDirty && newTranslationError && 
                        <p className='show__error' >{newTranslationError}</p>}
                {newTranslation && 
                    <button onClick={saveTranslation} disabled={!inputValid} className="button margin-top">Сохранить</button>}
                <button onClick={deleteWord} className="button del-button show__del-button">Удалить слово с его переводами</button>
            </div>
        </>)
    } else{
        <h4>Загрука...</h4>
    }
    
  
}
