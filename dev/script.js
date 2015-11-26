var ShopifyCustomInvoice = (function(){
 'use strict';

  var params = {
  },
  mena = '',


  init = function(paramObject) {

    var defaults = {
      dph:  0.21,
      dphzceny: 17.355,
      mena: "Kč",
    };


    //Set Parameters
    var finalParams = defaults;
    // We iterate over each property of the paramObject
    for (var key in paramObject) {
      // If the current property wasn't inherited, proceed
      if (paramObject.hasOwnProperty(key)) {
        // If the current property is defined,
        // add it to finalParams
        if (paramObject[key] !== undefined) {
            finalParams[key] = paramObject[key];
        }
      }
    }

    params = finalParams;

    // Set Mena
    mena =  " " + params['mena'],


    console.log(finalParams);

    calculateProducts();
    calculateInvoice();
  },

  calculateProducts = function() {
    [].forEach.call(document.querySelectorAll('.produkt'), function(el,i,a) {
      var
      price = Number(el.getAttribute('data-price') / 100),
      quantity = Number(el.getAttribute('data-quantity'));

      var cenaZaKus = price;
      var dph = ((price * quantity * params['dphzceny']) / 100).toFixed(2);
      var celkemBezDph = (cenaZaKus * quantity) - dph;
      var celkemSDph = (price * quantity).toFixed(2);

      el.querySelector('.produkt-cena-za-kus').innerText = cenaZaKus + mena;
      el.querySelector('.produktDph').innerText = params['dph'] * 100 + " %";
      el.querySelector('.produkt-celkem-dph').innerText = dph + mena;

      var produktCelkem = el.querySelector('.produkt-celkem-s-dph');
      produktCelkem.innerText = celkemSDph + mena;
      produktCelkem.setAttribute('data-price', celkemSDph);
    });
  },

  calculateInvoice = function() {
    var invoice = {
      celkemBezDph: 0,
      mezisoucet: 0,
      dan: 0,
      halere: 0,
      sleva: 0,
      celkem: 0,
      doprava: 0,
    };

    //Get celkem
    invoice['celkem'] = document.querySelector('.invoiceCelkem').getAttribute('data-cc') / 100;

    //halere
    var celkovaCenaZaokrouhlena = Math.round(invoice['celkem']);
    invoice['halere'] = Math.round( (celkovaCenaZaokrouhlena - invoice['celkem']) * 100) / 100;

    //Sleva
    var slevaEl = document.querySelector('.discount-price-with-decimals') || null;
    if (slevaEl) {invoice['sleva'] = parseFloat(slevaEl.getAttribute('data-sale'));};

    //doprava
    invoice['doprava'] = document.querySelector('.shipping-price-with-decimals').getAttribute('data-shipping') / 100;

    //celekme s dani
    var celkemSDph = invoice['celkem'] + invoice['sleva']  - invoice['doprava'];

    //dan
    invoice['dan'] = Math.round(celkemSDph * params['dphzceny']) / 100;

    //celkem bez dane
    invoice['celkemBezDph'] = celkemSDph - invoice['dan'];

    //Display
    document.querySelector('.invoiceCelkemBezDph').innerText = invoice['celkemBezDph'] + mena;
    document.querySelector('.invoiceDph').innerText = invoice['dan'] + mena;
    document.querySelector('.invoiceHalere').innerText = invoice['halere'] + mena;
    document.querySelector('.invoiceCelkem').innerText = invoice['celkem'] + mena;
  };

  return init;
})();



/////////////////////////////
// Inicializce vypoctu faktury
//
ShopifyCustomInvoice({
  dph: 0.21,
  dphzceny: 17.355,
  mena: "Kč"
});
////////////////////
