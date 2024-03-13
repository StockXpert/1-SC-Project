const jwt = require('jsonwebtoken');
require('dotenv').config();
function verifyToken(req, res, next) {
const token = req.header('Authorization');
const SecretKey=process.env.KEY;
console.log({token})
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token,SecretKey);
 const expirationDate=new Date(decoded.exp*1000);
 const currentTime=new Date();
 const timeDifference=expirationDate.getTime()-currentTime.getTime();
 if(timeDifference<30*60*1000)
 {
    const newToken=jwt.sign({email:decoded.email,role:decoded.role},SecretKey,{expiresIn:'30m'});
    res.setHeader('Authorization',newToken);
 }
 req.email = decoded.email;
 req.role=decoded.role;
 path=req.path;
 console.log({path})
 switch (path) {
    case '/register':if(req.role!="Admin")
                          return res.status(401).json({ error: 'Access denied' });
        break;
    case '/showUsers':if(req.role!="Admin")
                          return res.status(401).json({ error: 'Access denied' });
        break;
    case '/updateInformations':if(req.role!="Admin")
                                  return res.status(401).json({ error: 'Access denied' });
        break;                                                                     
    case '/updateMyInformations':if(req.role!="Admin")
                                  return res.status(401).json({ error: 'Access denied' });
         break;
    case '/deleteUser':if(req.role!="Admin")
                          return res.status(401).json({ error: 'Access denied' });
    case '/addStructure':if(req.role!="Admin")
                          return res.status(401).json({ error: 'Access denied' });
    case '/showconsumers':if(req.role!="Admin")
                          return res.status(401).json({ error: 'Access denied' });     
    case '/rattacher':if(req.role!="Admin")
                      return res.status(401).json({ error: 'Access denied' });   
    case '/responsable':if(req.role!="Admin")
                        return res.status(401).json({ error: 'Access denied' });
    case '/showStructure':if(req.role!="Admin")
                          return res.status(401).json({ error: 'Access denied' });                                                                           
                                                                                                    
    default:
        break;
    case '/ficheBesoins':if(req.role!="Magasinier")
                           return res.status(401).json({error:'Access denied'});
                           break;

 }
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;