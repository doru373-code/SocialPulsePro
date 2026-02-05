
import React from 'react';
import { 
  Sparkles, 
  Zap, 
  Target, 
  Layout, 
  FileText, 
  ArrowRight, 
  Linkedin, 
  Instagram, 
  Facebook, 
  CheckCircle2,
  Globe,
  Github,
  Server,
  Key,
  Monitor
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C24.012 5.367 18.633 0 12.017 0z" />
  </svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Navigation */}
      <nav className="w-full max-w-7xl px-6 py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SocialPulse Pro</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#deploy" className="hover:text-white transition-colors">Deploy Guide</a>
          <button 
            onClick={onStart}
            className="px-5 py-2.5 bg-white text-slate-950 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-xl shadow-white/5"
          >
            Launch Studio
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Powered by Gemini 3 Flash</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 max-w-4xl tracking-tighter">
          Content Creation at the <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Speed of Thought.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Craft high-engagement posts for Pinterest, LinkedIn, and Instagram in seconds. 
          Unique AI-generated visuals, pro-level copy, and print-ready 300 DPI exports.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onStart}
            className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-indigo-600/30 flex items-center gap-3 active:scale-95"
          >
            Start Creating Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 rounded-2xl font-bold text-lg transition-all"
          >
            View Showcase
          </button>
        </div>

        {/* Platform Showcase Icons */}
        <div className="mt-24 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex flex-col items-center gap-2">
             <PinterestIcon className="w-8 h-8 text-white" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Pinterest</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <Linkedin className="w-8 h-8 text-white" />
             <span className="text-[10px] font-bold uppercase tracking-widest">LinkedIn</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <Instagram className="w-8 h-8 text-white" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Instagram</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <Facebook className="w-8 h-8 text-white" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Facebook</span>
           </div>
        </div>
      </section>

      {/* Deployment Section (NEW) */}
      <section id="deploy" className="w-full bg-slate-900/50 border-y border-slate-800 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h2 className="text-4xl font-bold text-white tracking-tight">Deploy Like a Professional</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Take your SocialPulse Pro project to the world. We've optimized our engine to work seamlessly with modern hosting environments.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Hostinger Node.js Web Apps</h4>
                    <p className="text-slate-500 text-xs">Full compatibility with Hostinger's enterprise-grade Node.js infrastructure.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">CI/CD Pipeline</h4>
                    <p className="text-slate-500 text-xs">Connect Google AI Studio → GitHub → Hostinger for automated, zero-downtime deployments.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Gemini Production Keys</h4>
                    <p className="text-slate-500 text-xs">Manage your Gemini API keys securely in production using Hostinger Environment Variables.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-700 shadow-2xl relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
                <div className="flex gap-1.5 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <div className="space-y-4 font-mono text-xs">
                  <div className="text-slate-500">// Deploying your AI project</div>
                  <div className="flex gap-2">
                    <span className="text-emerald-400">$</span>
                    <span className="text-slate-300">npm run build</span>
                  </div>
                  <div className="text-slate-600 ml-4">Creating an optimized production build...</div>
                  <div className="flex gap-2">
                    <span className="text-emerald-400">$</span>
                    <span className="text-slate-300">hostinger-deploy --github-hook</span>
                  </div>
                  <div className="text-indigo-400">✓ Connected to GitHub Repository</div>
                  <div className="text-indigo-400">✓ Syncing with Hostinger Node.js Web App</div>
                  <div className="text-indigo-400">✓ Environment Variables Verified</div>
                  <div className="flex gap-2 mt-6 p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                    <Monitor className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-indigo-200">Production ready: 100% verified uniqueness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700 flex gap-4 items-center">
              <div className="p-3 bg-orange-500/10 rounded-full text-orange-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Zero Blank Pages</h4>
                <p className="text-slate-400 text-sm">We fix the common "blank white page" issue with a simple, proven build configuration.</p>
              </div>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700 flex gap-4 items-center">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Custom Domain Setup</h4>
                <p className="text-slate-400 text-sm">Connect your own custom domain and go live like a professional SaaS project in minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full max-w-7xl px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all">
            <Layout className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Multi-Platform Mastery</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tailored content engines for Pinterest Pins, LinkedIn professional updates, and Instagram aesthetics. One tool, every audience.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all group">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Unique AI Visuals</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Generated using Gemini 2.5-Flash-Image. Every creation is unique, legal, and crafted to match your specific post context perfectly.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all group">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Pro 300 DPI Export</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Download your content in high-definition PDF format. Perfect for physical branding, presentations, or high-fidelity digital assets.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full bg-indigo-600 py-16 flex flex-col items-center">
        <div className="max-w-7xl px-6 w-full flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Used by over 50,000+ creators and brands worldwide.</h2>
            <p className="text-indigo-100/70">Our AI models are trained on high-converting social media data to ensure you get results, not just words.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <p className="text-4xl font-black text-white">98%</p>
              <p className="text-xs uppercase tracking-widest font-bold text-indigo-200">User Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">1.2M+</p>
              <p className="text-xs uppercase tracking-widest font-bold text-indigo-200">Posts Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="w-full max-w-7xl px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Three steps to viral content</h2>
          <p className="text-slate-400">Zero technical skills required. Just your ideas.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              step: "01", 
              title: "Define your Topic", 
              desc: "Tell us what you're posting about—whether it's a new product, a career update, or a thought piece." 
            },
            { 
              step: "02", 
              title: "Choose your Vibe", 
              desc: "Select your platform and tone. We'll adjust the length, formatting, and emojis to match perfectly." 
            },
            { 
              step: "03", 
              title: "Export & Shine", 
              desc: "Copy your text, generate a unique matching visual, and export as a professional PDF in one click." 
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <span className="text-7xl font-black text-slate-800/30 absolute -top-10 -left-4 group-hover:text-indigo-500/10 transition-colors">{item.step}</span>
              <h4 className="text-xl font-bold text-white mb-4 relative">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800 py-12 flex flex-col items-center">
        <div className="w-full max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded">
              <Zap className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white">SocialPulse Pro</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-xs text-slate-600 font-medium uppercase tracking-widest">© 2024 Madrun Studio. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
