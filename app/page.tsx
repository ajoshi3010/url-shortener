import AnalysisComponent from "./components/AnalysisComponent";
import InputPage from "./components/InputPage";

export default function Page() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '1', borderRight: '1px solid #ccc' }}>
        <InputPage />
      </div>
      <div style={{ flex: '1' }}>
        <AnalysisComponent />
      </div>
    </div>
  );
}