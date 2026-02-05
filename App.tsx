
import React, { useState, useEffect } from 'react';
import { 
  Platform, 
  Tone, 
  Length, 
  AspectRatio,
  GenerationConfig, 
  GeneratedPost,
  GenerationStatus
} from './types';
import { generateSocialPostText, generateSocialImage } from './services/geminiService';
import { PlatformSelector } from './components/PlatformSelector';
import { OutputCard } from './components/OutputCard';
import { LandingPage } from './components/LandingPage';
import { Sparkles, Hash, Smile, Zap, History, Loader2, Square, RectangleHorizontal, RectangleVertical, Smartphone, ChevronLeft } from 'lucide-react';

// Default config
const DEFAULT_CONFIG: GenerationConfig = {
  topic: '',
  platform: Platform.LINKEDIN,
  tone: Tone.PROFESSIONAL,
  length: Length.MEDIUM,
  aspectRatio: AspectRatio.RATIO_1_1,
  includeHashtags: true,
  includeEmoji: true
};

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [config, setConfig] = useState<GenerationConfig>(DEFAULT_CONFIG);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [currentPost, setCurrentPost] = useState<GeneratedPost | null>(null);
  const [history, setHistory] = useState<GeneratedPost[]>([]);

  // Persistent Landing state (optional, but good for refresh)
  useEffect(() => {
    const hasBeenToStudio = localStorage.getItem('visited_studio');
    if (hasBeenToStudio === 'true') {
      // setShowLanding(false); // Uncomment to skip landing on returning visitors
    }
  }, []);

  const handleStart = () => {
    setShowLanding(false);
    localStorage.setItem('visited_studio', 'true');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfigChange = <K extends keyof GenerationConfig>(key: K, value: GenerationConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!config.topic.trim()) return;

    setStatus('generating_text');
    setCurrentPost(null);

    try {
      const { content, imagePrompt } = await generateSocialPostText(config);
      
      const newPost: GeneratedPost = {
        id: Date.now().toString(),
        content,
        imagePrompt,
        timestamp: Date.now(),
        config: { ...config }
      };

      setCurrentPost(newPost);
      setHistory(prev => [newPost, ...prev]);
      setStatus('complete');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleGenerateImage = async () => {
    if (!currentPost || !currentPost.imagePrompt) return;
    
    setStatus('generating_image');
    try {
      const imageUrl = await generateSocialImage(currentPost.imagePrompt, currentPost.config.aspectRatio);
      if (imageUrl) {
        const updatedPost = { ...currentPost, generatedImageUrl: imageUrl };
        setCurrentPost(updatedPost);
        setHistory(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
      }
      setStatus('complete');
    } catch (e) {
      console.error(e);
      setStatus('complete');
    }
  };

  const loadHistoryItem = (post: GeneratedPost) => {
    setCurrentPost(post);
    setConfig(post.config);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderAspectRatioButton = (ratio: AspectRatio, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => handleConfigChange('aspectRatio', ratio)}
      className={`
        flex-1 p-3 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all
        ${config.aspectRatio === ratio
          ? 'bg-slate-700 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-500'
          : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'}
      `}
    >
      {icon}
      <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
    </button>
  );

  if (showLanding) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden animate-in fade-in duration-500">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
      </div>

      <header className="w-full max-w-5xl mb-10 flex items-center justify-between">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setShowLanding(true)}>
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              SocialPulse Pro
            </h1>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium tracking-wide uppercase">
              <ChevronLeft className="w-3 h-3" />
              <span>Back to Home</span>
            </div>
          </div>
        </div>
        
        {history.length > 0 && (
          <div className="hidden md:flex items-center space-x-2 text-sm text-slate-400">
            <History className="w-4 h-4" />
            <span>{history.length} generated</span>
          </div>
        )}
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-xl">
            
            {/* Topic Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                What do you want to post about?
              </label>
              <textarea
                value={config.topic}
                onChange={(e) => handleConfigChange('topic', e.target.value)}
                placeholder="e.g., The future of AI in remote work, launching a new coffee product, celebrating a team milestone..."
                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all text-sm leading-relaxed"
              />
            </div>

            {/* Platform Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">Target Platform</label>
              <PlatformSelector 
                selected={config.platform} 
                onChange={(p) => handleConfigChange('platform', p)} 
              />
            </div>

            {/* Tone Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">Tone of Voice</label>
              <div className="flex flex-wrap gap-2">
                {Object.values(Tone).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => handleConfigChange('tone', tone)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                      ${config.tone === tone 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50' 
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'}
                    `}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Aspect Ratio */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">Image Format</label>
              <div className="grid grid-cols-5 gap-2">
                {renderAspectRatioButton(AspectRatio.RATIO_1_1, <Square className="w-4 h-4" />, '1:1')}
                {renderAspectRatioButton(AspectRatio.RATIO_3_4, <RectangleVertical className="w-4 h-4" />, '3:4')}
                {renderAspectRatioButton(AspectRatio.RATIO_4_5, <RectangleVertical className="w-4 h-4" />, '4:5')}
                {renderAspectRatioButton(AspectRatio.RATIO_16_9, <RectangleHorizontal className="w-4 h-4" />, '16:9')}
                {renderAspectRatioButton(AspectRatio.RATIO_9_16, <Smartphone className="w-4 h-4" />, '9:16')}
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               {/* Length */}
               <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Length</label>
                  <select 
                    value={config.length}
                    onChange={(e) => handleConfigChange('length', e.target.value as Length)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                  >
                    {Object.values(Length).map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
               </div>
               
               {/* Toggles */}
               <div className="flex flex-col justify-end space-y-2">
                 <button 
                   onClick={() => handleConfigChange('includeHashtags', !config.includeHashtags)}
                   className={`flex items-center space-x-2 text-sm transition-colors ${config.includeHashtags ? 'text-indigo-400' : 'text-slate-500'}`}
                 >
                   <Hash className="w-4 h-4" />
                   <span>Hashtags</span>
                 </button>
                 <button 
                   onClick={() => handleConfigChange('includeEmoji', !config.includeEmoji)}
                   className={`flex items-center space-x-2 text-sm transition-colors ${config.includeEmoji ? 'text-indigo-400' : 'text-slate-500'}`}
                 >
                   <Smile className="w-4 h-4" />
                   <span>Emojis</span>
                 </button>
               </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!config.topic.trim() || status === 'generating_text'}
              className={`
                w-full py-3.5 rounded-xl font-semibold text-white shadow-lg flex items-center justify-center space-x-2 transition-all
                ${!config.topic.trim() || status === 'generating_text'
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25 active:scale-[0.98]'}
              `}
            >
              {status === 'generating_text' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Post</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7 space-y-6">
          {currentPost ? (
            <div className="animate-fade-in">
              <OutputCard 
                post={currentPost} 
                onGenerateImage={handleGenerateImage}
                isGeneratingImage={status === 'generating_image'}
              />
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <Sparkles className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-medium text-slate-300 mb-2">Ready to Create</h3>
              <p className="text-slate-500 max-w-xs">
                Enter your topic on the left to generate professional social media content instantly.
              </p>
            </div>
          )}

          {/* History Section */}
          {history.length > 0 && (
             <div className="mt-8 pt-8 border-t border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-400 mb-4 flex items-center">
                  <History className="w-4 h-4 mr-2" />
                  Recent Generations
                </h4>
                <div className="space-y-3">
                  {history.slice(0, 5).map(item => (
                    <div 
                      key={item.id}
                      onClick={() => loadHistoryItem(item)}
                      className={`
                        p-4 rounded-xl border cursor-pointer transition-all hover:border-indigo-500/50 hover:bg-slate-800/50
                        ${currentPost?.id === item.id ? 'bg-slate-800 border-indigo-500/50' : 'bg-slate-800/30 border-slate-700/50'}
                      `}
                    >
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                            {item.config.platform}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                       </div>
                       <p className="text-sm text-slate-300 line-clamp-2">{item.content}</p>
                    </div>
                  ))}
                </div>
             </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
