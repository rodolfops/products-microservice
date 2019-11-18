const DiscountDTO = require("./DiscountDTO");

class ProductDTO {
  constructor(id, priceInCents, title, description, pct, valueInCents) {
    this.id = id;
    this.price_in_cents = priceInCents;
    this.title = title;
    this.description = description;
    this.discount = new DiscountDTO(pct, valueInCents);
  }
}

module.exports = ProductDTO;
