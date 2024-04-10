import axios from "axios";
import CryptoCurrency from "../models/crypto.model.js";
import Apperror from "../utils/ApiError.util.js";

export const fetchAndStoreCryptoList = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      if (!response.data) {
        console.log('No data received from API');
        throw new Apperror('No data received from API', 400);
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
  } catch (error) {
    throw new Apperror(error.message, 400);
  }
};