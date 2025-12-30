import { useEffect, useState } from 'react';
import { Loader2, Sparkles, Zap } from 'lucide-react';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import type { Tool } from '../App';

interface ProcessingScreenProps {
  selectedTool: Tool;
  uploadedImage: string | null;
  onComplete: () => void;
}

export function ProcessingScreen({ selectedTool, uploadedImage, onComplete }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Analyzing image...');

  const toolNames = {
    'background-removal': 'Background Removal',
    'watermark-removal': 'Watermark Removal',
    'enhancement': 'Image Enhancement'
  };

  const stages = [
    'Analyzing image...',
    'Detecting subject areas...',
    'Applying AI processing...',
    'Optimizing results...',
    'Finalizing output...'
  ];

  useEffect(() => {
    let currentStage = 0;
    const duration = 4000; // 4 seconds total
    const stageInterval = duration / stages.length;
    const progressInterval = 50;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration / progressInterval));
        
        // Update stage based on progress
        const newStage = Math.floor((newProgress / 100) * stages.length);
        if (newStage !== currentStage && newStage < stages.length) {
          currentStage = newStage;
          setStage(stages[newStage]);
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, progressInterval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center animate-pulse">
              <Zap className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Main Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-12 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
                  <Sparkles className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-red-400">{toolNames[selectedTool]}</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl text-white">Processing Your Image</h1>
                <p className="text-gray-300">
                  Our AI is working its magic. This usually takes just a few seconds.
                </p>
              </div>

              {/* Image Preview */}
              {uploadedImage && (
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={uploadedImage}
                    alt="Processing"
                    className="w-full h-64 object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="h-12 w-12 text-red-400 animate-spin" />
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="space-y-4">
                <Progress 
                  value={progress} 
                  className="h-2 bg-white/5"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{stage}</span>
                  <span className="text-red-400">{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Processing Steps */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {stages.slice(0, 4).map((s, index) => {
                  const isActive = stages.indexOf(stage) === index;
                  const isComplete = stages.indexOf(stage) > index;
                  
                  return (
                    <div
                      key={s}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        isActive
                          ? 'border-red-500/50 bg-red-500/10'
                          : isComplete
                          ? 'border-red-500/30 bg-red-500/5'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isComplete ? (
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                        ) : isActive ? (
                          <Loader2 className="h-3 w-3 text-red-400 animate-spin" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-white/20" />
                        )}
                        <span className="text-xs text-gray-400">Step {index + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Info Text */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Processing time may vary based on image size and complexity
          </p>
        </div>
      </div>
    </div>
  );
}
