var ShopifyCustomInvoice = (function(){
'use strict';
 var defaults = {
  dph: 21,
  mena: "Kč"
 };

 var calc = {
  produktBezDph: function(price) { return price + " " + defaults['mena']; },
  produktPouzeDph: function(price) {return Math.round( (price * defaults['dph'] / 100 ))},
  produktCelkem: function(price, quantity) { return Math.round( (price * defaults['dph'] / 100 ) + price )  + " " + defaults['mena'] },
}

 var init = function() {
  calculateProducts();
 }

 var calculateProducts = function() {
  [].forEach.call(document.querySelectorAll('.produkt'), function(el,i,a) {
    var price = el.getAttribute('data-price'),
        quantity = el.getAttribute('data-quantity');

    el.querySelector('.produktBezDph').innerText = calc.produktBezDph(price);
    el.querySelector('.produktDph').innerText = defaults['dph'] + " %";
    el.querySelector('.produktPouzeDph').innerText = calc.produktPouzeDph(price);
    el.querySelector('.produktCelkem').innerText = calc.produktCelkem(price,quantity);

  });
 };

 init();
})();
