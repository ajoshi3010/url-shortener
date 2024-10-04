"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  shortUrlId: string; // Add the prop type here
}

const Chart = ({ shortUrlId }: ChartProps) => {
  const [clicksData, setClicksData] = useState([]);
  const [osData, setOsData] = useState([]); // State for OS-wise click data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data for the clicks grouped by country
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clicksByCountry?shortUrlId=${shortUrlId}`
        );
        const data = await res.json();
        setClicksData(data.clicks);
      } catch (err) {
        setError("Error fetching country data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shortUrlId]); // Include shortUrlId as a dependency

  // Fetch data for the clicks grouped by OS
  useEffect(() => {
    const fetchOsData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clicksByOs?shortUrlId=${shortUrlId}`
        );
        const data = await res.json();
        setOsData(data.clicks); // Assuming the response structure is similar
      } catch (err) {
        setError("Error fetching OS data");
      }
    };

    if (shortUrlId) {
      fetchOsData();
    }
  }, [shortUrlId]); // Include shortUrlId as a dependency

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Colors for the pie charts
  const COLORS = ['#4F46E5', '#FF4500', '#32CD32', '#FFD700', '#FF69B4'];
  if(!clicksData){
    return <p className="text-center text-lg">Select a Url to show analytics</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Country-wise Click Data</h1>
      <span className="bg-blue-500 text-white px-2 py-1 rounded-full mb-4">
        Short URL ID: {shortUrlId}
      </span>
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-2xl mb-6">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={clicksData}
              dataKey="clicks"
              nameKey="country"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {clicksData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">OS-wise Click Data</h1>
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-2xl">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={osData}
              dataKey="clicks"
              nameKey="os" 
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {osData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
