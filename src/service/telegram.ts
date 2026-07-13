import { api } from './api';

class TelegramService {
  signup(name: string, phone: string) {
    return api.post('/telegram-bot/sklad24/signup', { name, phone });
  }
}

export const telegramService = new TelegramService();
