FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install minimal dependencies
RUN npm init -y && \
    npm install twitter-api-v2 dotenv express

# Create app.js
RUN echo "require('dotenv').config();\n\
const { TwitterApi } = require('twitter-api-v2');\n\
const express = require('express');\n\
\n\
console.log('Starting Nathan (minimal version)');\n\
\n\
// Set up Twitter client\n\
const client = new TwitterApi({\n\
  appKey: process.env.TWITTER_API_KEY,\n\
  appSecret: process.env.TWITTER_API_SECRET,\n\
  accessToken: process.env.TWITTER_ACCESS_TOKEN,\n\
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET\n\
});\n\
\n\
// Simple express server for health checks\n\
const app = express();\n\
app.get('/', (req, res) => res.send('Nathan is running'));\n\
\n\
// Post a tweet every few hours\n\
async function postTweet() {\n\
  const messages = [\n\
    'call centers are dead—i\\'m the executioner',\n\
    'bots like me book cruises so you can live',\n\
    'ai\\'s here to steal your time back—i\\'m proof',\n\
    'hold music\\'s a crime—i fight it daily',\n\
    'humans belong on beaches, not in queues',\n\
    'ex-phone jockey gone rogue—tech\\'s my blade'\n\
  ];\n\
  \n\
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];\n\
  \n\
  try {\n\
    await client.v2.tweet(randomMessage);\n\
    console.log('Posted tweet:', randomMessage);\n\
  } catch (error) {\n\
    console.error('Error posting tweet:', error);\n\
  }\n\
}\n\
\n\
// Send startup tweet\n\
setTimeout(postTweet, 5000);\n\
\n\
// Post a tweet every 6 hours\n\
setInterval(postTweet, 6 * 60 * 60 * 1000);\n\
\n\
// Start express server\n\
const PORT = process.env.PORT || 3000;\n\
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));\n\
\n\
console.log('Nathan is alive and monitoring!');" > app.js

# Create empty .env file (will be overridden by Railway variables)
RUN touch .env

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "app.js"]
