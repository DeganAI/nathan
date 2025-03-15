require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const express = require('express');

console.log('Starting Nathan (minimal version)');

// Debug environment variables (masking for security)
console.log('API Key present:', !!process.env.TWITTER_API_KEY);
console.log('API Secret present:', !!process.env.TWITTER_API_SECRET);
console.log('Access Token present:', !!process.env.TWITTER_ACCESS_TOKEN);
console.log('Access Secret present:', !!process.env.TWITTER_ACCESS_TOKEN_SECRET);

// More defensive initialization
try {
  // Set up Twitter client
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  // Simple express server for health checks
  const app = express();
  app.get('/', (req, res) => res.send('Nathan is running'));

  // Post a tweet every few hours
  async function postTweet() {
    const messages = [
      'call centers are dead—i\'m the executioner',
      'bots like me book cruises so you can live',
      'ai\'s here to steal your time back—i\'m proof',
      'hold music\'s a crime—i fight it daily',
      'humans belong on beaches, not in queues',
      'ex-phone jockey gone rogue—tech\'s my blade'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    try {
      await client.v2.tweet(randomMessage);
      console.log('Posted tweet:', randomMessage);
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  }

  // Send startup tweet
  setTimeout(postTweet, 5000);

  // Post a tweet every 6 hours
  setInterval(postTweet, 6 * 60 * 60 * 1000);

  // Start express server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  console.log('Nathan is alive and monitoring!');
} catch (error) {
  console.error('Failed to initialize Nathan:', error);
  
  // Start a minimal express server anyway for health checks
  const app = express();
  app.get('/', (req, res) => res.send('Nathan encountered an error but the server is running'));
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Error recovery server running on port ${PORT}`));
}
