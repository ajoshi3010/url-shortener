"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Clipboard from "clipboard";

interface Url {
  userUrl: string;
  realUrl: {
    realUrl: string;
  };
}

interface UrlRowProps {
  url: Url;
}

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

const UrlRow = ({ url }: UrlRowProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const clipboardRef = useRef<HTMLButtonElement>(null);

  const deleteUrl = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this URL?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteMap`, {
        data: {
          userUrl: url.userUrl,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  useEffect(() => {
    const clipboard = new Clipboard(clipboardRef.current!, {
      text: () => url.realUrl.realUrl,
    });

    clipboard.on('success', () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });

    clipboard.on('error', () => {
      setIsCopied(false);
    });

    return () => clipboard.destroy();
  }, [url.realUrl.realUrl]);

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-2 px-4">{url.userUrl}</td>
      <td className="py-2 px-4 max-w-xs truncate flex items-center">
        <a
          href={url.realUrl.realUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block whitespace-nowrap overflow-hidden text-ellipsis text-blue-500 hover:text-blue-700"
        >
          {url.realUrl.realUrl}
        </a>
        <button
          ref={clipboardRef}
          className="ml-2 text-gray-500 hover:text-gray-700"
          title="Copy to clipboard"
        >
          <ClipboardIcon />
        </button>
        {isCopied && <span className="ml-2 text-green-600 text-sm">Copied!</span>}
      </td>
      <td className="py-2 px-4 text-center">
        <button
          onClick={deleteUrl}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UrlRow;
