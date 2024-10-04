// Configuration
const config = {
    initialBalance: 10000,
    currentBalance: 10000,
    position: 0, // how many shares we own
    lastTradePrice: null,
    buyPriceThreshold: -2, // percentage drop
    sellPriceThreshold: 3, // percentage rise
    stockSymbol: "XYZ"
};

// Mock stock prices
let stockPrices = [100, 98, 95, 99, 104, 108, 103];

// Function to get mock stock price
const getStockPrice = async () => {
    // Randomly get a stock price from the array
    return new Promise((resolve) => {
        const price = stockPrices[Math.floor(Math.random() * stockPrices.length)];
        resolve(price);
    });
};

// Function to execute buy order
const buyStock = (price) => {
    if (config.position === 0) {
        config.position = config.currentBalance / price;
        config.currentBalance = 0;
        config.lastTradePrice = price;
        console.log(`Bought at $${price.toFixed(2)}, holding ${config.position.toFixed(2)} shares.`);
    }
};

// Function to execute sell order
const sellStock = (price) => {
    if (config.position > 0) {
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
    console.log(`Current price of ${config.stockSymbol}: $${price}`);

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

// Stop the bot and print summary after 1 minute
setTimeout(printSummary, 60000); // 60 seconds
