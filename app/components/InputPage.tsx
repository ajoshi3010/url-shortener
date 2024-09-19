"use client";

import axios from "axios";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import Clipboard from "clipboard";
import { useRouter } from "next/navigation";
import { MyUrlsButton } from "./MyUrlsButton";

// Function to generate random strings
function generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }

    return randomString;
}

// Function to generate multiple random strings
function generateMultipleStrings(numStrings: number, length: number): string[] {
    const strings: string[] = [];

    for (let i = 0; i < numStrings; i++) {
        strings.push(generateRandomString(length));
    }

    return strings;
}

const ClipboardIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1v4H9m4-8H7v14h10V8h-4zM9 4h6v4H9V4z"
        />
    </svg>
);

const InputPage: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    const [customUrl, setCustomUrl] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);
    const [validCustom, setValidCustom] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false);
    const [checked, setChecked] = useState(false);
    const [mapped, setMapped] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [randomStrings, setRandomStrings] = useState<string[]>([]);
    const [stringSlashCheck, setStringSlashCheck] = useState(true);

    const clipboardRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (clipboardRef.current && mapped) {
            const clipboard = new Clipboard(clipboardRef.current, {
                text: () => `${process.env.NEXT_PUBLIC_API_BASE_URL}/${customUrl}`,
            });

            clipboard.on("success", () => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
            });

            clipboard.on("error", () => {
                setIsCopied(false);
            });

            return () => clipboard.destroy();
        }
    }, [customUrl, mapped]);

    useEffect(() => {
        // Generate random strings when the component mounts
        setRandomStrings(generateMultipleStrings(3, 5));
    }, []);

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
        setValidCustom(false);
        setValid(false);
        setChecked(false);
        setUrl(e.target.value);
    };


    const handleCustomUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target);
        // console.log(e.target.value);
        checkForSlash(e.target.value);
        setCustomUrl(e.target.value);
        setValidCustom(false);
        setValid(false);
        setChecked(false);
    };
    const checkForSlash = (str: string): void => {
        // Updated regex to require at least one character (no slashes allowed)
        const regex = /^[a-zA-Z0-9\-._~!$&'()*+,;=:@%]+$/;
        setStringSlashCheck(regex.test(str));
        // console.log(customUrl);
        // console.log(stringSlashCheck);
    };

    const checkCustomUrl = async () => {
        // checkForSlash();
        if (!stringSlashCheck) {
            setValidCustom(false);
            return;
        }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/urlCheck`, {
            customUrl: customUrl,
        });
        checkUrl();
        setChecked(true);
        setValidCustom(res.data.check);
    };

    const addUrlMap = async () => {
        setLoading2(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addMapping`, {
            realUrl: url,
            userUrl: customUrl,
        });
        if (res.data.done) {
            setMapped(true);
        } else {
            alert("The given URL already exists");
        }
        setLoading2(false);
    };

    const handleRandomStringClick = (str: string) => {
        setCustomUrl(str);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-blue-600">URL Shortener</h1>
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
                <div className="mb-6">
                    <input
                        disabled={mapped}
                        className={`w-full p-4 border-2 rounded-lg transition-colors focus:outline-none focus:border-blue-500 ${valid ? "border-gray-300 bg-gray-50" : "border-blue-500"
                            }`}
                        placeholder="Enter the URL you want to shorten"
                        type="text"
                        onChange={handleUrlChange}
                        value={url}
                    />
                </div>

                <div className="mb-6 inline-flex" >
                    <input
                        disabled={true}
                        className={` placeholder-black w-full p-4 border-2 rounded-lg transition-colors focus:outline-none focus:border-blue-500 ${validCustom ? "border-gray-300 bg-gray-50" : "border-blue-500"
                            }`}
                        placeholder={`${process.env.NEXT_PUBLIC_API_BASE_URL}/`}
                        type="text"

                    />
                    <input
                        disabled={mapped}
                        className={`w-full p-4 border-2 rounded-lg transition-colors focus:outline-none focus:border-blue-500 ${validCustom ? "border-gray-300 bg-gray-50" : "border-blue-500"
                            }`}
                        placeholder="Enter custom URL"
                        type="text"
                        value={customUrl}
                        onChange={handleCustomUrlChange}
                    />
                </div>
                <div className="mb-6">
                    {
                        !checked && (
                            <div className="flex space-x-4 mb-4">
                                {randomStrings.map((str, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleRandomStringClick(str)}
                                        className="bg-gray-200 p-4 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
                                    >
                                        {str}
                                    </button>
                                ))}
                            </div>
                        )
                    }


                    {
                        !stringSlashCheck && (
                            <div className="text-red-600">Invalid custom url</div>
                        )
                    }

                    {!loading && !valid && !validCustom && (
                        <button
                            className="mt-4 bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={checkCustomUrl}
                        >
                            Check Availability
                        </button>
                    )}
                    {loading && (
                        <button
                            className="mt-4 bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={checkCustomUrl}
                        >
                            <div className="text-center">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                        </button>
                    )}

                    {!loading2 && validCustom && valid && (
                        <button
                            className="mt-4 bg-green-500 text-white w-full py-3 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={addUrlMap}
                        >
                            Add URL
                        </button>
                    )}
                    {loading2 && (
                        <button
                            className="mt-4 bg-green-500 text-white w-full py-3 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={addUrlMap}
                        >
                            <div className="text-center">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                        </button>
                    )}

                    {mapped && (
                        <div className="mt-6 flex flex-col items-center">
                            <div className="flex items-center">
                                <p className="text-blue-600 font-semibold text-lg">{`${process.env.NEXT_PUBLIC_API_BASE_URL}/${customUrl}`}</p>
                                <button
                                    ref={clipboardRef}
                                    className="ml-4 text-gray-500 hover:text-gray-700"
                                    title="Copy to clipboard"
                                >
                                    <ClipboardIcon />
                                </button>
                                {isCopied && <span className="ml-2 text-green-600 text-sm">Copied!</span>}
                            </div>
                            <p className="text-gray-500 mt-4">Refresh the page to shorten another URL</p>
                        </div>
                    )}
                </div>
            </div>
            <MyUrlsButton />
        </div>
    );
};

export default InputPage;
