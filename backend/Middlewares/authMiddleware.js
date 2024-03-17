const jwt = require('jsonwebtoken');
require('dotenv').config();
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  const SecretKey = process.env.KEY;
  // console.log({token})
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, SecretKey);
    const expirationDate = new Date(decoded.exp * 1000);
    const currentTime = new Date();
    const timeDifference = expirationDate.getTime() - currentTime.getTime();
    if (timeDifference < 30 * 60 * 1000) {
      const newToken = jwt.sign(
        { email: decoded.email, role: decoded.role },
        SecretKey,
        { expiresIn: '30m' }
      );
      res.setHeader('Authorization', newToken);
    }
    req.email = decoded.email;
    req.role = decoded.role;
    path = req.path;
    // console.log({ path });
    // console.log({ role: req.role });
    switch (path) {
      case '/register':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/showUsers':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/updateInformations':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/updateMyInformations':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/deleteUser':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
      case '/addStructure':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
      case '/showconsumers':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
      case '/rattacher':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
      case '/responsable':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
      case '/showStructure':
        if (req.role != 'Admin')
          return res.status(401).json({ error: 'Access denied' });
      case '/ficheBesoins':
        if (req.role != 'Magasinier')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/addProduct':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/deleteProduct':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/addArticle':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/deleteArticle':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/addFournisseur':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/deleteFournisseur':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/showFournisseurs':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/showProducts':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/showArticles':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      case '/showChapters':
        if (req.role != 'Service achat')
          return res.status(401).json({ error: 'Access denied' });
        break;
      default:
        break;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;
