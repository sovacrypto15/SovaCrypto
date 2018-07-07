class CryptoController < ApplicationController
    include HTTParty

    def index
        
        distribution = {:Cash => "10%"}
        history = {}
        chartReturns = {}
        portfolio = Rebalance.all
        num = 0
        @response = HTTParty.get('https://api.coinmarketcap.com/v1/ticker/?limit=15');
        @hist = HTTParty.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=364&aggregate=1&e=CCCAGG')
        @hist["Data"].each do |h|
            history[Time.at(h["time"]).strftime("%B %e, %Y")] = h["close"]
        end

        portfolio.each do |p|
            chartReturns[p["day"]] = (p["totalCash"] + 1000)
        end
        @chart = chartReturns   

        @quotes = history

        @response.each do |d|
            if (d["symbol"] == 'MIOTA')
                d["symbol"] = 'IOT'
            end
            distribution[d["symbol"]] = "6%"
        end

        @pie = distribution

    end

    def register
        
    end

    def homepage
        @cryptoNews = HTTParty.get('https://newsapi.org/v2/top-headlines?q=crypto&apiKey=f98fb0a0ce69473d9c7e73599535d43b')
        @bitcoinNews = HTTParty.get('https://newsapi.org/v2/top-headlines?q=bitcoin&apiKey=f98fb0a0ce69473d9c7e73599535d43b')
        marketCap = HTTParty.get('https://api.coinmarketcap.com/v1/ticker/?limit=60')
        @response = HTTParty.get('https://api.coinmarketcap.com/v1/ticker/?limit=15');
        chartReturns = {}
        distribution = {:Cash => "10%"}
        @coins = marketCap
        @response.each do |d|
            if (d["symbol"] == 'MIOTA')
                d["symbol"] = 'IOT'
            end
            distribution[d["symbol"]] = "6%"
        end
        @chart = chartReturns 
        @pie = distribution
    end
    
end
