const express= require('express');
const app=express();
const port=3000;
const UserRoute=require("./routes/Users");
const EntreeRoute=require("./routes/Entrees");
const NomenclatureRoute=require("./routes/Nomenclatures");
const cors=require("cors");
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/Users", UserRoute);
app.use("/Entrees", EntreeRoute);
app.use("/Nomenclatures", NomenclatureRoute);
app.listen(port, () => {
  console.log(`app is listening in port ${port} `);
});
