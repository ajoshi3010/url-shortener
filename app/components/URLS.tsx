import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import UrlRow from "./URLRow";

interface Url {
  userUrl: string;
  realUrl: {
    realUrl: string;
  };
}

export default async function URLS() {
  const { userId } = auth();
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/urls`, {
    userId: userId
  });
  const urls: Url[] = response.data.urls; // Ensure the data structure matches your API response

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">User Url</th>
            <th className="py-2 px-4 text-left">Real Url</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url: Url) => (
            <UrlRow key={url.userUrl} url={url} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
