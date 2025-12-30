import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { UploadScreen } from './components/UploadScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultScreen } from './components/ResultScreen';
import { PricingPage } from './components/PricingPage';

export type Screen = 'landing' | 'upload' | 'processing' | 'result' | 'pricing';
export type Tool = 'background-removal' | 'watermark-removal' | 'enhancement';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedTool, setSelectedTool] = useState<Tool>('background-removal');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <div className="dark min-h-screen bg-black">
      {currentScreen === 'landing' && (
        <LandingPage 
          onNavigate={setCurrentScreen}
          onToolSelect={setSelectedTool}
        />
      )}
      {currentScreen === 'upload' && (
        <UploadScreen 
          selectedTool={selectedTool}
          onNavigate={setCurrentScreen}
          onImageUpload={(image) => {
            setUploadedImage(image);
            setCurrentScreen('processing');
          }}
        />
      )}
      {currentScreen === 'processing' && (
        <ProcessingScreen 
          selectedTool={selectedTool}
          uploadedImage={uploadedImage}
          onComplete={() => setCurrentScreen('result')}
        />
      )}
      {currentScreen === 'result' && (
        <ResultScreen 
          selectedTool={selectedTool}
          originalImage={uploadedImage}
          onNavigate={setCurrentScreen}
          onNewImage={() => {
            setUploadedImage(null);
            setCurrentScreen('upload');
          }}
        />
      )}
      {currentScreen === 'pricing' && (
        <PricingPage onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}