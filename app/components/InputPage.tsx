"use client"

import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import styles from './InputPage.module.css';

const InputPage: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    const [customUrl, setCustomUrl] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);
    const [validCustom, setValidCustom] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [checked, setChecked] = useState(false);

    // ... (rest of your functions remain the same)
    const checkUrl = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/check', { url });
            setValid(res.data.valid);
        } catch (error) {
            setValid(false);
        }
        setLoading(false);
    };

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };
    const handleCustomUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCustomUrl(e.target.value);
    };
    const checkCustomUrl = async () => {
        const res = await axios.post("http://localhost:3000/api/urlCheck", {
            customUrl: customUrl
        })
        console.log("here")
        setChecked(true)
        setValidCustom(res.data.check)
    }
    const addUrlMap = async () => {
        const res = await axios.post("http://localhost:3000/api/addMapping", {
            realUrl: url,
            userUrl: customUrl
        })
        if (res.data.done) {
            alert("Successfully added your url " + customUrl)
        }
        else {
            alert("the given url already exists")

        }
        window.location.reload();

    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>URL Shortener</h1>
            <div className={styles.card}>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.input}
                        placeholder="Enter URL"
                        type="text"
                        onChange={handleUrlChange}
                        disabled={valid}
                        value={url}
                    />
                    {!valid && !loading && (
                        <button className={styles.button} onClick={checkUrl}>
                            Validate
                        </button>
                    )}
                </div>
                {loading && !valid && (
                    <div className={styles.loaderWrapper}>
                        <div className={styles.loader}></div>
                        <span>Validating...</span>
                    </div>
                )}
                {valid && (
                    <div className={styles.customUrlSection}>
                        <div className={styles.inputWrapper}>
                            <input
                                disabled={validCustom}
                                className={styles.input}
                                type="text"
                                placeholder="Enter custom URL"
                                value={customUrl}
                                onChange={handleCustomUrlChange}
                            />
                            <button className={styles.button} onClick={checkCustomUrl}>
                                Check
                            </button>
                        </div>
                        {checked && !validCustom && (
                            <p className={styles.errorMessage}>Custom URL not available</p>
                        )}
                    </div>
                )}
                {validCustom && (
                    <button className={styles.addButton} onClick={addUrlMap}>
                        Add your URL
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputPage;