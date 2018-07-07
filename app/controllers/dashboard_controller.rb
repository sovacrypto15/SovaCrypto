class DashboardController < ApplicationController
    include HTTParty

    def home
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
end
