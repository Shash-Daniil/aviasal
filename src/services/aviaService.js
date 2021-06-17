export default class aviaService {
  apiBase = 'https://front-test.beta.aviasales.ru';

  async getTickets() {
    const response = await fetch('https://front-test.beta.aviasales.ru/search');
    return response.json();
  }
}
