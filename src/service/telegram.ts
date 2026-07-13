import axios from 'axios';

class TelegramService {
  signup(name: string, phone: string) {
    return axios.post('/telegram-bot/sklad24/signup', { name, phone });
  }
}

export const telegrmService = new TelegramService();
