var shopify = {
  shop: {
    name: "Shopify-invoice-test.cz",
    email: "info@Shopify-invoice-test.cz",
    domain: "www.shopify-invoice-test.cz.cz",
    address: "Dlouhá 22",
    city: "Brno",
    zip: "745 45",
    country: "Czech Republic"
  },
  billing_address: {
    name: "Jan Dlouhý",
    company: "Acme",
    street: "Dlouhá 22",
    zip: "789 89",
    province_code: "CZ",
    city: "Ostrava",
    country: "Czech Republic"
  },
  order_number: 10001,
  gateway: "Platba Převodem",
  transaction: {
    date: function(){ return new Date().toJSON().slice(0,10) }
  },
  line_items: {
    0: {
      title: "Toustovač",
      quantity: 1,
      price: 1500,
    },
    1: {
      title: "Roh jednorožce",
      quantity: 2,
      price: 5000,
    }
  },
  discounts: {
    0: {
      code: 123456,
      savings: 150
    }
  },
  total_price: 6350
};



module.exports.shopify = shopify;
