import URLS from "../../components/URLS";
import AnalysisComponent from "../../components/AnalysisComponent";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Page() {



  return (
    <>
    <SignedIn>

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
    </SignedIn>
    <SignedOut>
            <button
                    className="mt-6 bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    
                >
                    <SignInButton>Sign in to access URLs</SignInButton>
                </button>
            </SignedOut>
    </>
  );
}
