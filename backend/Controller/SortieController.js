const SortieService=require('../Services/SortieService')
const SortieModel=require('../Models/SortieModel');
const { response } = require('express');
const { isErrored } = require('nodemailer/lib/xoauth2');
const { google } = require('googleapis');
const { updateCel } = require('../Middlewares/googleMiddleware');
function demandeFourniture(req,res){
const {produits,dateDemande,exterieur}=req.body;
const {email}=req
SortieModel.addFourniture(email,dateDemande,exterieur).then((numDemande)=>{
    SortieModel.insertFournir(numDemande,produits).then(()=>{
        res.status(200).json({response:'demande added'})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}).catch(()=>{res.status(500).json({response:'internal error'})})
}
function fournitureRespApp(req,res){
    const {produits,numDemande}=req.body
    SortieModel.updateAccordedQuantite(numDemande,produits).then(()=>{
        SortieModel.changeDemandeStatNotif(numDemande,'visee par resp','other_notif').then(()=>{
            res.status(200).json({response:'resp approuved'})
        }).catch(()=>{res.status(500).json({response:'internal error'})})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function fournitureDirApp(req,res){
    const {produits,numDemande}=req.body;
    SortieModel.updateAccordedQuantite(numDemande,produits).then(()=>{
        SortieModel.changeDemandeStatNotif(numDemande,'visee par dg','other_notif').then(()=>{
            res.status(200).json({response:'Dir approuved'})
        }).catch(()=>{res.status(500).json({response:'internal error'})})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function fournitureMagApp(req,res){
    const {produits,numDemande}=req.body;
    SortieModel.updateLivredQuantite(numDemande,produits).then(()=>{
        SortieModel.changeDemandeStatNotif(numDemande,'pret','other_notif').then(()=>{
            res.status(200).json({response:'Mag approuved'})
        }).catch(()=>{res.status(500).json({response:'internal error'})})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function livrer(req,res)
{
    const {numDemande,dateSortie,numDecharge,dateDecharge,products}=req.body;
    SortieModel.getDemandeProducts(numDemande).then((produits)=>{
        SortieService.subtituteQuantite(produits).then(()=>{
            SortieModel.changeDemandeStatNotif(numDemande,'servie','cons_notif').then(()=>{
                SortieModel.isExterior(numDemande).then((exterior)=>{
                    if(exterior)
                    {
                        SortieService.addDecharge('16OHtJBVOxUOwHddI7cUglv3PpWtwTXJjnoM8DyaFTg4',products,numDecharge,dateDecharge,numDecharge).then(()=>{
                            res.status(200).json({response:'gererated'})
                        }).catch(()=>{res.status(500).json({response:'internal error'})})
                    }
                    else
                    {
                        SortieService.genererBonSortie(numDemande,dateSortie,produits,'13xYjLr6AL7tSYzr-weRHfH6JnWqLspYZv-HgfAGT8_E').then((link)=>{
                            res.status(200).json({response:link})
                        }).catch(()=>{res.status(500).json({response:'internal error'})})
                    }
                }).catch(()=>{res.status(500).json({response:'internal error'})})
            }).catch(()=>{res.status(500).json({response:'internal error'})})
        }).catch(()=>{res.status(500).json({response:'internal error'})})
    }).catch(()=>{res.status(500).json({response:'internal error'})})
}
function deleteFourniture(req,res)
{
    const {numDemande}=req.body;
    SortieModel.canDeleteFourniture(numDemande).then(()=>{
        SortieModel.deleteFourniture(numDemande).then(()=>{
            res.status(200).json({response:"deleted"})
        }).catch(()=>res.status(500).json({response:"internal error"}))
    }).catch(()=>res.status(400).json({response:"prohibited to delete"}))
}
function showAllDemandes(req,res)
{
    const {role,email}=req;
    let statement;
    let etat=''
    switch (role) {
        case 'Magasinier':
            statement="etat in ('visee par dg','pret','servie') or id_demandeur=?"
            break;
        case 'Directeur':
            statement=`etat in ('visee par resp','visee par dg','pret','servie') or (etat='demande' and
            id_demandeur in
        (select email from utilisateur where id_structure=
         (select id_structure from structure where id_resp=?) or id_role=
        (select id_role from role where designation='Magasinier')))`
            etat="en attente"
            break;
        case 'Responsable directe':
            etat='en attente';statement=''    ;
            break;
        default:
            statement=''
            break;
    }
    SortieModel.getAllDemandes(etat,statement,email,role).then((demandes)=>{
        res.status(200).json({response:demandes})
    }).catch((err)=>{console.log(err);res.status(500).json({response:err})})
}
function showNewDemandes(req,res)
{
    const {role,email}=req;
    let etat;
    switch (role) {
        case 'consommateur':
            etat='pret'
        case 'magasinier':
            etat='visee par dir'
            break;
        case 'directeur':
            etat='visee par resp' 
        default:
            etat='demande'
            break;
    }
    SortieModel.getNewDemandes(role,etat,email,role==='consommateur'?'cons_notif':'other_notif').then((demandes)=>{
        res.status(200).json({response:demandes})
    }).catch(()=>res.status(500).json({response:"internal error"}))
}
function updateConsDemande(req,res)
{
    const {numDemande,addedProducts,deletedProducts}=req.body
    SortieModel.canDeleteFourniture(numDemande).then(()=>{
        SortieModel.insertFournir(numDemande,addedProducts).then(()=>{
            SortieModel.deleteProductsFournir(numDemande,deletedProducts).then(()=>{
                res.status(200).json({response:"updated"})
            }).catch(()=>res.status(500).json({response:"internal error"}))
        }).catch(()=>res.status(500).json({response:"internal error"}))
    }).catch(()=>res.status(400).json({response:"prohibited"}))
}
function updateMagApp(req,res)
{
    const {role}=req;
    const {numDemande,produits}=req.body;
    SortieService.canUpdate(numDemande,role).then(()=>{
        SortieModel.updateLivredQuantite(numDemande,produits).then(()=>{
            res.status(200).json({response:"updated"})
        }).catch(()=>res.status(500).json({response:"internal error"}))
    }).catch(()=>res.status(400).json({response:"prohibited"})) 
}
function updateRespDirApp(req,res)
{
    const {role}=req;
    const {numDemande,produits}=req.body;
    SortieService.canUpdate(numDemande,role).then(()=>{
        SortieModel.updateAccordedQuantite(numDemande,produits).then(()=>{
            res.status(200).json({response:"updated"})
        }).catch(()=>res.status(500).json({response:"internal error"}))
    }).catch(()=>res.status(400).json({response:"prohibited"})) 
}
function readNotif(req,res)
{
    const {role}=req;
    const {numDemande}=req.body;
    SortieModel.readNotif(numDemande,role==='Consommateur'?'cons_notif':'other_notif').then(()=>{
        res.status(200).json({response:"read"})
    }).catch(()=>res.status(500).json({response:"internal error"}))
}
function readAllNotif(req,res)
{
    const {role,email}=req;
    let etat;
    switch (role) {
        case 'consommateur':
            etat='pret'
        case 'magasinier':
            etat='visee par dir'
            break;
        case 'directeur':
            etat='visee par resp' 
        default:
            etat='demande'
            break;
    }
    let numDemandes=[]
    SortieModel.getNewDemandes(role,etat,email,role==='Consommateur'?'cons_notif':'other_notif').then((demandes)=>{
        for(let demande of demandes)
        {
          numDemandes.push(demande.num_demande)
        }
        console.log({numDemandes})
        SortieModel.readAllNotif(role==="Consommateur"?"cons_notif":"other_notif",numDemandes).then(()=>{
            res.status(200).json({response:'read'})
        }).catch(()=>res.status(500).json({response:"internal error"}))
    }).catch(()=>res.status(500).json({response:"internal error"}))
}
function showDemande(req,res)
{
    const {numDemande}=req.body;
    const {role}=req;
    let quantiteType;
    if(role==="Consommateur")
       quantiteType="f.quantite_demande,f.quantite_servie"
    else if (role==="Magasinier")
       quantiteType="f.quantite_servie,f.quantite_accorde";
    else if(role==="Directeur")
       quantiteType="f.quantite_demande,f.quantite_accorde,f.quantite_servie"
    else  
       quantiteType="f.quantite_demande,f.quantite_accorde"
    SortieModel.getDemande(numDemande,role,quantiteType).then((demande)=>{
        res.status(200).json({demande})
    }).catch(()=>{res.status(500).json({response:"internal error"})})
}
module.exports={demandeFourniture,fournitureDirApp,fournitureRespApp,fournitureMagApp,livrer,
deleteFourniture,showNewDemandes,showAllDemandes,updateConsDemande,updateRespDirApp,updateMagApp,
readNotif,readAllNotif,showDemande}