const Product = require('../models/Product');
const grpc = require('../client');
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
            console.log("1Product {} and user {}",products[i]._id, user);
            grpc.discount(products[i]._id, user, function(erro, result) {
                console.log("dto: ",result);
                discounts.push(result);

            });
        }
        return res.json({
            "discounts": discounts
        });                
    }
};