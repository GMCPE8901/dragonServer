const { Client, GatewayIntentBits, Collection, ChannelType } = require('discord.js')
const voiceManager = new Collection();
const config = require('./config.json');
const command = require('./commands');

const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.on('ready', () => {
  console.log('The bot is ready')
  
  command(client, 'test', (message, params) => {
    message.guild.channels.create({
      name: 'test1',
      type: ChannelType.GuildVoice,
      parent: '1058682581312344085'
    })
  })
  
  command(client, 'join', async (message, params) => {
    const channels = await message.guild.channels.fetch();
    const member = message.member;
    console.log(params);
    if(member.voice.channel) {
      channels.forEach(channel => {
        if (params[0] === channel.id) {
          member.voice.setChannel(channel);
        }
      })
    } else {
      console.log('User Not Join in ChannelId');
    }
  })
  
})


 /*client.on('voiceStateUpdate', async (oS, nS) => {
  const user = await client.users.fetch(nS.id);
  const member = newState.guild.member;
  
  if(!oS.channel && nS.channel.id === '1058586350896549988') {
    const channel = await nS.guild.channnels.create(user.tag, {
      type: ChannelType.GuildVoice,
      parent: nS.channel.parent,
    });
    member.voice.setChannel(channel);
    voiceManager.set(user.id, channel.id);
  } else if (!nS.channel) {
    if(oS.channel === voiceCollection.get(nS.id)) return oS.channel.delete();
  }
})*/

client.login(config.TOKEN)
