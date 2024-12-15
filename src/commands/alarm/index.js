const { SlashCommandBuilder } = require('discord.js');
const { getUserLanguage } = require('../../utils/userSettings');
const languages = require('../../utils/languages');
const { handleSetAlarm } = require('./handlers/setAlarm');
const { handleListAlarms } = require('./handlers/listAlarms');
const { handleDeleteAlarm } = require('./handlers/deleteAlarm');

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