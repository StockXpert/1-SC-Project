const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel=require('../Models/UserModel')
// Middleware pour vérifier les droits d'accès
function verifyToken(permission) {
  return async function(req, res, next) {
      const token = req.header('Authorization');
      const SecretKey = process.env.KEY;
    
      if (!token) return res.status(401).json({ error: 'Access denied' });
      try {
          const decoded = jwt.verify(token, SecretKey);
          const expirationDate = new Date(decoded.exp * 1000);
          const currentTime = new Date();
          const timeDifference = expirationDate.getTime() - currentTime.getTime();
          if (timeDifference < 24* 60 * 60 * 1000) {
              const newToken = jwt.sign(
                  { email: decoded.email, role: decoded.role },
                  SecretKey,
                  { expiresIn: '24h' }
              );
              res.setHeader('Authorization', newToken);
          }
  
          req.email = decoded.email;
          req.role = decoded.role;
          console.log(req.role)
          checkPermission(permission,req.role).then(()=>{
            next()
          }).catch((error)=>{
            if(error==='denied')
               return res.status(403).json({ error: "Accès refusé" });
            else 
               return res.status(500).json({ error: "internal error" });  
          })
      } catch (error) {
          res.status(401).json({ error: 'Invalid token' });
      }
  }
}
function checkPermission(permission,role)
{
  return new Promise((resolve,reject)=>{
    userModel.getRolePermissons(role).then((permissions)=>{
      const estInclus = permissions.some(objet => objet.designation === permission);
      console.log({permissions})
      console.log({permission})
      console.log({estInclus})
      if(estInclus)
         resolve('est inclus')
      else reject('denied')  
    }).catch(()=>{
      reject('internal error')
    })
  })
  
}
module.exports = verifyToken;
