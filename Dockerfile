FROM node:16-alpine

# Create app directory
WORKDIR /app

# Initialize npm and install dependencies
RUN npm init -y && \
    npm install twitter-api-v2 dotenv express

# Create app.js using proper file creation
COPY <<EOF /app/app.js
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const express = require('express');

console.log('Starting Nathan (minimal version)');

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
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));

console.log('Nathan is alive and monitoring!');
EOF

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "app.js"]
