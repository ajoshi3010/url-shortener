
import InputPage from "./components/InputPage";
import './globals.css';

export default function Page() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 border-r border-gray-300">
        <InputPage />
      </div>
    
    </div>
  );
}