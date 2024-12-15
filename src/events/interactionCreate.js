const { getUserLanguage, setUserLanguage } = require('../utils/userSettings');
const languages = require('../utils/languages');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isStringSelectMenu()) return;

    try {
      if (interaction.isStringSelectMenu() && interaction.customId === 'language_select') {
        const language = interaction.values[0];
        setUserLanguage(interaction.user.id, language);
        
        const response = language === 'es' 
          ? '🌐 ¡Idioma cambiado a Español!'
          : '🌐 Language changed to English!';
        
        await interaction.reply({
          content: response,
          ephemeral: true
        });
        return;
      }

      if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        await command.execute(interaction);
      } else if (interaction.isButton()) {
        const [action, choice, alarmId] = interaction.customId.split('_');
        if (action !== 'everyone') return;

        const alarm = interaction.client.alarms.get(alarmId);
        if (!alarm) {
          return interaction.reply({
            content: '❌ This alarm no longer exists!',
            ephemeral: true
          });
        }

        alarm.mentionEveryone = choice === 'yes';
        interaction.client.alarms.set(alarmId, alarm);

        const language = getUserLanguage(interaction.user.id);
        const response = language === 'es'
          ? `Menciones @everyone ${choice === 'yes' ? 'activadas' : 'desactivadas'} para la alarma ${alarmId}`
          : `@everyone mentions ${choice === 'yes' ? 'enabled' : 'disabled'} for alarm ${alarmId}`;

        await interaction.reply({
          content: response,
          ephemeral: true
        });
      }
    } catch (error) {
      console.error(error);
      const errorMessage = getUserLanguage(interaction.user.id) === 'es'
        ? '¡Hubo un error al ejecutar este comando!'
        : 'There was an error executing this command!';
      
      await interaction.reply({
        content: errorMessage,
        ephemeral: true
      });
    }
  },
};