import { GoogleGenAI, Type } from "@google/genai";
import { GenerationConfig, AspectRatio } from '../types';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_TEXT = 'gemini-3-flash-preview';
const MODEL_IMAGE = 'gemini-2.5-flash-image';

export const generateSocialPostText = async (config: GenerationConfig): Promise<{ content: string; imagePrompt: string }> => {
  try {
    const prompt = `
      You are an expert social media copywriter.
      
      Create a ${config.length} length post for ${config.platform}.
      Topic: "${config.topic}"
      Tone: ${config.tone}
      Include Emojis: ${config.includeEmoji}
      Include Hashtags: ${config.includeHashtags}

      Rules:
      1. Adapt the writing style strictly to the chosen platform (e.g., professional for LinkedIn, concise for Twitter).
      2. If "Short", keep it under 280 characters (for Twitter compatibility) or very brief.
      3. If "Long", use proper spacing and paragraphs.
      4. ALSO provide a short, descriptive prompt that could be used to generate an accompanying image for this post.

      Return the response in JSON format with "postContent" and "imagePrompt" fields.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            postContent: { type: Type.STRING },
            imagePrompt: { type: Type.STRING }
          },
          required: ["postContent", "imagePrompt"]
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    return {
      content: json.postContent || "Failed to generate content.",
      imagePrompt: json.imagePrompt || ""
    };

  } catch (error) {
    console.error("Error generating post text:", error);
    throw new Error("Failed to generate post text.");
  }
};

export const generateSocialImage = async (imagePrompt: string, aspectRatio: AspectRatio): Promise<string> => {
  try {
    // Map our UI ratios to the specific strings supported by the Gemini API
    // Supported: "1:1", "3:4", "4:3", "9:16", "16:9"
    let apiAspectRatio = "1:1";
    
    switch (aspectRatio) {
      case AspectRatio.RATIO_1_1: apiAspectRatio = "1:1"; break;
      case AspectRatio.RATIO_3_4: apiAspectRatio = "3:4"; break;
      case AspectRatio.RATIO_4_5: apiAspectRatio = "3:4"; break; // 3:4 is the closest supported high-quality portrait
      case AspectRatio.RATIO_16_9: apiAspectRatio = "16:9"; break;
      case AspectRatio.RATIO_9_16: apiAspectRatio = "9:16"; break;
      default: apiAspectRatio = "1:1";
    }

    const response = await ai.models.generateContent({
        model: MODEL_IMAGE,
        contents: imagePrompt,
        config: {
           imageConfig: {
             aspectRatio: apiAspectRatio
           }
        }
    });

    // Iterate parts to find the image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        for (const part of candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Error generating image:", error);
    return ""; 
  }
};
