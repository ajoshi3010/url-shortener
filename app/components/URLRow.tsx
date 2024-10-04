"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Clipboard from "clipboard";

interface Url {
  userUrl: string;
  realUrl: string;
}

interface UrlRowProps {
  url: Url;
  change: (userUrl: string) => void; // Update to specify that change is a function accepting userUrl as argument
}

const ClipboardIcon = () => (
  <svg
    fill="#000000"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    width="15px"
    height="15px"
    viewBox="0 0 93.842 93.843"
  >
    <g>
      <path d="M74.042,11.379h-9.582v-0.693c0-1.768-1.438-3.205-3.206-3.205h-6.435V3.205C54.819,1.437,53.381,0,51.614,0H42.23
        c-1.768,0-3.206,1.438-3.206,3.205V7.48H32.59c-1.768,0-3.206,1.438-3.206,3.205v0.693h-9.582c-2.393,0-4.339,1.945-4.339,4.34
        v73.785c0,2.394,1.946,4.34,4.339,4.34h54.238c2.394,0,4.339-1.946,4.339-4.34V15.719C78.38,13.324,76.434,11.379,74.042,11.379z
        M32.617,25.336h28.61c1.709,0,3.102-1.391,3.102-3.1v-3.438h7.554l0.021,68.164l-49.939,0.021V18.801h7.554v3.436
        C29.517,23.945,30.907,25.336,32.617,25.336z"/>
    </g>
  </svg>
);

const UrlRow = ({ url, change }: UrlRowProps) => {
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
      text: () => url.realUrl,
    });

    clipboard.on('success', () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });

    clipboard.on('error', () => {
      setIsCopied(false);
    });

    return () => clipboard.destroy();
  }, [url.realUrl]);

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-2 px-4">{url.userUrl}</td>
      <td className="py-2 px-4 max-w-xs truncate flex items-center">
        <a
          href={url.realUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block whitespace-nowrap overflow-hidden text-ellipsis text-blue-500 hover:text-blue-700"
        >
          {url.realUrl}
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
        <button
          onClick={() => change(url.userUrl)} // Correctly call change with userUrl
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors ml-2"
        >
          Show Analytics
        </button>
      </td>
    </tr>
  );
};

export default UrlRow;
