import axios from "axios";
import Apperror from "../utils/ApiError.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import { getTimeInterval } from "../utils/getTimeInterval.util.js";

/**
 * Fetches the price of a specific cryptocurrency in a specific currency for a specific date.
 * @method GET
 * @query {String} fromCurrency - The cryptocurrency to fetch the price for.
 * @query {String} toCurrency - The currency to fetch the price in.
 * @query {String} date - The date to fetch the price for in the format MM-DD-YYYY.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {ApiResponse} The response object containing the price data.
 * @throws {Apperror} If the required query parameters are missing or the date is not in the correct format.
 */
const getPrice = async (req, res, next) => {
  try {
    const { fromCurrency, toCurrency, date } = req.query;
    if (!fromCurrency || !toCurrency || !date) {
      return next(
        new Apperror("fromCurrency, toCurrency and date are required", 400)
      );
    }
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;

    if (!datePattern.test(date)) {
      return next(new Apperror("Date must be in the format DD-MM-YYYY", 400));
    }
    const { startDate, endDate } = getTimeInterval(date);

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${fromCurrency}/market_chart/range?vs_currency=${toCurrency}&from=${startDate}&to=${endDate}`
    );
      
    if(response.status !== 200){
      return next(new Apperror(await response.data, 400));
    }
    const prices = response.data.prices;
    const averagePrice =
      prices.reduce((sum, [_, price]) => sum + price, 0) / prices.length;

    return new ApiResponse(
      res,
      200,
      `Price of ${fromCurrency} in ${toCurrency} on ${date} fetched successfully`,
      { price: averagePrice }
    );
  } catch (error) {
    return next(new Apperror(error.message, 400));
  }
};

/**
 * Fetches the list of companies holding a specific cryptocurrency.
 * @method GET
 * @params {String} currency - The cryptocurrency to fetch the companies for.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {ApiResponse} The response object containing the list of companies.
 * @throws {Apperror} If the required path parameter is missing, not a string, or not a valid currency.
 */

const getCompaniesHoldingCrypto = async (req, res, next) => {
  try {
    const { currency } = req.params;
    if (!currency) {
      return next(new Apperror("Currency is required", 400));
    }
    if (typeof currency !== "string") {
      return next(new Apperror("Currency must be a string", 400));
    }
    if (!["bitcoin", "ethereum"].includes(currency)) {
      return next(
        new Apperror(
          "Invalid currency. Possible values are only 'bitcoin' or 'ethereum'.",
          400
        )
      );
    }

    let companyName = [];
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`
      );
      const companies = response?.data?.companies;
      companyName = companies.map((company) => company.name);
    } catch (error) {
      return next(new Apperror("Error Fetching API", 400));
    }

    return new ApiResponse(
      res,
      200,
      "List of companies holding the cryptocurrency fetched successfully",
      {
        currency,
        companyName,
      }
    );
  } catch (error) {
    return next(new Apperror(error.message, 400));
  }
};

export { getPrice, getCompaniesHoldingCrypto };
