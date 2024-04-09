import axios from "axios";
import Apperror from "../utils/ApiError.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import { getTimeInterval } from "../utils/getTimeInterval.util.js";

const getPrice = async (req, res , next )=> {
    try {
        const { fromCurrency, toCurrency, date } = req.query;
        const {startDate ,endDate} = getTimeInterval(date);

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/market_chart/range?vs_currency=${toCurrency}&from=${startDate}&to=${endDate}`);
        console.log(response);
        

      
        return new ApiResponse(res, 200, "Price fetched successfully", {data : response.data});  

    } catch (error) {
        return next(new Apperror(error.message , 400));

    }
};


export {
    getPrice
}