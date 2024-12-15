const { EmbedBuilder } = require('discord.js');
const { getUserLanguage } = require('../../../utils/userSettings');
const languages = require('../../../utils/languages');

async function triggerAlarm(client, alarmId) {
  const alarm = client.alarms.get(alarmId);
  if (!alarm) return;

  const channel = await client.channels.fetch(alarm.channelId);
  const mentionString = createMentionString(alarm);

  const language = getUserLanguage(alarm.authorId);
  const strings = languages[language];

  const embed = createTriggerAlarmEmbed(strings, alarm.message);

  await channel.send({
    content: mentionString,
    embeds: [embed]
  });

  client.alarms.delete(alarmId);
}

function createMentionString(alarm) {
  return [
    alarm.mentionEveryone ? '@everyone' : '',
    ...alarm.mentions.map(u => u.toString())
  ].filter(Boolean).join(' ');
}

function createTriggerAlarmEmbed(strings, message) {
  return new EmbedBuilder()
    .setTitle(strings.alarmTrigger.title)
    .setColor('#FF6B6B')
    .setDescription(message)
    .setImage('https://media1.tenor.com/m/XizrCPHHN2cAAAAd/alarm-clock-anime.gif')
    .setTimestamp();
}

module.exports = {
  triggerAlarm
};