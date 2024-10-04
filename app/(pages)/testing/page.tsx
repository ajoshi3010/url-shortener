"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Page() {
  const [clicksData, setClicksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data for the clicks grouped by country
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shortUrlId = "heelo"; // Replace this with your dynamic value if needed
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clicksByCountry?shortUrlId=${shortUrlId}`);
        const data = await res.json();
        setClicksData(data.clicks);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Country-wise Click Data</h1>
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-2xl">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={600}
            height={300}
            data={clicksData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clicks" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
