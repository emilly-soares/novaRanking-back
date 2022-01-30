const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");


mongoose.connect("mongodb+srv://emilly:emilly@mycluster.m5zvm.mongodb.net/novaRankingDB?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
});

/*
mongoose.connect("mongodb://localhost:27017/novaranking", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
});
*/
mongoose.set("useCreateIndex", true);

module.exports = mongoose;

const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);


server.listen(3333);
