const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const authConfig = require("../config/auth");

module.exports = async (req, res, next) => {
   const authHeader = req.headers.authorization; //busca a autorização dentro da requisição
   //console.log('authHeader', authHeader)


   if (!authHeader) {
      return res.status(401).json({ error: "Token not provided." }); //erro na autorização
   }

   const [, token] = authHeader.split(" "); //separar o bearer do token e pegar a 2 parte

   try {

      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;
      return next();

   } catch (err) {
      return res.status(401).json({ error: "Token invalid" });
   }
};