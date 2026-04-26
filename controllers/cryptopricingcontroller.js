import axios from "axios";

export const pricing = async (req, res) => {
  const name = req.params.coin.toUpperCase();
  const symbol = `${name}USDT`;

  try {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

    const response = await axios.get(url);


  
 

    res.status(200).json({
      coin: name,
     price: parseFloat(response.data.price) 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};