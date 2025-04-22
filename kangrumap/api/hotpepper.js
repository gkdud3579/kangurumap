export default async function handler(req, res) {
  const { path, ...query } = req.query;
  const apiUrl = `https://webservice.recruit.co.jp/hotpepper/${path}?${new URLSearchParams(query).toString()}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'API request failed' });
  }
} 