"use client"

import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const InputPage: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    const [customUrl, setCustomUrl] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);
    const [validCustom, setValidCustom] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [checked, setChecked] = useState(false);
    const router = useRouter(); // Hook for navigation

    const checkUrl = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/check`, { url });
            setValid(res.data.valid);
        } catch (error) {
            setValid(false);
        }
        setLoading(false);
    };

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (validCustom || valid) {
            setValidCustom(false)
            setValid(false)
            setChecked(false)
        }
        setUrl(e.target.value);
    };

    const handleCustomUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (validCustom || valid) {
            setValid(false)
            setChecked(false)
            setValidCustom(false)
        }
        setCustomUrl(e.target.value);
    };

    const checkCustomUrl = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/urlCheck`, {
            customUrl: customUrl
        });
        checkUrl()
        setChecked(true);
        setValidCustom(res.data.check);
    };

    const addUrlMap = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addMapping`, {
            realUrl: url,
            userUrl: customUrl
        });
        if (res.data.done) {
            alert(`Successfully added your URL ${customUrl}`);
        } else {
            alert("The given URL already exists");
        }
        alert(`You can access your site at ${process.env.NEXT_PUBLIC_API_BASE_URL}/${customUrl}`);
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">URL Shortener</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="mb-4">
                    <input
                        className={`w-full p-3 border rounded-lg ${valid ? 'border-gray-300 bg-gray-100' : 'border-blue-500'}`}
                        placeholder="Enter the URL you want to shorten"
                        type="text"
                        onChange={handleUrlChange}

                        value={url}
                    />

                </div>


                <div className="mt-4">
                    <div className="mb-4">
                        <input
                            className={`w-full p-3 border rounded-lg ${validCustom ? 'border-gray-300 bg-gray-100' : 'border-blue-500'}`}
                            type="text"
                            placeholder="Enter custom URL"
                            value={customUrl}
                            onChange={handleCustomUrlChange}
                        />
                        {
                            !loading && !valid && !validCustom ? (
                                <button
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    onClick={checkCustomUrl}
                                >
                                    Check Availability
                                </button>
                            ) : loading ? (
                                <div className="flex items-center space-x-2 mt-2">
                                    <div className="w-4 h-4 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                                    <span>Validating...</span>
                                </div>
                            ) : null
                        }


                    </div>
                    {checked && !validCustom && (
                        <p className="text-red-500">Custom URL not available</p>
                    )}
                </div>

                {validCustom && valid && (
                    <button
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        onClick={addUrlMap}
                    >
                        Add your URL
                    </button>
                )}
            </div>
            <button
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => router.push('/test')}
            >
                Your URLs
            </button>
        </div>
    );
};

export default InputPage;
