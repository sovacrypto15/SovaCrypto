// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery2
//= require jquery_ujs
//= require popper
//= require bootstrap-sprockets
//= require chartkick
//= require moment
//= require rails-ujs
//= require socket.io
//= require_tree .
//= require turbolinks




let coinList = [];
let subscription = [];

$(document).ready(function() {

    // SOCKETIO LIVE PRICES

    $.ajax({ url:"https://api.coinmarketcap.com/v1/ticker/?limit=15", success: function(result) {
        
        result.forEach(x => {
            if (x.symbol == 'MIOTA') {
                x.symbol = 'IOT'
                coinList.push(x.symbol);
            } else {
                coinList.push(x.symbol);
            }
        })

        coinList.forEach(sym => {
            subscription.push(`5~CCCAGG~${sym}~USD`)
        })

    }});

    var currentPrice = {};
    var socket = io.connect('https://streamer.cryptocompare.com/');
    console.log(subscription);
    socket.emit('SubAdd', { subs: subscription });
    socket.on("m", function(message) {
        var messageType = message.substring(0, message.indexOf("~"));
        var res = [];
        if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
            res = CCC.CURRENT.unpack(message);
            // console.log(res);
            var from = res['FROMSYMBOL'];
            var to = res['TOSYMBOL'];
            var fsym = CCC.STATIC.CURRENCY.getSymbol(from);
            var tsym = CCC.STATIC.CURRENCY.getSymbol(to);
            var pair = from + to;

            if (!currentPrice.hasOwnProperty(pair)) {
                currentPrice[pair] = {};
            }

            for (var key in res) {
                currentPrice[pair][key] = res[key];
            }

            if (currentPrice[pair]['LASTTRADEID']) {
                currentPrice[pair]['LASTTRADEID'] = parseInt(currentPrice[pair]['LASTTRADEID']).toFixed(0);
            }
            currentPrice[pair]['CHANGE24HOUR'] = CCC.convertValueToDisplay(tsym, (currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']));
            currentPrice[pair]['CHANGE24HOURPCT'] = ((currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']) / currentPrice[pair]['OPEN24HOUR'] * 100).toFixed(2) + "%";;
            // console.log(currentPrice[pair], from, tsym, fsym);

            console.log(currentPrice[pair]);

            if (res.PRICE === undefined) {
                return
            } else {

                $(`#${currentPrice[pair].FROMSYMBOL}-PRICE`).text(`$${currentPrice[pair].PRICE.toLocaleString()}`);
                $(`#${currentPrice[pair].FROMSYMBOL}-CHG`).text(`${currentPrice[pair].CHANGE24HOURPCT}`);
            }

            if (currentPrice[pair]['OPEN24HOUR'] > currentPrice[pair]['PRICE']) {
                $(`#${currentPrice[pair].FROMSYMBOL}-CHG`).css('color', 'red');
                $(`#${currentPrice[pair].FROMSYMBOL}-PRICE`).css('color', 'red');
            } else {
                $(`#${currentPrice[pair].FROMSYMBOL}-CHG`).css('color', 'green');
                $(`#${currentPrice[pair].FROMSYMBOL}-PRICE`).css('color', 'green');
            }
        }
    })

    // COUNTDOWN CLOCK

    $('#clock').countdown('2018/12/10', function (event) {
        var $this = $(this).html(event.strftime(''
            + '<div class="timing" style="display: inline-block"><span>%w</span> <br> wks <br> </div>'
            + '<div class="timing" style="display: inline-block"><span>%d</span> <br> days <br></div> '
            + '<div class="timing" style="display: inline-block"><span>%H</span> <br> hrs <br></div> '
            + '<div class="timing" style="display: inline-block"><span>%M</span> <br> min <br></div> '
            + '<div class="timing" style="display: inline-block"><span>%S</span> <br> sec <br></div>'));
    });


    // SMOOTH SCROLL

   $('a[href*=\\#]').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 500);
    });


});