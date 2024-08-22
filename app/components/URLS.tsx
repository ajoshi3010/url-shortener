import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import UrlRow from "./URLRow";
import BackButton from "./BackButton";
interface Url {
  userUrl: string;
  realUrl: {
    realUrl: string;
  };
}

export default async function URLS() {
  const { userId } = auth();
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/urls`, {
    userId: userId,
  });
  const urls: Url[] = response.data.urls; // Ensure the data structure matches your API response

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <BackButton/>
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
            <UrlRow key={url.userUrl} url={url} />
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
