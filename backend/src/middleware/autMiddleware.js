import jwt from "jsonwebtoken";
// import ResponseError from "../error/responseError.js";

export const authTokenUser = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.replace("Bearer ", "");
  const ACCES_TOKEN_SECRET =
    "chjebcahecaniacot382659482f20fnajc381ybchiabe7282432563y86209878656534798ryy942rjp";
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, ACCES_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.username = user.username;
    next();
  });
};

// Cara 2

// export const authTokenUser = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization
//       ? req.headers.replace("Bearer ", "")
//       : null;
//     const ACCES_TOKEN_SECRET =
//       "chjebcahecaniacot382659482f20fnajc381ybchiabe7282432563y86209878656534798ryy942rjp";
//     jwt.verify(token, ACCES_TOKEN_SECRET, (data) => {
//       req.username = data.username;
//     });
//   } catch (error) {
//     res.status(401).json({
//       error: "Not Authorized To Access This Resource"
//     });
//   }
// };
