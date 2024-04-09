import axios from 'axios';
import CryptoCurrency from '../models/crypto.model.js';

export const fetchAndStoreCryptoList = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      const cryptoList = response.data;
      console.log(cryptoList)
      await CryptoCurrency.deleteMany();
      await CryptoCurrency.insertMany(cryptoList);
      console.log('Crypto list updated');
    } catch (error) {
      console.error('Error updating crypto list:', error);
    }
  };