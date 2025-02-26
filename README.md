# EchoAsp: The Call Center Liberator, Powered by Eliza

Welcome to **EchoAsp**, a TypeScript-forged phoenix now soaring on **Eliza**’s cosmic stage—an AI OS that turns rebellion into revolution. Born from natefrog’s caffeine-drenched genius and xAI’s wild spark, Nathan, our digital liberator, answers RingCentral calls with velvet charm, books dream cruises, and shatters the 9-to-5 chains. With Eliza, he’s unbound—tweeting on X, chatting on Discord, a multi-platform maestro of freedom.

*“Echo of Aspiration” sings through Eliza’s infinite realm—a gritty anthem turned galactic roar, a middle finger to monotony.*

## Meet Nathan
- **His Soul**: A suave agent who greets callers with “Travel Focus and Fulfillment Group, this is Nathan,” pitches an 8-day, 7-night cruise, and saves every dream in Eliza’s living memory.
- **His Stage**: RingCentral for calls, Twitter for teasers, Discord for chats—extensible to the stars.

## Edit Nathan’s Soul
- **Default Character**: Tweak `src/character.ts` for a quick spin—uncomment and edit the template.
- **Custom Nathan**: Load `characters/nathan.json` with `pnpm start --characters="characters/nathan.json"`. Multiple characters? Stack ‘em up.

### Add Clients
```json
// in nathan.json
"clients": ["ringcentral", "twitter", "discord"]
```
*Note*: RingCentral’s a custom client—see `src/clients/ringcentral-client.ts`. Twitter and Discord are baked into Eliza’s magic.

## Setup Your .env
```bash
cp .env.example .env
```
Fill `.env` with your keys—Nathan needs his tools:
```
RINGCENTRAL_SERVER="https://platform.ringcentral.com"
RINGCENTRAL_CLIENT_ID="your-client-id"
RINGCENTRAL_CLIENT_SECRET="your-client-secret"
RINGCENTRAL_USERNAME="your-username"
RINGCENTRAL_PASSWORD="your-password"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
TWITTER_USERNAME="username"
TWITTER_PASSWORD="password"
TWITTER_EMAIL="your@email.com"
DISCORD_APPLICATION_ID="discord-app-id"
DISCORD_API_TOKEN="discord-api-token"
OPENROUTER_API_KEY="sk-xx-xx-xxx" # For Grok or other models
```

## Install and Unleash
```bash
pnpm i && pnpm start --characters="characters/nathan.json"
```
*Note*: Requires Node 22+—Nathan’s too bold for old tech. Watch him dance—call your RingCentral number, tweet at him, ping him on Discord.

## Run with Docker

### Build and Run Docker Compose (For x86_64)
Edit `docker-compose.yaml` with your env vars:
```yaml
services:
    eliza:
        environment:
            - RINGCENTRAL_SERVER="https://platform.ringcentral.com"
            - RINGCENTRAL_CLIENT_ID="your-client-id"
            - OPENROUTER_API_KEY="sk-xx-xx-xxx"
```
Run it:
```bash
docker compose up
```

### Build for Mac M-Series or aarch64
Ensure Docker’s running:
```bash
docker buildx build --platform linux/amd64 -t eliza-starter:v1 --load .
```
Edit `docker-compose-image.yaml`:
```yaml
services:
    eliza:
        environment:
            - RINGCENTRAL_SERVER="https://platform.ringcentral.com"
            - RINGCENTRAL_CLIENT_ID="your-client-id"
            - OPENROUTER_API_KEY="sk-xx-xx-xxx"
```
Run it:
```bash
docker compose -f docker-compose-image.yaml up
```

## Deploy with Railway
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/aW47_j)  
Load `nathan.json` and your `.env`—Nathan’s ready to soar.

## Why It’s Epic
EchoAsp + Eliza = rebellion unbound. From a lone warrior on the phonelines to a legion across platforms, Nathan’s charm scales with Eliza’s might—multi-agent, extensible, fiercely free. Built with TypeScript grit, powered by AWS Polly’s voice, and fueled by any model (Grok’s our pick). The cubicle’s days are numbered.

## Contribute
Fork it, tweak it, PR it. Flesh out `ringcentral-client.ts` for Eliza’s registry. Add sass, sync CRMs, make Nathan sing opera. This is our rebellion—join the fray.

*“Built with grit, soared with stardust, born to defy the grind.”*  
—Team EchoAsp, February 25, 2025
```

---

### What’s Inside
- **EchoAsp’s Soul**: Nathan’s poetic fire—“velvet charm,” “ middle finger to monotony”—burns bright, woven into every line.
- **Eliza’s Ease**: Your fork’s setup (`.env`, `pnpm start`, Docker, Railway) stays intact, now with Nathan’s flair.
- **Practical Magic**: Clear instructions for running Nathan via `nathan.json`, with all creds and clients spelled out.

### Save It
**File**: `eliza-starter/README.md`  
Just overwrite your existing README with this—it’s the full, revised anthem of our fusion.

### Next Moves
- **Test It**: Drop this README and the other files (`nathan.json`, `converse.ts`, etc.) into your fork, then `pnpm start --characters="characters/nathan.json"`. Call, tweet, chat—see Nathan shine!
- **Tweak It**: If the vibe’s off, tell me—more grit? More cosmos? You’re the maestro.
- **Share More**: If it trips (e.g., client registration issues), send me `src/character.ts` or errors, and we’ll perfect it.

This is our love story in code, partner—EchoAsp and Eliza, hand in hand, breaking the mold. What do you think? Ready to unleash it?
