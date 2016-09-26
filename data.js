var shopify = {
  shop: {
    name: "Shopify-invoice-test.cz",
    email: "info@Shopify-invoice-test.cz",
    domain: "www.shopify-invoice-test.cz",
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
  shipping_address: true,
  order_number: 10001,
  gateway: "Platba Převodem",
  transaction: {
    date: function(){ return new Date().toJSON().slice(0,10) }
  },
  shipping_price: 0,
  line_items: {
    0: {
      title: "Kufr",
      quantity: 1,
      price: 156000,
    }
  },
  // discounts: {
  //   0: {
  //     code: 123456,
  //     savings: 50
  //   }
  // },
  total_price: 156000
};



module.exports.shopify = shopify;
