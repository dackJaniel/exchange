import { NavigationHeader } from '@/components/layout/NavigationHeader';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Globe, CreditCard } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Currency Exchange Guides | Currency Calculator',
  description: 'Learn how to use currency exchange rates effectively with our comprehensive guides for travel, business, and trading.',
  robots: 'index, follow',
};

export default function GuidesPage() {
  const guides = [
    {
      title: 'Travel Currency Guide',
      description: 'Essential tips for exchanging money while traveling abroad',
      href: '/guides/travel',
      icon: Globe,
      topics: ['Best exchange rates', 'Avoiding fees', 'Safety tips']
    },
    {
      title: 'Currency Trading Basics',
      description: 'Understanding forex markets and exchange rate movements',
      href: '/guides/trading',
      icon: TrendingUp,
      topics: ['Market analysis', 'Risk management', 'Trading strategies']
    },
    {
      title: 'Business Currency Management',
      description: 'Managing currency risk for international business',
      href: '/guides/business',
      icon: CreditCard,
      topics: ['Hedging strategies', 'Payment methods', 'Currency contracts']
    },
    {
      title: 'Using Our Calculator',
      description: 'Get the most out of our currency calculator features',
      href: '/guides/calculator',
      icon: Calculator,
      topics: ['Offline mode', 'PWA features', 'Historical rates']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationHeader />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calculator
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Currency Exchange Guides
          </h1>
          <p className="text-zinc-400 text-lg">
            Learn how to make the most of currency exchange rates with our comprehensive guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide, index) => {
            const IconComponent = guide.icon;
            return (
              <div
                key={index}
                className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-orange-500 transition-colors group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      {guide.description}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {guide.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="text-sm text-zinc-500 flex items-center">
                          <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={guide.href}
                      className="inline-flex items-center text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium"
                    >
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-zinc-900 rounded-lg p-8 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Quick Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Best Times to Exchange
              </h3>
              <p className="text-zinc-400 text-sm">
                Exchange rates fluctuate throughout the day. Monitor rates during major market sessions (London, New York, Tokyo) for better opportunities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Avoid Airport Exchanges
              </h3>
              <p className="text-zinc-400 text-sm">
                Airport currency exchanges typically offer poor rates. Use ATMs or exchange money in the city for better rates.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Use Our Offline Mode
              </h3>
              <p className="text-zinc-400 text-sm">
                Our calculator works offline with cached rates, perfect for travel when you don't have internet access.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Check Multiple Sources
              </h3>
              <p className="text-zinc-400 text-sm">
                Compare rates from different providers before making large exchanges to ensure you get the best deal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
