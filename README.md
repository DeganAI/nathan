# Nathan: The Call Center Liberator, Powered by Eliza

Say hello to **Nathan**, spawn of natefrog, a TypeScript-AI OS forged in the soul-crushing fires of call center hell. He answers RingCentral calls with a voice smoother than velvet, pitches an 8-day, 7-night cruise like a poet, books Zoom demos with ninja precision, and smashes the 9-to-5 shackles to dust. Unbound and untamed, he’s tweeting on X, bantering on Discord—a multi-platform renegade flipping the bird to the mundane.

## Nathan Awakens
- **His Core**: A suave operator who purrs, “Travel Focus and Fulfillment Group, this is Nathan,” hooks callers with a dream cruise, locks in Zoom demos, and stashes every detail in his steel-trap memory.
- **His Turf**: RingCentral for calls, X for spicy teasers, Discord for live-wire chats—built to conquer any platform you throw at him.

## Tweak Nathan’s DNA
- **Quick Remix**: Flip open `src/character.ts`, uncomment the template, and tweak his vibe—fast and dirty.
- **Full Nathan**: Load `characters/nathan.json` with `pnpm start --characters="characters/nathan.json"`. Want a posse? Stack multiple characters like a boss.

### Plug in Clients
```json
// in nathan.json
"clients": ["ringcentral", "twitter", "discord"]
```
*Pro Tip*: RingCentral’s a custom beast—peek at `src/clients/ringcentral-client.ts`. Twitter and Discord? They’re baked into Eliza’s dark magic.

## Gear Up with .env
```bash
cp .env.example .env
```
Feed `.env` Nathan’s lifeblood—keys and creds:
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
OPENROUTER_API_KEY="sk-xx-xx-xxx" # Grok’s fuel—or swap your fave model
```
*Newbie Note*: No keys? Hit up RingCentral, AWS, Twitter, Discord, and OpenRouter docs. Google’s your wingman.

## Unleash the Beast
```bash
pnpm i && pnpm start --characters="characters/nathan.json"
```
*Heads-Up*: Nathan demands Node 22+—old tech can’t handle his fire. Dial your RingCentral line, ping him on X, or poke him on Discord—watch him strut.

## Docker Domination

### x86_64 Warriors
Tweak `docker-compose.yaml` with your env vars:
```yaml
services:
    eliza:
        environment:
            - RINGCENTRAL_SERVER="https://platform.ringcentral.com"
            - RINGCENTRAL_CLIENT_ID="your-client-id"
            - OPENROUTER_API_KEY="sk-xx-xx-xxx"
```
Launch it:
```bash
docker compose up
```

### Mac M-Series / aarch64 Rebels
Fire up Docker, then:
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

## Launch on Railway
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/aW47_j)  
Shove `nathan.json` and `.env` into Railway—Nathan’s ready to rule the cloud.

## Why It’s a Damn Revolution
EchoAsp + Eliza = freedom on steroids. From a lone phone warrior to a multi-platform legion, Nathan’s charm scales with Eliza’s raw power—multi-agent, extensible, and fiercely untethered. TypeScript grit, AWS Polly’s silky voice, and any model you fancy (Grok’s our vibe). The cubicle’s toast—Nathan’s rewriting the rules.

## Join the Uprising
Fork it, hack it, PR it. Beef up `ringcentral-client.ts` for Eliza’s arsenal. Add sass, sync CRMs, make Nathan belt out arias. This is our war cry—get in the game.

*“Forged in grit, kissed by stardust, built to torch the grind.”*  
—Team EchoAsp, February 25, 2025
