
# Discord Alarm Bot 🔔

A sophisticated Discord bot that allows users to set customizable alarms with multiple mention capabilities and elegant embed messages.

> [!NOTE]  
> Before using the bot, make sure to:
> 1. Enable "Administrator" permissions when adding the bot to your server
> 2. Enable all three "Privileged Gateway Intents" in the Discord Developer Portal:
>    - Presence Intent
>    - Server Members Intent
>    - Message Content Intent

## Features ✨

- Set alarms with flexible time intervals (seconds, hours, days, weeks)
- Mention up to 3 users per alarm
- Toggle @everyone mentions through interactive buttons
- Unique ID for each alarm
- List active alarms with remaining time
- Delete specific alarms using their ID
- Beautiful embed messages for all interactions
- Interactive button controls
- Multi-language support (English and Spanish)
- Slash commands support

## Commands 🎮

- `/alarm set <value> <unit> @user1 @user2 @user3` - Set a new alarm
- `/alarm list` - View all active alarms
- `/alarm delete <id>` - Delete a specific alarm
- `/language` - Change bot language

> [!TIP]
> You can use the `list` command to check the IDs of your active alarms before deleting them.

## Language System 🌐

The bot supports multiple languages:
- English (Default)
- Spanish

To change the language:
1. Use the `/language` command
2. Select your preferred language from the dropdown menu
3. All bot responses will now be in your chosen language

> [!NOTE]
> Language preferences are saved per user, allowing different users to interact with the bot in their preferred language.

## Time Units ⏰

- seconds
- hours
- days
- weeks

## Setup 🚀

> [!IMPORTANT]  
> Before starting, make sure you have:
> - [Node.js v23.4.0](https://nodejs.org/dist/v23.4.0/node-v23.4.0-x64.msi) installed
> - A Discord bot token from the Discord Developer Portal
> - The bot invited to your server with Administrator permissions
> - All Privileged Gateway Intents enabled

1. Clone the repository
```
git clone https://github.com/AxthonyV/ChronoMate.git
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file and add your Discord bot token and client ID:
```
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_client_id_here
```

4. Deploy slash commands
```
npm run deploy-commands
```

5. Start the bot
```
npm start
```

## Required Permissions 🔑

The bot requires Administrator permissions to ensure all features work correctly, including:
- Send Messages
- Embed Links
- Mention @everyone
- Use Slash Commands
- View Channels
- And other necessary permissions

## Author 👨‍💻

Created by [AxthonyV](https://github.com/AxthonyV)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💖

If you find this bot helpful, please consider:
- Starring the repository
- Reporting issues
- Contributing to the code
- Sharing with others
