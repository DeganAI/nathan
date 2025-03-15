FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy app.js
COPY app.js ./

# Install dependencies
RUN npm init -y && \
    npm install twitter-api-v2 dotenv express

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "app.js"]
