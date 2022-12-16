import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from "react-router-dom";
import path from '../path';

export default function AddWord(props) {

    const { dictionaryId } = useParams();
    const [regex, setRegex] = useState(new RegExp(""));
    const [regexDescription, setRegexDescription] = useState("");
    const [word, setWord] = useState("");
    const [wordDirty, setWordDirty] = useState(false);
    const [wordError, setWordError] = useState("Не может быть пустым");
    const [inputValid, setinputValid] = useState(false);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        fetch(path.dictionary + "/" + dictionaryId)
            .then(res => res.json())
            .then(dictionary => {
                setRegex(new RegExp(dictionary.rule.pattern));
                setRegexDescription(dictionary.rule.description);
            })
    }, [])

    useEffect(() => {
        if (wordError) {
            setinputValid(false);
        } else {
            setinputValid(true);
        }
    }, [wordError])

    const blurHandler = (e) => {
        setWordDirty(true);
    }

    function handleChange(e) {
        setWord(e.target.value);

        if (!regex.test(String(e.target.value))) {
            setWordError("Ввод некорректный");
        } else {
            setWordError("");
        }
    }

    function handleSubmit() {
        const pushWord = {
            dictionaryId: dictionaryId,
            word: word
        };

        fetch(path.word, {
            method: "POST",
            body: JSON.stringify(pushWord),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.json()))
            .then(result => {
                setResponse(result);
            })
            .catch(error => {
                error.then(error => {
                    setWordError(error.message);
                    setinputValid(false);
                })
            })
    }

    if (response) {
        return <Navigate to={"/show/" + response.id}></Navigate>
    }

    return (
        <div className='add-word'>
            <p className='add-word__title'>Введите добавляемое слово:</p>
            <p className='add-word__pattern'>{regexDescription}</p>
            <input onBlur={blurHandler} onChange={handleChange} value={word} />
            {wordDirty && wordError && 
                <p className='add-word__error' >{wordError}</p>}
            <button onClick={handleSubmit} disabled={!inputValid} className="button add-word__button">Сохранить</button>
        </div> 
    )
}
