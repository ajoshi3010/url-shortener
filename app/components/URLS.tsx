"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs"; // Importing Clerk's useAuth hook
import axios from "axios";
import UrlRow from "./URLRow";
import BackButton from "./BackButton";
import Chart from "./Chart";

interface Url {
  userUrl: string;
  realUrl: string;
}

export default function URLS() {
  const { userId } = useAuth(); // Get the user ID from Clerk's authentication hook
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [focusUrl,setFocusUrl]=useState("");
  // Fetch URLs on component mount
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/urls`, {
          userId: userId,
        });
        setUrls(response.data.urls);
      } catch (err) {
        setError("Error fetching URLs");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUrls();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex p-6 bg-gray-100 min-h-screen">
      {/* Left Side: URL List */}
      <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg">
        <BackButton />
        <h2 className="text-2xl font-bold mb-4">My URLs</h2>
        <table className="w-full bg-gray-50 shadow rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">User URL</th>
              <th className="py-2 px-4 text-left max-w-xs">Real URL</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url: Url) => (
              <UrlRow key={url.userUrl} url={url} change={setFocusUrl} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Side: Chart */}
      <div className="w-1/2 p-4">
        <Chart shortUrlId={focusUrl}/> {/* Place your Chart component here */}
      </div>
    </div>
  );
}
