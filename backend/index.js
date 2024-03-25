const express= require('express');
const app=express();
const swaggerjsdoc=require('swagger-jsdoc');
const swaggerui=require('swagger-ui-express');
const port=3000;
const UserRoute=require("./routes/Users");
const EntreeRoute=require("./routes/Entrees");
const NomenclatureRoute=require("./routes/Nomenclatures");
const path=require('path')
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use("/Users", UserRoute);
app.use("/Entrees", EntreeRoute);
app.use("/Nomenclatures", NomenclatureRoute);
app.use('/bonCommande', express.static(path.join(__dirname,'bonCommande')));
const options={
  definition:{
    openapi:"3.1.0",
    info:{
      title:"stockXpert api",
      version:"0.1"
    },
    servers:[
    {
       url:"http://localhost:3000/"
    }
  ]
  },
  apis:["./routes/Users.js"]
}
const spacs=swaggerjsdoc(options)
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))
app.listen(port, () => {
  console.log(`app is listening in port ${port}`);
});
