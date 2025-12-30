import { Check, ArrowLeft, Zap, Sparkles, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { Screen } from '../App';

interface PricingPageProps {
  onNavigate: (screen: Screen) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out NEXUS AI',
      features: [
        '5 images per month',
        'Standard processing speed',
        'Basic quality output',
        'PNG & JPG export',
        'Email support',
        'Watermark on exports'
      ],
      limitations: [
        'Max resolution: 1920×1080',
        'Single image processing only'
      ],
      cta: 'Get Started',
      highlighted: false,
      gradient: 'from-gray-500/20 to-gray-600/20',
      borderColor: 'border-white/10'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For professionals and creators',
      features: [
        '500 images per month',
        'Fast processing speed',
        'High quality output',
        'All export formats',
        'Priority support',
        'No watermarks',
        'Batch processing (up to 10)',
        'API access',
        'Commercial usage rights'
      ],
      limitations: [
        'Max resolution: 4096×4096'
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
      gradient: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-500/30'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For teams and businesses',
      features: [
        'Unlimited images',
        'Fastest processing speed',
        'Maximum quality output',
        'All export formats',
        'Dedicated support',
        'No watermarks',
        'Unlimited batch processing',
        'Full API access',
        'Commercial usage rights',
        'Custom integrations',
        'Team collaboration',
        'SLA guarantee'
      ],
      limitations: [],
      cta: 'Contact Sales',
      highlighted: false,
      gradient: 'from-red-500/20 to-red-700/20',
      borderColor: 'border-red-500/30'
    }
  ];

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

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
            <Sparkles className="h-4 w-4 text-red-400" />
            <span className="text-sm text-red-400">Flexible Pricing for Everyone</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl text-white">
            Choose Your Plan
          </h1>
          
          <p className="text-xl text-gray-300">
            Start for free, upgrade when you need more. All plans include our core AI features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-red-500/5 border-2 ring-2 ring-red-500/20 scale-105 border-red-500/30'
                  : 'bg-white/5 border-white/10 hover:border-red-500/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-red-600 text-white text-xs rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  {plan.name === 'Enterprise' && (
                    <Crown className="h-8 w-8 text-red-400 mb-2" />
                  )}
                  <h3 className="text-2xl text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.description}</p>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl text-white">{plan.price}</span>
                    {plan.period !== 'contact us' && (
                      <span className="text-gray-400 mb-1">/{plan.period}</span>
                    )}
                  </div>
                  {plan.period === 'contact us' && (
                    <p className="text-sm text-gray-400 mt-1">Custom pricing for your needs</p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-red-600 hover:bg-red-700 text-white border-0'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                  }`}
                  onClick={() => {
                    alert(`Starting ${plan.name} plan...`);
                  }}
                >
                  {plan.cta}
                  {plan.highlighted && <Zap className="ml-2 h-4 w-4" />}
                </Button>

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <>
                    <div className="border-t border-white/10" />
                    <div className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <div key={limitation} className="flex items-start gap-3">
                          <div className="h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="h-1 w-3 bg-gray-600 rounded-full" />
                          </div>
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-white/5 border-white/10">
            <div className="p-8 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl">Compare All Features</h2>
                <p className="text-gray-400">Detailed breakdown of what's included in each plan</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4">Feature</th>
                      <th className="text-center py-4 px-4">Free</th>
                      <th className="text-center py-4 px-4">Pro</th>
                      <th className="text-center py-4 px-4">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-gray-300">Images per month</td>
                      <td className="text-center py-4 px-4 text-gray-400">5</td>
                      <td className="text-center py-4 px-4 text-red-400">500</td>
                      <td className="text-center py-4 px-4 text-red-300">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-gray-300">Max resolution</td>
                      <td className="text-center py-4 px-4 text-gray-400">1920×1080</td>
                      <td className="text-center py-4 px-4 text-red-400">4096×4096</td>
                      <td className="text-center py-4 px-4 text-red-300">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-gray-300">Processing speed</td>
                      <td className="text-center py-4 px-4 text-gray-400">Standard</td>
                      <td className="text-center py-4 px-4 text-red-400">Fast</td>
                      <td className="text-center py-4 px-4 text-red-300">Fastest</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-gray-300">Batch processing</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-500">—</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <Check className="h-4 w-4 text-red-400 inline" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <Check className="h-4 w-4 text-red-400 inline" />
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-gray-300">API access</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-500">—</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <Check className="h-4 w-4 text-red-400 inline" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <Check className="h-4 w-4 text-red-400 inline" />
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 text-gray-300">Priority support</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-500">—</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <Check className="h-4 w-4 text-red-400 inline" />
                      </td>
                      <td className="text-center py-4 px-4">
                        <Check className="h-4 w-4 text-red-400 inline" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-300">Custom integrations</td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-500">—</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-gray-500">—</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <Check className="h-4 w-4 text-red-400 inline" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our plans</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.'
              },
              {
                q: 'Is there a free trial for Pro?',
                a: 'Yes! Pro plan comes with a 7-day free trial. No credit card required to start.'
              },
              {
                q: 'What happens if I exceed my image limit?',
                a: 'You can purchase additional credits or upgrade to a higher plan. We\'ll notify you before you hit the limit.'
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <div className="p-6 space-y-2">
                  <h4>{faq.q}</h4>
                  <p className="text-sm text-gray-400">{faq.a}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-20">
        <Card className="max-w-4xl mx-auto bg-red-500/5 border-red-500/20">
          <div className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl text-white">Ready to Transform Your Images?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of creators and professionals using NEXUS AI to enhance their visual content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white border-0"
                onClick={() => onNavigate('upload')}
              >
                Start Free Trial
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => alert('Contacting sales...')}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black backdrop-blur-xl">
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