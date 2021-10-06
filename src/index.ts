import { Client, Intents, Collection } from 'discord.js';
import { readdirSync } from 'fs';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commands = new Collection<string,any>(); //TODO: fix any
const commandFiles = readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));

for(const f of commandFiles) {
  const command = require(`${__dirname}/commands/${f}`);
  commands.set(command.name, command);
  console.log("[SET COMMAND]",command.name);
}

const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', m => {
  if (m.author.bot) return;
  if (m.content[0] === prefix) {
    const args = m.content.slice(prefix.length).trim().split(/ +/);

    //console.log(args);
    if(commands.has(args[0])) {
      commands.get(args[0]).execute(m, args);
    } else {
      console.log("[COMMAND HANDLER]",args[0], "not found");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);