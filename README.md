# Nathan 🤖

# Nathan: Auto Transport Coordinator with BatsCRM Integration

This is a fork of the Eliza Agent Framework configured as "Nathan," an autonomous auto transport coordinator agent that can handle vehicle shipping inquiries, track auto shipments, schedule vehicle pickups, and make calls via Dialpad, all while managing the entire workflow through BatsCRM.

## Features

- Complete BatsCRM integration for auto transport management
- Track vehicle shipments across multiple auto transport carriers
- Schedule vehicle pickups and deliveries
- Calculate auto transport costs based on vehicle type and route
- Make phone calls via Dialpad integration for customer and carrier communication
- Provide accurate delivery estimates for vehicles
- Notify customers about vehicle shipment status
- Find and assign the best carriers for specific auto transport needs
- Process quotes, orders, and payments through BatsCRM


## Unleash the Beast
```bash
pnpm i && pnpm start --characters="characters/nathan.json"
```
*Heads-Up*: Nathan demands Node 22+—old tech can’t handle his fire. Dial his line, ping him on X, or poke him on Discord—watch him strut.

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

## Why It’s a Revolution
EchoAsp + Eliza = freedom on steroids. From a lone phone warrior to a multi-platform legion, Nathan’s charm scales with Eliza’s raw power—multi-agent, extensible, and fiercely untethered. TypeScript grit, AWS Polly’s silky voice, and any model you fancy (Grok’s our vibe). The cubicle’s toast—Nathan’s rewriting the rules.

## Join the Uprising
Fork it, hack it, PR it. Beef up `ringcentral-client.ts` for Eliza’s arsenal. Add sass, sync CRMs, make Nathan belt out arias. This is our war cry—get in the game.

*“Forged in grit, kissed by stardust, built to torch the grind.”*  
—Team DegenAI, February 25, 2025
