const IDs=[
       //commande
        '1KEtktsb0n8ZspuxitPk-8kX1S5OJ6AcJmnlbywh-s98'
    ,
    //reception
        '1CkIm8C3xJloKITIqfm-LsfqMpiZSSrGk1TVG6tzI1_w'
    ,
    //decharge
        '16OHtJBVOxUOwHddI7cUglv3PpWtwTXJjnoM8DyaFTg4'
    ,
    //sortie
       '13xYjLr6AL7tSYzr-weRHfH6JnWqLspYZv-HgfAGT8_E'
    ,
    //fiche
        '1nIexOErp8aW2vX9NjO40UQGF5Aif6BZORVUQqVIbrss'
    ,
   //registre
        '1asTIrZrT9BYmoUXjRaNxh_ej_1YgwCp5mWJAJWdmXDs'
    ,
];
const googleMiddleware=require('../Middlewares/googleMiddleware')
async function changeHeader(filePath)
{
     let imgUrl= await googleMiddleware.uploadImageToDrive(filePath,'header')
    for(id of IDs)
        {
           await googleMiddleware.insertImageURLInSheet(id,imgUrl)
        }
}
module.exports={changeHeader}