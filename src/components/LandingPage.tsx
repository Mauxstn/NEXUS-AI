import { Sparkles, Eraser, Wand2, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { Screen, Tool } from '../App';

interface LandingPageProps {
  onNavigate: (screen: Screen) => void;
  onToolSelect: (tool: Tool) => void;
}

export function LandingPage({ onNavigate, onToolSelect }: LandingPageProps) {
  const features = [
    {
      icon: Eraser,
      title: 'Background Removal',
      description: 'Remove backgrounds with pixel-perfect precision using advanced AI algorithms.',
      tool: 'background-removal' as Tool,
      gradient: 'from-red-500/20 to-red-600/20'
    },
    {
      icon: Sparkles,
      title: 'Watermark Removal',
      description: 'Eliminate watermarks seamlessly while preserving image quality and details.',
      tool: 'watermark-removal' as Tool,
      gradient: 'from-red-500/20 to-red-700/20'
    },
    {
      icon: Wand2,
      title: 'Image Enhancement',
      description: 'Enhance image quality, upscale resolution, and improve clarity instantly.',
      tool: 'enhancement' as Tool,
      gradient: 'from-red-600/20 to-red-500/20'
    }
  ];

  const capabilities = [
    'AI-powered processing in seconds',
    'Batch processing support',
    'High-resolution output',
    'Privacy-first approach',
    'No watermarks on results',
    'Multiple export formats'
  ];

  const handleStartClick = (tool: Tool) => {
    onToolSelect(tool);
    onNavigate('upload');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl tracking-wider text-white">NEXUS AI</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('pricing')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <Button 
                variant="outline" 
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={() => onNavigate('upload')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
            <Sparkles className="h-4 w-4 text-red-400" />
            <span className="text-sm text-red-400">Powered by Advanced AI Technology</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl tracking-tight text-white">
            Transform Your Images
            <br />
            With AI Precision
          </h1>

          {/* Tagline */}
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Remove backgrounds, eliminate watermarks, and enhance image quality in seconds. 
            Professional results powered by cutting-edge artificial intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white border-0"
              onClick={() => onNavigate('upload')}
            >
              Start Processing Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => onNavigate('pricing')}
            >
              View Pricing
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center pt-8 text-sm">
            <div>
              <div className="text-2xl text-red-500">10M+</div>
              <div className="text-gray-400">Images Processed</div>
            </div>
            <div>
              <div className="text-2xl text-red-500">99.9%</div>
              <div className="text-gray-400">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl text-red-500">&lt;3s</div>
              <div className="text-gray-400">Average Processing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Powerful AI Tools</h2>
          <p className="text-gray-400">Choose from our suite of intelligent image processing capabilities</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Card 
              key={feature.title}
              className="group relative overflow-hidden bg-white/5 border-white/10 hover:border-red-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => handleStartClick(feature.tool)}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative p-8 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-red-400 text-sm group-hover:gap-2 transition-all">
                  <span>Try now</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-500/5 border-red-500/20">
            <div className="p-12 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl text-white">Why Choose NEXUS AI?</h2>
                <p className="text-gray-400">Advanced features designed for professionals and creators</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {capabilities.map((capability) => (
                  <div key={capability} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300">{capability}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 text-center">
                <Button 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white border-0"
                  onClick={() => onNavigate('upload')}
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black backdrop-blur-xl mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="tracking-wider text-white">NEXUS AI</span>
            </div>
            <p className="text-sm text-gray-400">© 2025 NEXUS AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}