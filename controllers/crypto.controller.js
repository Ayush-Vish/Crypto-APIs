const getPrice = async (req, res , next )=> {
    try {
        const { fromCurrency, toCurrency, date } = req.query;

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}`);

        const priceInToCurrency = response.data.market_data.current_price[toCurrency.toLowerCase()];

        
    } catch (error) {
        console.error('Error fetching price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
