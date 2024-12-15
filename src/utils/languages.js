const languages = {
  en: {
    alarmSet: {
      title: '🎯 Alarm Set Successfully!',
      description: 'Your alarm has been configured with the following details:',
      time: '⏰ Time',
      message: '📝 Message',
      mentions: '👥 Mentions',
      alarmId: '🔑 Alarm ID',
      createdBy: 'Created by'
    },
    alarmTrigger: {
      title: '⏰ ALARM TIME!'
    },
    buttons: {
      enableEveryone: 'Enable @everyone',
      disableEveryone: 'Disable @everyone'
    },
    alarmList: {
      title: '📋 Active Alarms',
      empty: 'No active alarms found!',
      useCommand: 'Use /alarm set to create a new alarm',
      description: 'Here are all your active alarms:',
      timeRemaining: '⏳ Time remaining',
      everyone: '🌐 @everyone'
    },
    alarmDelete: {
      title: '🗑️ Alarm Deleted',
      success: 'Alarm with ID `{id}` has been deleted successfully!',
      invalidId: '❌ Invalid alarm ID!',
      notAuthor: '⚠️ You can only delete alarms you created!',
      deletedBy: 'Deleted by'
    }
  },
  es: {
    alarmSet: {
      title: '🎯 ¡Alarma Configurada Exitosamente!',
      description: 'Tu alarma ha sido configurada con los siguientes detalles:',
      time: '⏰ Tiempo',
      message: '📝 Mensaje',
      mentions: '👥 Menciones',
      alarmId: '🔑 ID de Alarma',
      createdBy: 'Creado por'
    },
    alarmTrigger: {
      title: '⏰ ¡HORA DE LA ALARMA!'
    },
    buttons: {
      enableEveryone: 'Activar @everyone',
      disableEveryone: 'Desactivar @everyone'
    },
    alarmList: {
      title: '📋 Alarmas Activas',
      empty: '¡No hay alarmas activas!',
      useCommand: 'Usa /alarm set para crear una nueva alarma',
      description: 'Aquí están todas tus alarmas activas:',
      timeRemaining: '⏳ Tiempo restante',
      everyone: '🌐 @everyone'
    },
    alarmDelete: {
      title: '🗑️ Alarma Eliminada',
      success: 'La alarma con ID `{id}` ha sido eliminada exitosamente!',
      invalidId: '❌ ¡ID de alarma inválido!',
      notAuthor: '⚠️ ¡Solo puedes eliminar las alarmas que creaste!',
      deletedBy: 'Eliminado por'
    }
  }
};

module.exports = languages;