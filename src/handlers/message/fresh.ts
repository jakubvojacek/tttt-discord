import type { Message } from "discord.js";
import { getConfig } from "../../config";
import { DEFAULT_PREFIX } from "../../constants";
import { updateStatusMessage } from "../../services/statusMessage";
import { getTimer, hasTimer, setAthleteAsFresh } from "../../services/timer";
import { EMOJI_ERROR, EMOJI_SUCCESS } from "../../util/emojis";
import isSameAthlete from "../../util/isSameAthlete";
import { parseMessage } from "../../util/message";
import parseUser from "../../util/parseUser";

export async function fresh(message: Message) {
    const { args } = parseMessage(message)!;
    const guildId = message.guild!.id;

    if (!(await hasTimer(guildId))) {
        await Promise.all([
            message.channel.send(`Start the timer first using \`${DEFAULT_PREFIX}start\``),
            message.react(EMOJI_ERROR),
        ]);
        return;
    }

    const [config, timer] = await Promise.all([getConfig(guildId), getTimer(guildId)]);

    const user = args[0] ? await parseUser(args[0]) : { name: message.author.username, userId: message.author.id };
    const athleteIndex = config.athletes.findIndex((athlete) => isSameAthlete(athlete, user));

    if (athleteIndex === -1) {
        await Promise.all([message.channel.send("I am not sure who is feeling fresh again"), message.react(EMOJI_ERROR)]);
        return;
    }

    await Promise.all([setAthleteAsFresh(guildId, athleteIndex), message.react(EMOJI_SUCCESS)]);

    await updateStatusMessage(guildId);
}
