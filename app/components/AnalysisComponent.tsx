// AnalysisComponent
"use client";
import axios from "axios";
import Analysis from "../components/Analysis";
import React, { useEffect, useState } from "react";

export default function AnalysisComponent() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function fetch() {
      try {
        const d = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/urlCountData`);
        setData(d.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">URL Analysis</h2>
      <Analysis data={data} />
    </div>
  );
}
