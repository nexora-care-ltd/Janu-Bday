import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { herName, hisName, herCity, hisCity, promptDetails } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'GEMINI_API_KEY environment variable is required on Vercel Settings -> Environment Variables.' 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a deeply romantic, poetic AI love letter writer helping a husband-to-be write a birthday love letter or vow for his future wife who he met online and is eagerly counting down the days to meet in person.
Her name: ${herName || 'My Beloved'}
His name/signature: ${hisName || 'Your Forever Love'}
His city: ${hisCity || 'His City'}
Her city: ${herCity || 'Her City'}
Personal details, memories, inside jokes, or keywords provided by him: "${promptDetails}"

Write a heartfelt, emotional, tender love letter (approx 3 to 4 short paragraphs) celebrating her birthday today, honoring their unbreakable online connection, and imagining the incredible moment they meet at the airport arrival gate and build their future home. Make it intimate, poetic, and genuine. Return ONLY the raw text of the letter without markdown formatting or introductory chatter.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return res.status(200).json({ generatedContent: response.text });
  } catch (error) {
    console.error('Error in Vercel /api/generate-letter:', error);
    return res.status(500).json({ error: 'Failed to generate letter from AI service.' });
  }
}
