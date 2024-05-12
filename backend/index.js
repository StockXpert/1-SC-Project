const express= require('express');
const app=express();
const port=3000;
const UserRoute=require("./routes/Users");
const EntreeRoute=require("./routes/Entrees");
const NomenclatureRoute=require("./routes/Nomenclatures");
const SortieRoute=require("./routes/Sorties");
const InventaireRoute=require("./routes/Inventaire")
const StatistiqueRoute=require("./routes/Statistiques")
const path=require('path')
const cors=require("cors");
app.use(cors());
app.use(express.json({limit:'10mb'}));
app.use("/Users", UserRoute);
app.use("/Entrees", EntreeRoute);
app.use("/Nomenclatures", NomenclatureRoute);
app.use("/Sorties", SortieRoute);
app.use("/Inventaire", InventaireRoute);
app.use("/Statistique", StatistiqueRoute);
app.use('/bonCommande', express.static(path.join(__dirname,'bonCommande')));
app.use('/bonReception', express.static(path.join(__dirname,'bonReception')));
app.use('/bonLivraison', express.static(path.join(__dirname,'bonLivraison')));
app.use('/Facture', express.static(path.join(__dirname,'Facture')));
app.use('/sortie', express.static(path.join(__dirname,'sorite')));
app.listen(port, () => {
  console.log(`app is listening in port ${port}`);
});
