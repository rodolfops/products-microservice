var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const grpc_promise = require('grpc-promise');
const PROTO_PATH = __dirname + '/proto/discount.proto';
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
var discount_proto = grpc.loadPackageDefinition(packageDefinition);

var client = new discount_proto.DiscountService('localhost:6565', grpc.credentials.createInsecure());

grpc_promise.promisifyAll(client);

module.exports = client;