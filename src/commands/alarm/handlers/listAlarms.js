const { EmbedBuilder } = require('discord.js');
const { formatTime } = require('../../../utils/timeUtils');

async function handleListAlarms(interaction, strings) {
  const userAlarms = Array.from(interaction.client.alarms.values())
    .filter(alarm => alarm.authorId === interaction.user.id);

  if (userAlarms.length === 0) {
    const embed = createEmptyAlarmsEmbed(strings);
    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }

  const embed = createAlarmListEmbed(strings, userAlarms);
  await interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

function createEmptyAlarmsEmbed(strings) {
  return new EmbedBuilder()
    .setTitle(strings.alarmList.title)
    .setColor('#FF6B6B')
    .setDescription(`${strings.alarmList.empty}\n${strings.alarmList.useCommand}`);
}

function createAlarmListEmbed(strings, alarms) {
  const embed = new EmbedBuilder()
    .setTitle(strings.alarmList.title)
    .setColor('#4ECDC4')
    .setDescription(strings.alarmList.description);

  for (const alarm of alarms) {
    const timeRemaining = Math.max(0, Math.floor((alarm.endTime - Date.now()) / 1000));
    const mentionsList = alarm.mentions.map(u => u.toString()).join(', ') || 'None';
    
    embed.addFields({
      name: `ID: ${alarm.id}`,
      value: `${strings.alarmList.timeRemaining}: ${formatTime(timeRemaining)}\n` +
             `📝 ${strings.alarmList.message}: ${alarm.message}\n` +
             `👥 ${strings.alarmList.mentions}: ${mentionsList}\n` +
             `${strings.alarmList.everyone}: ${alarm.mentionEveryone ? '✅' : '❌'}`
    });
  }

  return embed;
}

module.exports = {
  handleListAlarms
};