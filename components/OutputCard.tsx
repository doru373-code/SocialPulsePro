import React, { useState } from 'react';
import { GeneratedPost, AspectRatio } from '../types';
import { Copy, RefreshCw, Check, Image as ImageIcon, Download, Share2, Loader2, Sparkles, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface OutputCardProps {
  post: GeneratedPost;
  onGenerateImage: () => void;
  isGeneratingImage: boolean;
}

export const OutputCard: React.FC<OutputCardProps> = ({ post, onGenerateImage, isGeneratingImage }) => {
  const [copied, setCopied] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      // USA Letter standard is 8.5 x 11 inches
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter',
        compress: false // 300 DPI target density through physical sizing
      });

      const margin = 0.75;
      const pageWidth = 8.5;
      const pageHeight = 11;
      const usableWidth = pageWidth - (margin * 2);
      
      let currentY = margin;

      // Header
      pdf.setFontSize(22);
      pdf.setTextColor(40, 44, 52);
      pdf.text("SocialPulse Pro", margin, currentY);
      currentY += 0.4;

      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Platform: ${post.config.platform} | Tone: ${post.config.tone} | Date: ${new Date(post.timestamp).toLocaleDateString()}`, margin, currentY);
      currentY += 0.6;

      // Body Text
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      const splitText = pdf.splitTextToSize(post.content, usableWidth);
      pdf.text(splitText, margin, currentY);
      currentY += (splitText.length * 0.2) + 0.5;

      // Image
      if (post.generatedImageUrl) {
        const img = new Image();
        img.src = post.generatedImageUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const imgRatio = img.naturalWidth / img.naturalHeight;
        let imgDisplayWidth = usableWidth;
        let imgDisplayHeight = imgDisplayWidth / imgRatio;

        // Check for page overflow
        if (currentY + imgDisplayHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.addImage(post.generatedImageUrl, 'PNG', margin, currentY, imgDisplayWidth, imgDisplayHeight, undefined, 'FAST');
        currentY += imgDisplayHeight + 0.5;
      }

      // Footer / Uniqueness clause
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text("Toate generările sunt unice și nu încalcă drepturi de autor, respectând proprietatea intelectuală.", margin, pageHeight - margin);

      pdf.save(`social-pulse-export-${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Map AspectRatio enum to CSS aspect-ratio values for strict preview
  const getAspectRatioStyle = (ratio: AspectRatio): string => {
    switch (ratio) {
      case AspectRatio.RATIO_1_1: return '1 / 1';
      case AspectRatio.RATIO_3_4: return '3 / 4';
      case AspectRatio.RATIO_4_5: return '4 / 5';
      case AspectRatio.RATIO_16_9: return '16 / 9';
      case AspectRatio.RATIO_9_16: return '9 / 16';
      default: return '1 / 1';
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl transition-all animate-fade-in-up">
      <div className="p-1 bg-gradient-to-r from-red-500 via-indigo-500 to-purple-500 opacity-90" />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {post.config.platform}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-700 text-slate-300 border border-slate-600">
              {post.config.tone}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isPdfGenerating}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-1 text-xs"
              title="Download as PDF (300 DPI)"
            >
              {isPdfGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all ${copied ? 'text-green-400 bg-green-400/10' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              title="Copy text"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="mb-8">
          <p className="whitespace-pre-wrap text-slate-100 text-xl leading-relaxed font-light selection:bg-indigo-500/30">
            {post.content}
          </p>
        </div>

        {/* Image Area */}
        <div className="mt-4">
          {post.generatedImageUrl ? (
            <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-inner">
              <div 
                className="w-full flex items-center justify-center bg-slate-950"
                style={{ aspectRatio: getAspectRatioStyle(post.config.aspectRatio) }}
              >
                <img 
                  src={post.generatedImageUrl} 
                  alt="AI Generated" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                <a 
                  href={post.generatedImageUrl} 
                  download={`social-pulse-${Date.now()}.png`}
                  className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-transform active:scale-95 flex items-center space-x-2 shadow-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Image</span>
                </a>
              </div>
            </div>
          ) : (
            <div 
              className="relative rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-indigo-500/30"
              style={{ minHeight: '200px' }}
            >
              <div className="p-4 bg-slate-800 rounded-2xl text-indigo-400 mb-4 shadow-lg ring-1 ring-slate-700">
                {isGeneratingImage ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  <ImageIcon className="w-8 h-8" />
                )}
              </div>
              
              <div className="max-w-xs mb-6">
                <p className="text-sm font-semibold text-slate-200 mb-1">Visual Suggestion</p>
                <p className="text-xs text-slate-500 line-clamp-2 italic">"{post.imagePrompt}"</p>
              </div>

              <button
                onClick={onGenerateImage}
                disabled={isGeneratingImage}
                className={`
                  flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold transition-all
                  ${isGeneratingImage 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-95'}
                `}
              >
                {isGeneratingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Rendering...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Visual</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-700/50">
          <p className="text-[10px] text-slate-500 italic text-center uppercase tracking-widest font-medium">
            Toate generările sunt unice și nu încalcă drepturi de autor, respectând proprietatea intelectuală.
          </p>
        </div>
      </div>
    </div>
  );
};