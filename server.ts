import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API route FIRST: Generate romantic love letter using server-side Gemini API
  app.post('/api/generate-letter', async (req, res) => {
    try {
      const { herName, hisName, herCity, hisCity, promptDetails } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'GEMINI_API_KEY environment variable is required on the server.' 
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

      res.json({ generatedContent: response.text });
    } catch (error) {
      console.error('Error in /api/generate-letter:', error);
      res.status(500).json({ error: 'Failed to generate letter from AI service.' });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
