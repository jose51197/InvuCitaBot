import { Telegraf } from "telegraf";
import secrets from "../secrets.json";

const bot = new Telegraf(secrets.telegramApiKey);

export async function sendMessage(message: string) {
    await bot.telegram.sendMessage(secrets.chatId, message);
}