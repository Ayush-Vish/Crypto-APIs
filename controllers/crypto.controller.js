import axios from "axios";
import Apperror from "../utils/ApiError.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import { getTimeInterval } from "../utils/getTimeInterval.util.js";


const getPrice = async (req, res , next )=> {
    try {
        const { fromCurrency, toCurrency, date } = req.query;
        if (!fromCurrency || !toCurrency || !date) {
            return next(new Apperror("fromCurrency, toCurrency and date are required", 400));
        }
        const datePattern = /^\d{2}-\d{2}-\d{4}$/;

        if (!datePattern.test(date)) {
            return next(new Apperror("Date must be in the format MM-DD-YYYY", 400));
        }
        const {startDate ,endDate} = getTimeInterval(date);

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/market_chart/range?vs_currency=${toCurrency}&from=${startDate}&to=${endDate}`);
        
        

        
        return new ApiResponse(res, 200, "Price fetched successfully", {data : response.data});  

    } catch (error) {
        return next(new Apperror(error.message , 400));

    }
};

const getCompaniesHoldingCrypto = async (req, res, next) => {
    try {
        const { currency } = req.params;
        if(!currency) {
            return next(new Apperror("Currency is required", 400));
        }
        if(typeof currency !== "string") {
            return next(new Apperror("Currency must be a string", 400));
        }
        if (!["bitcoin", "ethereum"].includes(currency)) {
            return next(new Apperror("Invalid currency. Possible values are only 'bitcoin' or 'ethereum'.", 400));
        }
        
        let companyName = [];
       try {
        
           const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);
           const companies = response?.data.companies;
           companyName = companies.map(company => company.name);
       } catch (error) {
            console.log(error.mess);
       }
       


        return new ApiResponse(res, 200, "List of companies holding the cryptocurrency fetched successfully", {
            currency,
            companyName
        });

    } catch (error) {
        return next(new Apperror(error.message, 400));
    }
};

export {
    getPrice, 
    getCompaniesHoldingCrypto
}