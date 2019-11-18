const Product = require('../models/Product');
const grpc = require('../client');
const ProductDTO = require('../dataacessobjects/ProductDTO')

// This should work both there and elsewhere.
function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

module.exports = {
    async store(req, res) {
        const { price_in_cents, title, description } = req.body;
        
        let product = await Product.findOne({ title });
    
        if(!product) {
            product = await Product.create({price_in_cents, title, description});
        }
    
        return res.json(product);
    },
    async get(req, res) {
        let products = await Product.find();
        let user = req.get('X-USER-ID');
        var discounts = [];
        for(var i = 0; i < products.length; i++) {
            
            var request = { product: products[i]._id, user: user };
            var discountResponse = { pct: 0.0, valueInCents: 0 };
            
            let call = await grpc.calculateDiscount()
            .sendMessage(request)
            .then(res => {
                if(isEmptyObject(res)){
                    discounts.push(discountResponse)
                } else {
                    discounts.push(res)
                }
            })
            .catch(err => discounts.push(discountResponse));
        }

        var dtos = []
        for(var i = 0; i < discounts.length; i++) {
            dtos.push(new ProductDTO(products[i]._id, products[i].price_in_cents, products[i].title,
                products[i].description, discounts[i].pct, discounts[i].valueInCents))
        }
        return res.json(dtos);                
    }
};
