"use client";

import axios from "axios";

interface Url {
  userUrl: string;
  realUrl: {
    realUrl: string;
  };
}

interface UrlRowProps {
  url: Url;
}

const UrlRow = ({ url }: UrlRowProps) => {
  const deleteUrl = async () => {
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

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-2 px-4">{url.userUrl}</td>
      <td className="py-2 px-4">{url.realUrl.realUrl}</td>
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
