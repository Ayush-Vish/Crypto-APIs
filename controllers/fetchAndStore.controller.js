import axios from "axios";
import CryptoCurrency from "../models/crypto.model.js";

export const fetchAndStoreCryptoList = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    if (!response.data) {
      console.log('No data received from API');
      return;
    }
    const cryptoList = response.data;
    console.log('Received data from API:', cryptoList);

    const bulkOps = cryptoList.map((item) => ({
      updateOne: {
        filter: { id: item.id },
        update: { $set: item },
        upsert: true,
      },
    }));

    await CryptoCurrency.bulkWrite(bulkOps);
    console.log('Crypto list fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching and storing crypto list:', error);
    throw new Apperror(error.message, 400);
  }
};