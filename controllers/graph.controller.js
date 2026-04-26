// export const graph = async (req, res) => {
//     const name = req.params.coin.toUpperCase();
//     res.json({ message: "Graph route" });
// }

import axios from "axios";

export const graph = async (req, res) => {
    const name = req.params.coin.toUpperCase();
    const symbol = `${name}USDT`;
    try {
        const coin = req.params.coin.toUpperCase();
        const symbol = `${coin}USDT`;

        // 24 candles, 1-hour interval
        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`;

        const response = await axios.get(url);

        // Format data for frontend
        const chartData = response.data.map((item) => ({
            time: item[0],          // timestamp
            open: parseFloat(item[1]),
            high: parseFloat(item[2]),
            low: parseFloat(item[3]),
            close: parseFloat(item[4]),
            volume : parseFloat(item[5]),
            closeTime : parseFloat(item[6]),
            QuoteAssetVolume : parseFloat(item[7]),
            numberOfTrade : parseFloat(item[8]),
            BuyVolume : parseFloat(item[9]),
            BuyQuoteVolume : parseFloat(item[10]),
            Ignore : parseFloat(item[11])

        }));

    
        res.status(200).json({
            message: "success",
            data: chartData
           
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching chart data",
            error: error.message
        });
    }
};