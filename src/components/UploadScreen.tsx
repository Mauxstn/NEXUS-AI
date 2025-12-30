import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, ArrowLeft, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { Screen, Tool } from '../App';

interface UploadScreenProps {
  selectedTool: Tool;
  onNavigate: (screen: Screen) => void;
  onImageUpload: (imageUrl: string) => void;
}

export function UploadScreen({ selectedTool, onNavigate, onImageUpload }: UploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const toolNames = {
    'background-removal': 'Background Removal',
    'watermark-removal': 'Watermark Removal',
    'enhancement': 'Image Enhancement'
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleProcess = () => {
    if (preview) {
      onImageUpload(preview);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('landing')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl tracking-wider text-white">NEXUS AI</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
              <span className="text-sm text-red-400">{toolNames[selectedTool]}</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-white">Upload Your Image</h1>
            <p className="text-gray-300">
              Drag and drop your image or click to browse. Supports JPG, PNG, and WebP formats.
            </p>
          </div>

          {/* Upload Area */}
          <Card className="bg-white/5 border-white/10 overflow-hidden">
            <div className="p-8">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
                  isDragging
                    ? 'border-red-500 bg-red-500/10'
                    : preview
                    ? 'border-red-500/30 bg-red-500/5'
                    : 'border-white/20 bg-white/5'
                }`}
              >
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-96 object-contain rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/60 text-white"
                        onClick={() => setPreview(null)}
                      >
                        Remove
                      </Button>
                      <label className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/60 text-white"
                          asChild
                        >
                          <span>Change Image</span>
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center py-20 cursor-pointer">
                    <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-xl mb-2 text-white">
                      {isDragging ? 'Drop your image here' : 'Drag & drop your image'}
                    </h3>
                    <p className="text-gray-400 mb-4">or click to browse</p>
                    <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                      Upload Image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* File Info */}
              {preview && (
                <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-red-400" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-300">Image ready for processing</div>
                      <div className="text-xs text-gray-500">Click process to continue</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Process Button */}
              {preview && (
                <div className="mt-6">
                  <Button
                    size="lg"
                    className="w-full bg-red-600 hover:bg-red-700 text-white border-0"
                    onClick={handleProcess}
                  >
                    Process Image
                    <Zap className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Tips */}
          <Card className="bg-red-500/5 border-red-500/20">
            <div className="p-6">
              <h3 className="mb-4 text-white">Tips for Best Results</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Use high-resolution images for better quality output</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Images with clear subjects work best for background removal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Maximum file size: 10MB per image</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Supported formats: JPG, PNG, WebP</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}