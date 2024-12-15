const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { timeUnits, formatTime } = require('../../../utils/timeUtils');
const { v4: uuidv4 } = require('uuid');
const { triggerAlarm } = require('./triggerAlarm');

async function handleSetAlarm(interaction, strings) {
  const value = interaction.options.getNumber('value');
  const unit = interaction.options.getString('unit');
  const message = interaction.options.getString('message') || 'Time is up!';
  const mentions = [
    interaction.options.getUser('user1'),
    interaction.options.getUser('user2'),
    interaction.options.getUser('user3')
  ].filter(Boolean);

  const seconds = timeUnits[unit](value);
  const alarmId = uuidv4();

  const alarm = {
    id: alarmId,
    authorId: interaction.user.id,
    channelId: interaction.channelId,
    endTime: Date.now() + seconds * 1000,
    message,
    mentions,
    mentionEveryone: false
  };

  interaction.client.alarms.set(alarmId, alarm);

  setTimeout(() => triggerAlarm(interaction.client, alarmId), seconds * 1000);

  const row = createEveryoneButtons(alarmId, strings);
  const embed = createSetAlarmEmbed(strings, seconds, message, mentions, alarmId, interaction.user.tag);

  await interaction.reply({
    embeds: [embed],
    components: [row]
  });
}

function createEveryoneButtons(alarmId, strings) {
  return new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`everyone_yes_${alarmId}`)
        .setLabel(strings.buttons.enableEveryone)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`everyone_no_${alarmId}`)
        .setLabel(strings.buttons.disableEveryone)
        .setStyle(ButtonStyle.Danger)
    );
}

function createSetAlarmEmbed(strings, seconds, message, mentions, alarmId, userTag) {
  return new EmbedBuilder()
    .setTitle(strings.alarmSet.title)
    .setColor('#4ECDC4')
    .setDescription(strings.alarmSet.description)
    .addFields(
      { name: strings.alarmSet.time, value: formatTime(seconds), inline: true },
      { name: strings.alarmSet.message, value: message, inline: true },
      { name: strings.alarmSet.mentions, value: mentions.length ? mentions.map(u => u.toString()).join(', ') : 'None', inline: true },
      { name: strings.alarmSet.alarmId, value: alarmId }
    )
    .setFooter({ text: `${strings.alarmSet.createdBy} ${userTag}` })
    .setTimestamp();
}

module.exports = {
  handleSetAlarm
};