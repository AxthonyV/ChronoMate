const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('language')
    .setDescription('Set the bot language'),

  async execute(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('language_select')
          .setPlaceholder('Select a language')
          .addOptions([
            {
              label: 'English',
              description: 'Set the bot language to English',
              value: 'en',
              emoji: '🇬🇧'
            },
            {
              label: 'Español',
              description: 'Establecer el idioma del bot a Español',
              value: 'es',
              emoji: '🇪🇸'
            }
          ])
      );

    const embed = new EmbedBuilder()
      .setTitle('🌐 Language Settings / Configuración de Idioma')
      .setDescription('Choose your preferred language / Elige tu idioma preferido')
      .setColor('#4ECDC4')
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true
    });
  }
};