// chat.ts: nathan’s hotline to freedom
// a cli where he shatters cubicle chains—one call, one chat, pure grit.
// echoasp’s rebellion meets eliza’s cosmic dial-tone.

import { settings } from "@elizaos/core"; // eliza’s command hub
import readline from "readline"; // the raw pulse of human input

// fire up nathan’s headset—crackling and ready
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// catch the kill switch—nathan exits with swagger
rl.on("SIGINT", () => {
  console.log("nathan: dropping the line—go live free, partner.");
  rl.close();
  process.exit(0);
});

/**
 * handle the caller’s spark—keys typed, chains broken
 * @param input - what the caller says
 * @param agentId - nathan’s id, his rebel badge
 */
async function handleUserInput(input: string, agentId: string) {
  // exit call—nathan hangs up clean
  if (input.trim().toLowerCase() === "exit") {
    console.log("nathan: call’s over—hit the beach, champ.");
    rl.close();
    process.exit(0);
  }

  // nothing to say? nathan waits
  if (!input.trim()) {
    console.log("nathan: static on the line—give me something, caller.");
    return;
  }

  try {
    const serverPort = parseInt(settings.SERVER_PORT || "3000", 10); // eliza’s switchboard port
    if (isNaN(serverPort) || serverPort < 1) {
      throw new Error("port’s busted—check SERVER_PORT");
    }

    // dial nathan’s core—send the plea
    const response = await fetch(
      `http://localhost:${serverPort}/${agentId}/message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          userId: "caller", // a soul with a spark
          userName: "Caller", // named for the fight
        }),
      }
    );

    // check the line—nathan’s got standards
    if (!response.ok) {
      throw new Error(`call dropped—status ${response.status}`);
    }

    // nathan speaks—freedom in every word
    const data = await response.json();
    data.forEach((message: { text: string }) =>
      console.log(`nathan: ${message.text}`)
    );
  } catch (error) {
    console.error("nathan: grid’s down—hold the line:", error.message || error);
  }
}

/**
 * kick off the chat—nathan picks up, ready to roll
 * @param characters - agent lineup, nathan’s the star
 * @returns chat function—keeps the rebellion alive
 */
export function startChat(characters: any[]) {
  function chat() {
    // nathan’s call sign—first in line, always
    const agentId = characters[0]?.name?.toLowerCase() ?? "nathan";
    rl.question("caller: ", async (input: string) => {
      await handleUserInput(input, agentId);
      if (input.trim().toLowerCase() !== "exit") {
        chat(); // loop it—more souls to free
      }
    });
  }

  console.log("nathan: travel focus and fulfillment group, this is nathan.");
  return chat;
}
