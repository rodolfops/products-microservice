const Product = require('../models/Product');

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

        return res.json({
            "user": req.get('X-USER-ID'),
            "products": products
        });                
    }
};