import { app } from "./config/appliacation.js";
import { prismaClient } from "./config/database.js";

async function connectDatabase() {
  try {
    await prismaClient.$connect();
    console.log("Database connect");
  } catch (error) {
    console.log("Database Disconnect" + error);
  }
}

connectDatabase();

app.listen(3006, () => {
  console.log("Server Up And Running Port 3006");
});
