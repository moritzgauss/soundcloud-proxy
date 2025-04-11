const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const clientId = 'FZ4N7j5n7REhvxORW9Arr4NPHiWN2Tcu';
  const username = 'piquedeux';

  try {
    // 1. Resolve user
    const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/${username}&client_id=${clientId}`;
    const resolveRes = await fetch(resolveUrl);
    const userData = await resolveRes.json();

    const userId = userData.id;

    // 2. Fetch tracks
    const tracksUrl = `https://api-v2.soundcloud.com/users/${userId}/tracks?client_id=${clientId}&limit=1`;
    const tracksRes = await fetch(tracksUrl);
    const tracksData = await tracksRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(tracksData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracks', details: err.message });
  }
};
