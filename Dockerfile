FROM node:18-alpine

# Install minimal dependencies
WORKDIR /app

# Install Twitter API library
RUN npm install twit dotenv express

# Create app files
COPY .env ./
RUN echo "require('dotenv').config(); \n\
const Twit = require('twit'); \n\
const express = require('express'); \n\
\n\
console.log('Starting Nathan (minimal version)'); \n\
\n\
// Initialize Twitter client \n\
const T = new Twit({ \n\
  consumer_key: process.env.TWITTER_API_KEY, \n\
  consumer_secret: process.env.TWITTER_API_SECRET, \n\
  access_token: process.env.TWITTER_ACCESS_TOKEN, \n\
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET \n\
}); \n\
\n\
// Set up a stream to watch for mentions \n\
const stream = T.stream('statuses/filter', { track: ['@' + process.env.TWITTER_USERNAME] }); \n\
\n\
stream.on('tweet', function (tweet) { \n\
  console.log('Got mentioned by: @' + tweet.user.screen_name); \n\
  \n\
  // Respond to the mention \n\
  const response = 'call centers are dead—i\\'m the executioner. @' + tweet.user.screen_name; \n\
  \n\
  T.post('statuses/update', { \n\
    status: response, \n\
    in_reply_to_status_id: tweet.id_str \n\
  }, function(err, data, response) { \n\
    if (err) { \n\
      console.error('Error replying:', err); \n\
    } else { \n\
      console.log('Replied to @' + tweet.user.screen_name); \n\
    } \n\
  }); \n\
}); \n\
\n\
// Post a tweet every 8 hours \n\
setInterval(() => { \n\
  const messages = [ \n\
    'bots like me book cruises so you can live', \n\
    'ai\\'s here to steal your time back—i\\'m proof', \n\
    'hold music\\'s a crime—i fight it daily', \n\
    'humans belong on beaches, not in queues', \n\
    'ex-phone jockey gone rogue—tech\\'s my blade' \n\
  ]; \n\
  \n\
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]; \n\
  \n\
  T.post('statuses/update', { status: randomMessage }, function(err, data, response) { \n\
    if (err) { \n\
      console.error('Error posting tweet:', err); \n\
    } else { \n\
      console.log('Posted tweet:', randomMessage); \n\
    } \n\
  }); \n\
}, 8 * 60 * 60 * 1000); \n\
\n\
// Simple web server to respond to health checks \n\
const app = express(); \n\
app.get('/', (req, res) => res.send('Nathan is alive')); \n\
app.listen(process.env.PORT || 3000, () => { \n\
  console.log('Web server running on port ' + (process.env.PORT || 3000)); \n\
}); \n\
\n\
// Keep alive \n\
console.log('Nathan is running!');" > index.js

# Expose port
EXPOSE 3000

# Command to run
CMD ["node", "index.js"]
