// import { configDotenv } from 'dotenv';
// import express from 'express';
// import {
//   InteractionType,
//   InteractionResponseType,
//   InteractionResponseFlags,
//   MessageComponentTypes,
//   ButtonStyleTypes,
// } from 'discord-interactions';
// import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';
// import { getShuffledOptions, getResult } from './game.js';


// configDotenv()
// // Create an express app
// const app = express();
// // Get port, or default to 3000
// const PORT = process.env.PORT || 3000;
// // Parse request body and verifies incoming requests using discord-interactions package
// app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// // Store for in-progress games. In production, you'd want to use a DB
// const activeGames = {};

// /**
//  * Interactions endpoint URL where Discord will send HTTP requests
//  */
// app.post('/interactions', async function (req, res) {
//   // Interaction type and data
//   const { type, id, data } = req.body;

//   /**
//    * Handle verification requests
//    */
//   if (type === InteractionType.PING) {
//     return res.send({ type: InteractionResponseType.PONG });
//   }

//   /**
//    * Handle slash command requests
//    * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
//    */
//   if (type === InteractionType.APPLICATION_COMMAND) {
//     const { name } = data;

//     // "test" command
//     if (name === 'test') {
//       console.log('test')
//       // Send a message into the channel where command was triggered from
//       return res.send({
//         type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
//         data: {
//           // Fetches a random emoji to send from a helper function
//           content: 'hello world ' + getRandomEmoji(),
//         },
//       });
//     }
//   }
// });

// app.listen(PORT, () => {
//   console.log('Listening on port', PORT);
// });





import { configDotenv } from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';


configDotenv();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", msg => {
  console.log(msg)
  if(msg.content === "ping"){
    msg.reply("Pong!")
    console.log("Pong!")
  }
})


client.on('interactionCreate', async interaction => {
  console.log("interaction:", interaction)
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.DISCORD_TOKEN);