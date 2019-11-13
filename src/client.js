var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + '/proto/discount.proto';
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
var discount_proto = grpc.loadPackageDefinition(packageDefinition);

var client = new discount_proto.DiscountService('localhost:6565', grpc.credentials.createInsecure());
// module.exports = client;
var calculateDiscount = function(product, user, callback) {
    console.log("3Product {} and user {}",product, user);
    var request = { product: product, user: user };
    return client.calculateDiscount(request, callback);
};


module.exports.discount = function(product, user, callback) {
    console.log("2Product {} and user {}",product, user);
    return calculateDiscount(product,user, callback);
};