import { useState } from 'react';
import { Download, ArrowLeft, Repeat, Zap, Settings2, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { Screen, Tool } from '../App';

interface ResultScreenProps {
  selectedTool: Tool;
  originalImage: string | null;
  onNavigate: (screen: Screen) => void;
  onNewImage: () => void;
}

export function ResultScreen({ selectedTool, originalImage, onNavigate, onNewImage }: ResultScreenProps) {
  const [comparePosition, setComparePosition] = useState(50);
  const [exportFormat, setExportFormat] = useState('png');
  const [quality, setQuality] = useState([95]);
  const [showExportPanel, setShowExportPanel] = useState(false);

  const toolNames = {
    'background-removal': 'Background Removal',
    'watermark-removal': 'Watermark Removal',
    'enhancement': 'Image Enhancement'
  };

  const handleDownload = () => {
    // Simulate download
    console.log(`Downloading as ${exportFormat} with quality ${quality[0]}%`);
    alert(`Image downloaded as ${exportFormat.toUpperCase()} (${quality[0]}% quality)`);
  };

  return (
    <div className="min-h-screen bg-black">
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
                Home
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl tracking-wider text-white">NEXUS AI</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExportPanel(!showExportPanel)}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <Settings2 className="h-4 w-4 mr-2" />
                Export Settings
              </Button>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white border-0"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">Processing Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-white">Your Results Are Ready</h1>
            <p className="text-gray-300">
              Compare the before and after results, adjust settings, and download when ready
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Comparison Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs for view mode */}
              <Tabs defaultValue="compare" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-white/5">
                  <TabsTrigger value="compare">Compare</TabsTrigger>
                  <TabsTrigger value="before">Before</TabsTrigger>
                  <TabsTrigger value="after">After</TabsTrigger>
                </TabsList>
                
                <TabsContent value="compare" className="mt-6">
                  <Card className="bg-white/5 border-white/10 overflow-hidden">
                    <div className="relative aspect-video bg-gradient-to-br from-red-500/5 to-red-700/5">
                      {originalImage && (
                        <>
                          {/* Before/After Comparison Slider */}
                          <div className="relative w-full h-full">
                            {/* After Image (Full) */}
                            <div className="absolute inset-0">
                              <img
                                src={originalImage}
                                alt="Processed"
                                className="w-full h-full object-contain"
                                style={{ filter: 'brightness(1.1) contrast(1.05) saturate(1.1)' }}
                              />
                              <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-500/30">
                                <span className="text-xs text-red-300">After</span>
                              </div>
                            </div>
                            
                            {/* Before Image (Clipped) */}
                            <div 
                              className="absolute inset-0 overflow-hidden"
                              style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                            >
                              <img
                                src={originalImage}
                                alt="Original"
                                className="w-full h-full object-contain"
                              />
                              <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                                <span className="text-xs text-gray-300">Before</span>
                              </div>
                            </div>
                            
                            {/* Slider Handle */}
                            <div 
                              className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
                              style={{ left: `${comparePosition}%` }}
                            >
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                                <div className="flex gap-0.5">
                                  <div className="w-0.5 h-4 bg-gray-800" />
                                  <div className="w-0.5 h-4 bg-gray-800" />
                                </div>
                              </div>
                            </div>

                            {/* Slider Input */}
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={comparePosition}
                              onChange={(e) => setComparePosition(Number(e.target.value))}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                  <p className="text-center text-sm text-gray-400 mt-2">
                    Drag the slider to compare before and after
                  </p>
                </TabsContent>
                
                <TabsContent value="before" className="mt-6">
                  <Card className="bg-white/5 border-white/10 overflow-hidden">
                    <div className="relative aspect-video bg-gradient-to-br from-red-500/5 to-red-700/5">
                      {originalImage && (
                        <img
                          src={originalImage}
                          alt="Original"
                          className="w-full h-full object-contain"
                        />
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                        <span className="text-xs text-gray-300">Original Image</span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="after" className="mt-6">
                  <Card className="bg-white/5 border-white/10 overflow-hidden">
                    <div className="relative aspect-video bg-gradient-to-br from-red-500/5 to-red-700/5">
                      {originalImage && (
                        <img
                          src={originalImage}
                          alt="Processed"
                          className="w-full h-full object-contain"
                          style={{ filter: 'brightness(1.1) contrast(1.05) saturate(1.1)' }}
                        />
                      )}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-500/30">
                        <span className="text-xs text-red-300">Processed Image</span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-white/10 hover:bg-white/5 text-white"
                  onClick={onNewImage}
                >
                  <Repeat className="h-4 w-4 mr-2" />
                  Process Another Image
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Result
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tool Info */}
              <Card className="bg-red-500/5 border-red-500/20">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white">Processing Details</h3>
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tool Used:</span>
                      <span className="text-red-400">{toolNames[selectedTool]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing Time:</span>
                      <span className="text-gray-300">2.3s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quality:</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Export Settings */}
              <Card className={`bg-white/5 border-white/10 transition-all duration-300 ${showExportPanel ? 'ring-2 ring-red-500/30' : ''}`}>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white">Export Settings</h3>
                    <Settings2 className="h-5 w-5 text-red-400" />
                  </div>

                  {/* Format Selection */}
                  <div className="space-y-2">
                    <Label className="text-white">Output Format</Label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG (Lossless)</SelectItem>
                        <SelectItem value="jpg">JPG (Smaller size)</SelectItem>
                        <SelectItem value="webp">WebP (Modern)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quality Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Quality</Label>
                      <span className="text-sm text-gray-400">{quality[0]}%</span>
                    </div>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      min={50}
                      max={100}
                      step={5}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">
                      Higher quality means larger file size
                    </p>
                  </div>

                  {/* Resolution Info */}
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resolution:</span>
                      <span className="text-gray-300">1920 × 1080</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Est. File Size:</span>
                      <span className="text-gray-300">{exportFormat === 'png' ? '2.4 MB' : exportFormat === 'webp' ? '0.8 MB' : '1.2 MB'}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white border-0"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Now
                  </Button>
                </div>
              </Card>

              {/* Upgrade Prompt */}
              <Card className="bg-red-500/10 border-red-500/20">
                <div className="p-6 space-y-4">
                  <h3 className="text-white">Want More?</h3>
                  <p className="text-sm text-gray-400">
                    Upgrade to Pro for batch processing, higher resolution, and priority support.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={() => onNavigate('pricing')}
                  >
                    View Plans
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
