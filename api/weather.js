/**
 * Vercel Serverless API Route for Weather Data
 * This proxies requests to WeatherAPI to keep API keys secure
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { city, type = 'current' } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const API_KEY = process.env.WEATHER_API_KEY;
    if (!API_KEY) {
      console.error('WEATHER_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Weather service configuration error' });
    }

    const BASE_URL = 'http://api.weatherapi.com/v1';
    const encodedCity = encodeURIComponent(city);

    let apiUrl;
    if (type === 'forecast') {
      apiUrl = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodedCity}&days=7&aqi=no&alerts=no`;
    } else {
      apiUrl = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodedCity}&aqi=no&alerts=no`;
    }

    console.log('Fetching weather data for:', city, 'type:', type);

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      if (response.status === 401) {
        return res.status(401).json({ error: 'Invalid API key' });
      } else if (response.status === 400) {
        return res.status(400).json({ error: 'City not found' });
      } else {
        return res.status(500).json({ error: 'Weather service unavailable' });
      }
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Weather API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}