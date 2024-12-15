const { EmbedBuilder } = require('discord.js');

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

  const embed = createDeleteAlarmEmbed(strings, alarmId, interaction.user.tag);
  await interaction.reply({
    embeds: [embed],
    ephemeral: true
  });
}

function createDeleteAlarmEmbed(strings, alarmId, userTag) {
  return new EmbedBuilder()
    .setTitle(strings.alarmDelete.title)
    .setColor('#FF6B6B')
    .setDescription(strings.alarmDelete.success.replace('{id}', alarmId))
    .setFooter({ text: `${strings.alarmDelete.deletedBy} ${userTag}` })
    .setTimestamp();
}

module.exports = {
  handleDeleteAlarm
};