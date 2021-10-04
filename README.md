# TTT-Timer Discord Bot

This discord bot was built for virtual team time trials on [Zwift](https://zwift.com/) organized by [WTRL](https://www.wtrl.racing/). It takes the position of the DC and announces who has to lead next and for how long. Of course, the bot is not a replacement for a real coach but helps you to stay organized during an exhausting team time trial. The bot joins the discord call with your team mates and gives voice commands to everyone.

This is a follow-up project of the [TTT-Timer Web App](https://andipaetzold.github.io/tttt/).

## Installation

Click [here](https://discord.com/api/oauth2/authorize?client_id=806979974594560060&permissions=3155968&scope=bot) to install the bot to your server

You will be asked to grant multiple permissions:

| Permission      | Description                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Send Messages   | Allows the bot to send messages to a text channels                                                                                                         |
| Manage Messages | Allows the bot to update other users messages. This is used to create a button-like behavior when clicking on the emojis below the timer's status message. |
| Connect         | Allows the bot to join a voice channel                                                                                                                     |
| Speak           | Allows the bot to send audio / voice to a voice channel                                                                                                    |

<img src="./docs/authorize.png" height="500">

## Usage

All commands are prefixed with `!t`. All other messages are ignore by the bot.

-   If `!t` is already used by another bot, use `!tttt` as command prefix.
-   All commands are case insensitive to avoid frustration when interacting with the bot during a race.
-   There is only 1 configuration for each server. Changing the configuration in different text channels using the commands below, will alter the same configuration.

### `!t`

Shows the current configuration

<img src="./docs/config.png" height="300">

### `!t +<seconds>`

Adds time to the timer of the currently leading athlete. This is temporary and on the next rotation, the athlete will do their previously configured lead time again.

Example:

```bash
!t +15
```

_Adds 15 seconds to the clock of the currently leading athlete_

### `!t athletes`

Shows the list of the athetes including lead times

### `!t athletes <name>[:<time>] ...`

Set the list of athletes in the team and their lead times. The lead times are optional and default to 30 seconds.

You can also mention a user instead of typing their name. The voice commands will use the username at the time of sending this command, so make sure to change it to something pronouncable. Discord automatically adds a space character after a mention - make sure to remove that again.

Examples:

```bash
!t athletes Andi:45 Victor

// or

!t athletes @Andi:45 Victor
```

_The team now includes Andi and Victor. Andi leads for 45 seconds, Victor for 30._

<img src="./docs/athletes.png" height="90">

### `!t athlete <name> <seconds>`

Set the lead time of an athlete. The user must be added to the athletes list before using the command above.
You can also mention a user instead of typing their name.

Example:

```bash
!t athlete Andi 45

// or

!t athlete @Andi 45
```

_Sets the lead time of Andi to 45 seconds_

### `!t delay`

Show the current start delay

### `!t delay <number>`

Sets the start delay in seconds.

Example:

```bash
!t delay 300
```

_The timer will wait for 5 minutes before giving commands_

### `!t fresh <name>`

The athlete won't be skipped anymore. If the user sending this command was mentioned when configuring the timer the name can be omitted. This command doesn't change the order of the athletes.

Examples:

```bash
!t fresh Andi
```

_Andi will join the lead rotation again_

```bash
!t fresh
```

_If the user sending this message was mentioned when configuring the timer, they will join the lead rotation again_

### `!t help`

Show a help message with available commands

<img src="./docs/help.png" height="300">

### `!t invite`

Shows the link to add the bot to your server

### `!t language`

Shows the current language

### `!t language <language>`

Set the language of the voice commands. Available languages are:

-   English (`!t language en`)
-   German (`!t language de`)
-   Czech (`!t language cz`)

### `!t reset`

Stops the timer and resets all configuration of the bot for your server.

### `!t start`

Starts the timer. The bot joins your current voice channel or the channel from a previous start.

### `!t stop`

Stops the timer and leaves the voice channel.

### `!t skip`

The remaining time of the current athlete is skipped and the next athlete is announced with "Go &lt;name&gt;". This is a one-time skip.

If the timer hasn't started yet and is still waiting for the start delay to tick down, this command will skip the remaining time and immediately start the race with the first athlete.

### `!t toast <name>`

The athlete is skipped until writing `!t fresh <name>`. If the mentioned athlete is currently leading, the remaining time is skipped and the next athlete is announced with "Go &lt;name&gt;".

If the user sending this command was mentioned when configuring the timer the name can be omitted. This command doesn't change the order of the athletes.

Example:

```bash
!t toast Andi
```

_Andi is ignored when the bot announces the next leading athlete_

```bash
!t fresh
```

_If the user sending this message was mentioned when configuring the timer, they will be ignored when the bot announces the next leading athlete_

## Status Message

When starting the timer using `!t start`, a message is send to the current channel. This message automatically updates and includes the currently leading athlete and the next athlete including their leading times.

The bot automatically reacts with three emojis to this message. These can be used as buttons to control the bot during a race and to avoid typing.

| Emoji | Behavior                                                                                                          |
| ----- | ----------------------------------------------------------------------------------------------------------------- |
| ➕    | Same as typing `!t +10`                                                                                           |
| ⏭️    | Same as typing `!t skip`                                                                                          |
| ☠️    | Same as typing `!t toast` or `!t fresh`. This only works if the user was mentioned when athletes were configures. |

<img src="./docs/status-message.png" height="250">

## Voice Commands

The bot automatically gives commands 1/2/5/10/15/30 seconds and 1/2/3/5/10 minutes before a change or the start of the race. Also, a command is given on the actual change/start and when skipping an athlete.

## Parallel timers

Discord does not allow a bot to join multiple voice call at a time. To run multiple timers on the same server in parallel, I am hosting multiple instances of the TTT-Timer. The additional bots have the same behaviour as the main bot, but with a separate configuration and a different command prefix.

| Command Prefix    | Install Link                                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `!t` or `!tttt`   | [Install Bot 1](https://discord.com/api/oauth2/authorize?client_id=806979974594560060&permissions=3155968&scope=bot) |
| `!t2` or `!tttt2` | [Install Bot 2](https://discord.com/api/oauth2/authorize?client_id=894298274343837696&permissions=3155968&scope=bot) |

## Data Privacy

The discord bot is hosted on [Heroku](https://www.heroku.com/) using servers in Europe. The voice in generated using Google Translate. Therefore, the athlete names are visible to them.

The bot doesn't log or store any information that is not required for the use or monitoring of the bot. All information is automatically deleted when removing the bot from your server.

All code is publicly available on [Github](https://github.com/andipaetzold/tttt-discord).

## Need help?

Join the [TTT-Timer Discord server](https://discord.gg/SUccRhqswq) or [send an E-mail](mailto:tttt-discord@andipaetzold.com)

## Contact

Andi Pätzold

[E-Mail](mailto:tttt-discord@andipaetzold.com)

Support this project using [PayPal](https://paypal.me/andipaetzold)
