require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

client.commands = new Collection();
client.alarms = new Map();

(async () => {
  try {
    console.log('Loading events...');
    await loadEvents(client);
    
    console.log('Loading commands...');
    await loadCommands(client);
    
    console.log('Logging in...');
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1);
  }
})();

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});