import TelegramBot from "node-telegram-bot-api";

const BOT_TOKEN = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

export const sendMessageToGroup = (message) => {
  bot.sendMessage(chatId, message, {
    parse_mode: "HTML"
  });
};
