// Page Component
import URLS from "../components/URLS";
import AnalysisComponent from "../components/AnalysisComponent";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* URLS Section */}
        <URLS />

        {/* Analysis Section */}
        <AnalysisComponent />
      </div>
    </div>
  );
}
