import URLS from "../../components/URLS";
import AnalysisComponent from "../../components/AnalysisComponent";

export default function Page() {



  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* URLS Section */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your URLs</h2>
          <URLS />
        </div>

        {/* Analysis Section */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis</h2>
          <AnalysisComponent />
        </div>
      </div>
    </div>
  );
}
