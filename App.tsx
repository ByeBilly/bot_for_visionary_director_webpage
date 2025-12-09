import React from 'react';
import { ChatInterface } from './components/ChatInterface';
import { WaitlistForm } from './components/WaitlistForm';
import { LayoutGrid, Layers, Key, Zap } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-sans selection:bg-cyan-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-cyan-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Navigation / Header */}
      <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
              <LayoutGrid className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Visionary Director
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors">The Town</span>
            <span className="hover:text-white cursor-pointer transition-colors">M Forms</span>
            <span className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white cursor-pointer transition-colors border border-white/5">
              Coming Soon
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Waitlist */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="block text-white">Direct Your</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient">
                  Digital Future
                </span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Welcome to the pre-release of VisionaryDirector.com. We aren't just building a website; we are constructing a massive digital Shopping Town with endless possibilities.
              </p>
            </div>

            <div className="grid gap-6">
              <FeatureCard 
                icon={<Layers className="w-6 h-6 text-purple-400" />}
                title="The Shopping Town"
                description="Explore distinct wings and departments in a massive hub of digital innovation. Not a VR walkthrough, but a structured metropolis of tools."
              />
              <FeatureCard 
                icon={<Key className="w-6 h-6 text-cyan-400" />}
                title="M Forms Technology"
                description="Bring Your Own Keys. Use your own OpenAI, Gemini, or Anthropic keys. You control the billing, you control the privacy."
              />
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-amber-400" />}
                title="The Director's Seat"
                description="You choose which AI model sits in the Director's chair to orchestrate workflows and command other models."
              />
            </div>

            <WaitlistForm />
          </div>

          {/* Right Column: Chatbot */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[1.2rem] blur opacity-30 animate-pulse transition duration-1000" />
            <div className="relative">
               <ChatInterface />
            </div>
          </div>

        </div>
      </main>
      
      <footer className="relative z-10 border-t border-white/5 bg-black/40 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} VisionaryDirector.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
    <div className="p-3 bg-white/5 rounded-lg border border-white/10 shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default App;