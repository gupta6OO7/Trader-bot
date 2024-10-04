require('dotenv').config();
const axios = require('axios');

// Configuration
const config = {
    initialBalance: 10000,
    currentBalance: 10000,
    position: 0, // how many shares we own
    lastTradePrice: null,
    buyPriceThreshold: -2, // percentage drop
    sellPriceThreshold: 3, // percentage rise
    stockSymbol: "GOOG", // Default stock symbol
    apiKey: process.env.FINNHUB_API_KEY // API key from Finnhub
};

// Finnhub API URL
const FINNHUB_API_URL = `https://finnhub.io/api/v1/quote?symbol=${config.stockSymbol}&token=${config.apiKey}`;

// Fetch stock price from Finnhub API
const getStockPrice = async () => {
    try {
        const response = await axios.get(FINNHUB_API_URL);
        const price = response.data.c; // 'c' is the current price in the Finnhub API response
        return price;
    } catch (error) {
        console.error("Error fetching stock price from Finnhub:", error);
        return null; // return null if there's an error
    }
};

// Function to execute buy order
const buyStock = (price) => {
    if (config.position === 0 && price) {
        config.position = config.currentBalance / price;
        config.currentBalance = 0;
        config.lastTradePrice = price;
        console.log(`Bought at $${price.toFixed(2)}, holding ${config.position.toFixed(2)} shares.`);
    }
};

// Function to execute sell order
const sellStock = (price) => {
    if (config.position > 0 && price) {
        const earnings = config.position * price;
        config.currentBalance = earnings;
        config.position = 0;
        config.lastTradePrice = price;
        console.log(`Sold at $${price.toFixed(2)}, current balance is $${config.currentBalance.toFixed(2)}.`);
    }
};

// Function to check trading logic
const evaluateTrade = async () => {
    const price = await getStockPrice();

    if (!price) {
        console.log("No price data available, skipping this cycle.");
        return;
    }

    console.log(`Current price of ${config.stockSymbol}: $${price.toFixed(2)}`);

    if (config.lastTradePrice) {
        const priceChangePercent = ((price - config.lastTradePrice) / config.lastTradePrice) * 100;

        if (priceChangePercent <= config.buyPriceThreshold) {
            buyStock(price);
        } else if (priceChangePercent >= config.sellPriceThreshold) {
            sellStock(price);
        }
    } else {
        // Initialize by buying the stock when there's no last trade
        buyStock(price);
    }
};

// Start the trading bot
setInterval(evaluateTrade, 5000); // Check every 5 seconds

// Stop the bot and print summary after 1 minute
const printSummary = () => {
    console.log("\nTrading Summary:");
    console.log(`Final Balance: $${config.currentBalance.toFixed(2)}`);
    if (config.position > 0) {
        console.log(`Still holding ${config.position.toFixed(2)} shares at $${config.lastTradePrice.toFixed(2)} per share.`);
    } else {
        console.log("No open positions.");
    }
    process.exit(); // End the program
};

setTimeout(printSummary, 60000); // 60 seconds
