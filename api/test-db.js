const { Client } = require('pg');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    
    res.status(200).json({
      success: true,
      message: 'Connected to database successfully!',
      currentTime: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      code: err.code
    });
  } finally {
    await client.end();
  }
}
