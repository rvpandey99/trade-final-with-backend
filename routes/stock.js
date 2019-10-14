const express = require("express");
const router = express.Router();
const verify = require("./verify");
const Stock = require("../models/stocks");
const Joi = require("@hapi/joi");

const stockJoi = Joi.object().keys({
  ticker: Joi.string().required(),
  company: Joi.string().required(),
  marketPrice: Joi.number().required()
});

async function createStocks() {
  const init_stock = [
    {
      ticker: "INFY",
      company: "Infosys",
      marketPrice: 800
    },
    {
      ticker: "TCS",
      company: "Tata Consultancy Services",
      marketPrice: 1100
    },
    {
      ticker: "WIPRO",
      company: "Wipro Ltd",
      marketPrice: 360
    },
    {
      ticker: "ARTL",
      company: "Bharati Airtel",
      marketPrice: 400
    },
    {
      ticker: "LT",
      company: "Larsen and Tubro",
      marketPrice: 1200
    },
    {
      ticker: "ICICI",
      company: "ICICI Bank",
      marketPrice: 1000
    },
    {
      ticker: "HDFC",
      company: "HDFC Bank",
      marketPrice: 250
    },
    {
      ticker: "ITC",
      company: "ITC",
      marketPrice: 300
    },
    {
      ticker: "RELIANCE",
      company: "TReliance",
      marketPrice: 1400
    },
    {
      ticker: "SBIN",
      company: "State Bank of India",
      marketPrice: 290
    }
  ];
  init_stock.forEach(async s => {
    const tickerExist = await Stock.findOne({
      ticker: s.ticker.toUpperCase()
    });
    if (!tickerExist) {
      const share = new Stock({
        ticker: s.ticker,
        company: s.company,
        marketPrice: s.marketPrice
      });

      try {
        await share.save();
      } catch (err) {
        console.log(err);
      }
    }
  });
}

router.post("/stocks", async (req, res) => {
  const data = req.body;
  let { error, value } = Joi.validate(data, stockJoi);
  if (error) return res.status(400).send(error.details[0].message);

  const tickerExist = await Stock.findOne({
    ticker: value.ticker.toUpperCase()
  });
  if (tickerExist)
    return res
      .status(400)
      .send(
        "Stock ticker already exist. Please try again with different Stock."
      );

  // const companyExist = await Stock.findOne({company : value.company.toUpperCase()});
  // if (companyExist) return res.status(400).send('Company already used')

  const share = new Stock({
    ticker: value.ticker,
    company: value.company,
    marketPrice: value.marketPrice
  });

  try {
    const savedShare = await share.save();
    res.send(savedShare).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

router.get("/stocks", async (req, res) => {
  Stock.find({}, (error, stocks) => {
    if (error) {
      return res.send(error).status(400);
    }
    let stocksMap = {};
    stocks.forEach(stock => {
      stocksMap[stock.ticker] = stock;
    });
    return res.send(stocksMap).status(200);
  });
});

module.exports = { router: router, createStocks: createStocks };
