# Stock Trading Bot - Node.js

This is a simple stock trading bot that uses the **Finnhub API** to fetch real-time stock prices and execute trades based on predefined strategies, such as percentage-based threshold trading and moving average crossover.

## Features:
- **Real-time Stock Data**: Retrieves live stock prices using the Finnhub API.
- **Simple Trading Strategy**: Buys or sells stock based on price percentage changes.
- **Moving Average Strategy**: Implements a moving average crossover strategy for buy/sell decisions.

## Project Structure:
```bash
TRADER/
│
├── .env                      # Environment variables, stores API keys.
├── .gitignore                 # Files and directories to ignore in version control.
├── FinnhubIntegration.js      # Core bot logic with Finnhub API for real-time stock data.
├── movingAverageLogic.js      # Bot logic implementing the Moving Average Crossover Strategy.
├── withoutApiIntegration.js   # Example bot without API integration, uses mock data.
├── package.json               # Project dependencies and metadata.
├── package-lock.json          # Exact dependency versions installed.
└── README.md                  # Project documentation.
```

## Prerequisites:
- **Node.js** (v12 or higher) must be installed.
- **npm** (Node package manager) installed. It usually comes bundled with Node.js.
- A **Finnhub API key**. You can register for an API key at [Finnhub](https://finnhub.io/).

## Installation:

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add your **Finnhub API key** in the `.env` file:
     ```bash
     FINNHUB_API_KEY=your_finnhub_api_key
     ```

## Usage:

### 1. Running the Bot with Finnhub API (Real-Time):
This version fetches live stock data and executes trades based on real-time prices from the Finnhub API.

```bash
node FinnhubIntegration.js
```

- **Trading Logic**: The bot buys when the stock price drops by a specified percentage (default: 2%) and sells when it rises by another percentage (default: 3%).
- **Finnhub API Integration**: Fetches the real-time stock price of the symbol provided (default: Google `GOOG`).

### 2. Running the Bot with Moving Average Strategy:
This script implements a moving average crossover strategy to determine buy/sell signals.

```bash
node movingAverageLogic.js
```

- **Moving Average Strategy**: The bot buys when the short-term moving average (e.g., 5-day) crosses above the long-term moving average (e.g., 20-day) and sells when it crosses below.

### 3. Running the Bot without API Integration (Mock Data):
For testing purposes, you can run the bot with mock data without any external API integration.

```bash
node withoutApiIntegration.js
```

- **Mock Data**: Uses hardcoded stock prices to test the trading logic without real-time data.

## Configuration:

The bot's behavior can be customized by modifying the configuration object found in the main files (`FinnhubIntegration.js`, `movingAverageLogic.js`, etc.).

```javascript
const config = {
    initialBalance: 10000,           // Starting balance
    currentBalance: 10000,           // Current balance
    position: 0,                     // Stock holdings (number of shares)
    lastTradePrice: null,            // Last trade price (for tracking purposes)
    buyPriceThreshold: -2,           // Percentage drop required to trigger a buy
    sellPriceThreshold: 3,           // Percentage rise required to trigger a sell
    stockSymbol: "GOOG",             // Stock symbol to trade (default: Google)
};
```

You can adjust the following:
- **initialBalance**: The starting balance for the bot.
- **buyPriceThreshold**: The percentage drop in stock price that triggers a buy.
- **sellPriceThreshold**: The percentage increase in stock price that triggers a sell.
- **stockSymbol**: The stock ticker symbol you want to track and trade.

## Example Output:
```bash
$ node FinnhubIntegration.js
Current price of AAPL: $148.23
Bought at $148.23, holding 67.49 shares.
Current price of AAPL: $152.34
Sold at $152.34, current balance is $10284.15.
Trading Summary:
Final Balance: $10284.15
No open positions.
```


