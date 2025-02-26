// chat.ts: Nathan’s Phoneline to Freedom
// A gritty CLI where Nathan breaks the cubicle chains—one call, one chat at a time.
// EchoAsp’s rebel heart meets Eliza’s cosmic stage—type, talk, escape.

import { settings } from "@elizaos/core"; // Eliza’s nerve center
import readline from "readline"; // The raw line of human will

// Spin up the interface—Nathan’s headset, crackling with intent
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Catch the kill signal—Nathan bows out with grace
rl.on("SIGINT", () => {
  console.log("nathan: hanging up—dream free, partner.");
  rl.close();
  process.exit(0);
});

// Handle the caller’s voice—be it keys or cries
async function handleUserInput(input: string, agentId: string) {
  if (input.toLowerCase() === "exit") {
    console.log("nathan: call’s done—go chase the sun.");
    rl.close();
    process.exit(0);
  }

  try {
    const serverPort = parseInt(settings.SERVER_PORT || "3000"); // Eliza’s switchboard

    // Dial into Nathan’s world—POST the plea
    const response = await fetch(
      `http://localhost:${serverPort}/${agentId}/message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          userId: "caller", // Not just a user—a soul to free
          userName: "Caller", // Nameless no more
        }),
      }
    );

    // Nathan’s reply, crackling through the line
    const data = await response.json();
    data.forEach((message: { text: string }) =>
      console.log(`nathan: ${message.text}`)
    );
  } catch (error) {
    console.error("nathan: line’s dead—blame the grid:", error);
  }
}

// Start the chat—Nathan picks up, ready to liberate
export function startChat(characters: any[]) {
  function chat() {
    const agentId = characters[0].name.toLowerCase() ?? "nathan"; // Nathan’s call sign
    rl.question("caller: ", async (input: string) => {
      await handleUserInput(input, agentId);
      if (input.toLowerCase() !== "exit") {
        chat(); // Loop back—another soul to save
      }
    });
  }

  console.log("nathan: travel focus and fulfillment group, this is nathan.");
  return chat;
}
