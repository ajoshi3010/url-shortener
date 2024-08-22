"use client";

import axios from "axios";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import Clipboard from "clipboard";
import { useRouter } from "next/navigation";

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-gray-500 hover:text-gray-700"
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
  const [checked, setChecked] = useState(false);
  const [mapped, setMapped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const clipboardRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (clipboardRef.current && mapped) {
      const clipboard = new Clipboard(clipboardRef.current, {
        text: () => `${process.env.NEXT_PUBLIC_API_BASE_URL}/${customUrl}`,
      });

      clipboard.on('success', () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      });

      clipboard.on('error', () => {
        setIsCopied(false);
      });

      return () => clipboard.destroy();
    }
  }, [customUrl, mapped]);

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
    setValidCustom(false);
    setChecked(false);
    setCustomUrl(e.target.value);
  };

  const checkCustomUrl = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/urlCheck`, {
      customUrl: customUrl,
    });
    checkUrl();
    setChecked(true);
    setValidCustom(res.data.check);
  };

  const addUrlMap = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addMapping`, {
      realUrl: url,
      userUrl: customUrl,
    });
    if (res.data.done) {
      setMapped(true);
    } else {
      alert("The given URL already exists");
    }
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

        <div className="mt-4 mb-4">
          <input
            className={`w-full p-3 border rounded-lg ${validCustom ? 'border-gray-300 bg-gray-100' : 'border-blue-500'}`}
            placeholder="Enter custom URL"
            type="text"
            onChange={handleCustomUrlChange}
            value={customUrl}
          />
          {!loading && !valid && !validCustom && (
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={checkCustomUrl}
            >
              Check Availability
            </button>
          )}
        </div>

        {validCustom && valid && (
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={addUrlMap}
          >
            Add URL
          </button>
        )}

        {mapped && (
          <div className="flex items-center mt-4">
            <p className="text-blue-500">{`${process.env.NEXT_PUBLIC_API_BASE_URL}/${customUrl}`}</p>
            <button
              ref={clipboardRef}
              className="ml-2 text-gray-500 hover:text-gray-700"
              title="Copy to clipboard"
            >
              <ClipboardIcon />
            </button>
            {isCopied && <span className="ml-2 text-green-600 text-sm">Copied!</span>}
          </div>
        )}
      </div>
      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        onClick={() => router.push('/pages/test')}
      >
        My URLs
      </button>
    </div>
  );
};

export default InputPage;
