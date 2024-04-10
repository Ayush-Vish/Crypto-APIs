import axios from "axios";
import CryptoCurrency from "../models/crypto.model.js";
import Apperror from "../utils/ApiError.util.js";

export const fetchAndStoreCryptoList = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      if (!response.data) {
        throw new Apperror('No data received from API', 400);
      }
      const cryptoList = response.data;
      const bulkOps = cryptoList.map((item) => ({
        updateOne: {
          filter: { id: item.id },
          update: { $set: {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
          } },
          upsert: true,
        },
      }));

      const a= await CryptoCurrency.bulkWrite(bulkOps);
  } catch (error) {
    console.log(error)
    console.log("Eror", error.message )
  }
};