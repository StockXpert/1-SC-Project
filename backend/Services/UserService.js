const { get } = require('http');
const userModel=require('../Models/UserModel');
const crypto=require('crypto');
const { response } = require('express');
const { resolve } = require('path');
const { rejects } = require('assert');
const { error } = require('console');
async function createUser(email,role, password) {
    try {
        // Vérification de l'existence de l'utilisateur
        let result = await userModel.verifyUser(email);
        console.log(result)
        if (result === "request error") {
            return "internal error";
        } else if (result === "email unavailable") {
            return result;
        }

        // Insertion de l'utilisateur
        console.log("before insert user")
        result = await userModel.insertUser(email, role, password);
        console.log("after insert result ")
        return result;
    } catch (error) {
    
        console.log(error)
        return "internal error";
    }
}
async function verifyUser(email)
{
    let result=await userModel.verifyUser(email)
    if (result === "request error") {
        return "internal error";
    } else if (result === "email available") {
        return result;
    }
    console.log("avant getPass")
    return result=userModel.getPassword(email)
}
 async function createConsommateur(nom,prenom,date_naissance,structure,email,type)
{    return new Promise ((resolve,reject)=>{
       userModel.getStructurId(structure).then((structureId)=>
       {
        userModel.createConsommateur(email,nom,prenom,date_naissance,structureId,type).then((response)=>{
            resolve("consommateur created");
        }).catch((error)=>{
            reject("internal error");
        })
       }).catch((error)=>
       {
        reject("internal error");
       })
    })
}
function deleteUser(email)
{
    return new Promise ((resolve,reject)=>{
        userModel.getUser(email).then((response)=>{
            if(response.role==="Consommateur"){
               userModel.deletePerson(email,"Consommateur").then(()=>{
               userModel.deletePerson(email,"utilisateurs").then(()=>{
                resolve("user deleted");
               }).catch(()=>{
                reject("internal error");
               })
                }).catch(()=>{
                    reject("internal error");
                })}
            else if(response.role=="DG"||response.role=="RD")
            {
                userModel.deletePerson(email,"responsable").then(()=>{
                    userModel.deletePerson(email,"utilisateur").then(()=>{
                     resolve("user deleted");
                    }).catch(()=>{
                     reject("internal error");
                    })
                     }).catch(()=>{
                         reject("internal error");
                  })
            }    
            else userModel.deletePerson(email,"utilisateur").then(()=>{
                resolve("user deleted");
               }).catch(()=>{
                reject("internal error");
               })     
        })
    })
}
function updateConsumerInfos(email,nom,prenom,date_naissance,type,structure)
{
    return new Promise ((resolve,reject)=>{
        if(structure){
        userModel.getStructurId(structure).then((structureId)=>
        {
         userModel.updateInformations(email,nom,prenom,date_naissance,type,structureId,"consommateur").then(()=>{
            resolve("informations updated");
         }).catch(()=>{
            reject("internal error");
         })
        }).catch(()=>{
            reject("internal error");
        })}
        else {
            console.log("hi")
            userModel.updateInformations(email,nom,prenom,date_naissance,type,null,"consommateur").then(()=>{
                resolve("informations updated");
             }).catch((error)=>{
                console.log("hello")
                console.log(error);
                reject("internal error");
             })
        }
     })
}
function generateCode() {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
  }
function rattacher(structure,email)
{
    return new Promise((resolve,reject)=>{
        userModel.getStructurId(structure).then((structureId)=>{
            userModel.rattacher(structureId,email).then(()=>{
                resolve("user rattached");
            }).catch(()=>{
                reject('internal error');
            })
        }).catch(()=>{
            reject('internal error');
        })
    })
}  
function responsable(structure,email)
{
    return new Promise((resolve,reject)=>{
        userModel.getconsommateurId(email).then((consommateurId)=>{
            userModel.responsable(structure,consommateurId).then(()=>{
                resolve("responsable added");
            }).catch(()=>{
                reject("internal error");
            })
        }).catch(()=>{
            reject("internal error");
        })
    })
}
function createResponsable(nom,prenom,email,date_naissance)
{
    return new Promise((resolve,reject)=>{
        userModel.addResponsable(email,nom,prenom,date_naissance).then(()=>{
            resolve("user created");
        }).catch(()=>{
            reject("internal error");
        })
    })
}
module.exports={createUser,verifyUser,generateCode,createConsommateur,
    deleteUser,updateConsumerInfos,rattacher,responsable,createResponsable};