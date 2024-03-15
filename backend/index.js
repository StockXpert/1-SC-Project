const express = require("express");
const app = express();
const port = 3000;
const UserRoute = require("./routes/Users");
const EntreeRoute = require("./routes/Entrees");
const NomenclatureRoute = require("./routes/Nomenclatures");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/Users", UserRoute);
app.use("/Entrees", EntreeRoute);
app.use("/Nomenclatures", NomenclatureRoute);
app.listen(port, () => {
  console.log(`app is listening in port ${port} `);
});
