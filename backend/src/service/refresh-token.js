import { prismaClient } from "../config/database.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await prismaClient.user.findUnique({
    where: {
      token: refreshToken
    }
  });

  if (!user) return res.sendStatus(403);

  const ACCES_TOKEN_SECRET =
    "chjebcahecaniacot382659482f20fnajc381ybchiabe7282432563y86209878656534798ryy942rjp";
  const REFRESH_TOKEN_SECRET =
    "cwpjcpvmvnmmmakchaicfeq8e7u90i029t2gmwmfnqf298133245354657689y5e2332047ty34rjfn2fh";

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const usernamee = user.username;
    const accessToken = jwt.sign({ usernamee }, ACCES_TOKEN_SECRET, {
      expiresIn: "15s"
    });
    res.json({ accessToken });
  });
};

export default refreshToken;
