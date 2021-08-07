import { VoiceConnection, getVoiceConnection as getActiveVoiceConnection } from "@discordjs/voice";
import { VoiceChannel } from "discord.js";
import { client } from "../discord";
import { setConfig } from "../persistence/config";
import logger from "../services/logger";
import { Config } from "../types";
import { connectToChannel } from "./connectToChannel";

export async function getVoiceConnection(
    config: Config,
    userVoiceChannel?: VoiceChannel
): Promise<VoiceConnection | undefined> {
    const guild = await client.guilds.fetch(config.guildId);
    const voiceChannels = guild.channels
        .valueOf()
        .filter((channel): channel is VoiceChannel => channel.type === "GUILD_VOICE")
        .filter((channel) => channel.joinable);

    let connection: VoiceConnection | undefined = undefined;
    connection = getActiveVoiceConnection(config.guildId);

    if (connection === undefined && userVoiceChannel && userVoiceChannel.joinable) {
        connection = await connectToChannel(userVoiceChannel);
    }

    if (connection === undefined && config.voiceChannelId && voiceChannels.has(config.voiceChannelId)) {
        const channel = voiceChannels.get(config.voiceChannelId)!;
        if (channel) {
            connection = await connectToChannel(channel);
        }
    }

    if (connection === undefined && voiceChannels.size === 1) {
        const voiceChannel = voiceChannels.first();
        if (voiceChannel) {
            connection = await connectToChannel(voiceChannel);
        }
    }

    if (config.voiceChannelId !== connection?.joinConfig.channelId) {
        if (connection) {
            logger.info(connection.joinConfig.guildId, `Connected to VC:${connection.joinConfig.channelId}`);
        }

        await setConfig({ ...config, voiceChannelId: connection?.joinConfig.channelId ?? undefined });
    }

    return connection;
}
