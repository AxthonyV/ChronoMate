const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { timeUnits, formatTime } = require('../utils/timeUtils');
const { getUserLanguage } = require('../utils/userSettings');
const languages = require('../utils/languages');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('alarm')
    .setDescription('Manage alarms')
    .addSubcommand(subcommand =>
      subcommand
        .setName('set')
        .setDescription('Set a new alarm')
        .addNumberOption(option =>
          option.setName('value')
            .setDescription('The time value')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('unit')
            .setDescription('Time unit')
            .setRequired(true)
            .addChoices(
              { name: 'seconds', value: 'seconds' },
              { name: 'hours', value: 'hours' },
              { name: 'days', value: 'days' },
              { name: 'weeks', value: 'weeks' }
            ))
        .addUserOption(option =>
          option.setName('user1')
            .setDescription('First user to mention')
            .setRequired(false))
        .addUserOption(option =>
          option.setName('user2')
            .setDescription('Second user to mention')
            .setRequired(false))
        .addUserOption(option =>
          option.setName('user3')
            .setDescription('Third user to mention')
            .setRequired(false))
        .addStringOption(option =>
          option.setName('message')
            .setDescription('Custom message for the alarm')
            .setRequired(false)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('List all active alarms'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('delete')
        .setDescription('Delete a specific alarm')
        .addStringOption(option =>
          option.setName('id')
            .setDescription('The ID of the alarm to delete')
            .setRequired(true))),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const language = getUserLanguage(interaction.user.id);
    const strings = languages[language];

    switch (subcommand) {
      case 'set':
        await handleSetAlarm(interaction, strings);
        break;
      case 'list':
        await handleListAlarms(interaction, strings);
        break;
      case 'delete':
        await handleDeleteAlarm(interaction, strings);
        break;
    }
  }
};

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

  const row = new ActionRowBuilder()
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

  const embed = new EmbedBuilder()
    .setTitle(strings.alarmSet.title)
    .setColor('#4ECDC4')
    .setDescription(strings.alarmSet.description)
    .addFields(
      { name: strings.alarmSet.time, value: formatTime(seconds), inline: true },
      { name: strings.alarmSet.message, value: message, inline: true },
      { name: strings.alarmSet.mentions, value: mentions.length ? mentions.map(u => u.toString()).join(', ') : 'None', inline: true },
      { name: strings.alarmSet.alarmId, value: alarmId }
    )
    .setFooter({ text: `${strings.alarmSet.createdBy} ${interaction.user.tag}` })
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
    components: [row]
  });
}

async function handleListAlarms(interaction, strings) {
  const userAlarms = Array.from(interaction.client.alarms.values())
    .filter(alarm => alarm.authorId === interaction.user.id);

  if (userAlarms.length === 0) {
    const embed = new EmbedBuilder()
      .setTitle(strings.alarmList.title)
      .setColor('#FF6B6B')
      .setDescription(`${strings.alarmList.empty}\n${strings.alarmList.useCommand}`);

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }

  const embed = new EmbedBuilder()
    .setTitle(strings.alarmList.title)
    .setColor('#4ECDC4')
    .setDescription(strings.alarmList.description);

  for (const alarm of userAlarms) {
    const timeRemaining = Math.max(0, Math.floor((alarm.endTime - Date.now()) / 1000));
    const mentionsList = alarm.mentions.map(u => u.toString()).join(', ') || 'None';
    
    embed.addFields({
      name: `ID: ${alarm.id}`,
      value: `${strings.alarmList.timeRemaining}: ${formatTime(timeRemaining)}\n` +
             `${strings.alarmList.message}: ${alarm.message}\n` +
             `${strings.alarmList.mentions}: ${mentionsList}\n` +
             `${strings.alarmList.everyone}: ${alarm.mentionEveryone ? '✅' : '❌'}`
    });
  }

  await interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

async function handleDeleteAlarm(interaction, strings) {
  const alarmId = interaction.options.getString('id');
  const alarm = interaction.client.alarms.get(alarmId);

  if (!alarm) {
    return interaction.reply({
      content: strings.alarmDelete.invalidId,
      ephemeral: true
    });
  }

  if (alarm.authorId !== interaction.user.id) {
    return interaction.reply({
      content: strings.alarmDelete.notAuthor,
      ephemeral: true
    });
  }

  interaction.client.alarms.delete(alarmId);

  const embed = new EmbedBuilder()
    .setTitle(strings.alarmDelete.title)
    .setColor('#FF6B6B')
    .setDescription(strings.alarmDelete.success.replace('{id}', alarmId))
    .setFooter({ text: `${strings.alarmDelete.deletedBy} ${interaction.user.tag}` })
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

async function triggerAlarm(client, alarmId) {
  const alarm = client.alarms.get(alarmId);
  if (!alarm) return;

  const channel = await client.channels.fetch(alarm.channelId);
  const mentionString = [
    alarm.mentionEveryone ? '@everyone' : '',
    ...alarm.mentions.map(u => u.toString())
  ].filter(Boolean).join(' ');

  const language = getUserLanguage(alarm.authorId);
  const strings = languages[language];

  const embed = new EmbedBuilder()
    .setTitle(strings.alarmTrigger.title)
    .setColor('#FF6B6B')
    .setDescription(alarm.message)
    .setImage('https://media1.tenor.com/m/XizrCPHHN2cAAAAd/alarm-clock-anime.gif')
    .setTimestamp();

  await channel.send({
    content: mentionString,
    embeds: [embed]
  });

  client.alarms.delete(alarmId);
}