import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  
  return res.status(200).json({
    message: 'Test endpoint funcionando',
    hasApiKey: !!API_KEY,
    apiKeyLength: API_KEY ? API_KEY.length : 0,
    apiKeyPrefix: API_KEY ? API_KEY.substring(0, 10) + '...' : 'No configurada'
  });
} 