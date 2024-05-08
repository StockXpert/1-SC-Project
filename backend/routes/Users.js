const express=require('express');
const router=express.Router();
const UserController=require('../Controller/UserController');
const authMiddleware=require('../Middlewares/authMiddleware');
const swaggerjsdoc=require('swagger-jsdoc');
const swaggerui=require("swagger-ui-express")
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     description: Connectez-vous avec les informations d'identification de l'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *     responses:
 *       '200':
 *         description: Connexion réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message de confirmation de la connexion.
 *                 jwt:
 *                   type: string
 *                   description: Jeton JWT pour l'authentification.
 *       '404':
 *         description: Erreur de connexion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.post("/login",UserController.login)
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     description: Enregistrez un nouvel utilisateur avec son adresse e-mail, son rôle et son mot de passe.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur.
 *               role:
 *                 type: string
 *                 description: Le rôle de l'utilisateur (Consommateur, RD, DG, etc.).
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *               nom:
 *                 type: string
 *                 description: Le nom de l'utilisateur (uniquement pour RD ou DG).
 *               prenom:
 *                 type: string
 *                 description: Le prénom de l'utilisateur (uniquement pour RD ou DG).
 *               date_naissance:
 *                 type: string
 *                 format: date
 *                 description: La date de naissance de l'utilisateur.
 *               type:
 *                 type: string
 *                 description: Le type de consommateur (uniquement pour les consommateurs).
 *               structure:
 *                 type: string
 *                 description: La structure liée à l'utilisateur (uniquement pour les consommateurs).
 *     responses:
 *       '200':
 *         description: Utilisateur enregistré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message de confirmation de l'enregistrement.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.post("/register",authMiddleware('register'),UserController.register);
/**
 * @swagger
 * /users/showUsers:
 *   get:
 *     summary: Afficher tous les utilisateurs
 *     description: Récupère tous les utilisateurs enregistrés dans le système.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Liste des utilisateurs récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Définissez ici la structure de chaque utilisateur dans la réponse.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.get("/showUsers",authMiddleware('show users'),UserController.showUsers)
/**
 * @swagger
 * /users/showUser:
 *   get:
 *     summary: Afficher un utilisateur
 *     description: Récupère les informations d'un utilisateur spécifique.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Utilisateur récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   // Définissez ici la structure des informations de l'utilisateur.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.get("/showUser",authMiddleware('show user'),UserController.showUser);
/**
 * @swagger
 * /users/forgotPassword:
 *   post:
 *     summary: Mot de passe oublié
 *     description: Envoie un code de réinitialisation de mot de passe à l'e-mail spécifié.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur.
 *     responses:
 *       '200':
 *         description: E-mail de réinitialisation envoyé avec succès.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.post("/forgotPassword", UserController.forgotPassword);

/**
 * @swagger
 * /users/changePasswordMail:
 *   post:
 *     summary: Changer le mot de passe à partir du mail
 *     description: Change le mot de passe de l'utilisateur à partir du code de réinitialisation reçu par e-mail.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur.
 *               code:
 *                 type: string
 *                 description: Le code de réinitialisation reçu par e-mail.
 *               newPassword:
 *                 type: string
 *                 description: Le nouveau mot de passe de l'utilisateur.
 *     responses:
 *       '200':
 *         description: Mot de passe changé avec succès.
 *       '400':
 *         description: Code invalide ou attribut manquant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.post("/changePasswordMail", UserController.changePasswordMail);

/**
 * @swagger
 * /users/changePasswordAuth:
 *   post:
 *     summary: Changer le mot de passe avec authentification
 *     description: Change le mot de passe de l'utilisateur en cours d'authentification.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Le nouveau mot de passe de l'utilisateur.
 *     responses:
 *       '200':
 *         description: Mot de passe changé avec succès.
 *       '400':
 *         description: Attribut manquant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.post("/changePasswordAuth", authMiddleware('change password auth'), UserController.changePasswordAuth);
/**
 * @swagger
 * /users/addStructure:
 *   post:
 *     summary: Ajouter une structure
 *     description: Ajoute une nouvelle structure avec la désignation spécifiée.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               designation:
 *                 type: string
 *                 description: La désignation de la structure.
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail associée à la structure.
 *     responses:
 *       '200':
 *         description: Structure ajoutée avec succès.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.post("/addStructure", authMiddleware('add structure'), UserController.addStructure);

/**
 * @swagger
 * /users/updateConsumerInformations:
 *   put:
 *     summary: Mettre à jour les informations du consommateur
 *     description: Met à jour les informations du consommateur spécifié.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             // Définissez ici les attributs nécessaires pour mettre à jour les informations du consommateur.
 *     responses:
 *       '200':
 *         description: Informations du consommateur mises à jour avec succès.
 *       '400':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.put("/updateUser", authMiddleware('update user'), UserController.updateUser);
/**
 * @swagger
 * /users/deleteUser:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime l'utilisateur avec l'adresse e-mail spécifiée.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur à supprimer.
 *     responses:
 *       '200':
 *         description: Utilisateur supprimé avec succès.
 *       '400':
 *         description: Impossible de supprimer l'administrateur connecté.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.delete("/deleteUser", authMiddleware('delete user'), UserController.deleteUser);


/**
 * @swagger
 * /users/rattacher:
 *   put:
 *     summary: Rattacher un utilisateur à une structure
 *     description: Rattache l'utilisateur spécifié à la structure spécifiée.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur à rattacher.
 *               structure:
 *                 type: string
 *                 description: La structure à laquelle rattacher l'utilisateur.
 *     responses:
 *       '200':
 *         description: Utilisateur rattaché avec succès à la structure.
 *       '400':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.put("/rattacher", authMiddleware('rattacher'), UserController.rattacher);
/**
 * @swagger
 * /users/showStructure:
 *   get:
 *     summary: Afficher les structures
 *     description: Récupère la liste de toutes les structures.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Liste des structures récupérée avec succès.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.get('/showStructure', authMiddleware('show structure'), UserController.showStructure);

/**
 * @swagger
 * /users/showResp:
 *   get:
 *     summary: Afficher les responsables
 *     description: Récupère la liste de tous les responsables.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Liste des responsables récupérée avec succès.
 *       '500':
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Message d'erreur.
 */
router.post('/changeStatus',authMiddleware('change status'),UserController.changeStatus)
router.post('/addRole',authMiddleware('add role'),UserController.addRole)
router.get('/showRoles',authMiddleware('show roles'),UserController.showRoles)
router.get('/showPermissions',authMiddleware('show permissions'),UserController.showPermissions)
router.delete('/deleteRole',authMiddleware('delete role'),UserController.deleteRole)
router.put('/addPermissions',authMiddleware('add permissions'),UserController.addPermissions);
router.delete('/deletePermissions',authMiddleware('delete permissions'),UserController.deletePermissions)
router.put('/updateStructure',authMiddleware('update structure'),UserController.updateStructure)
router.delete('/deleteStructure',authMiddleware('delete structure'),UserController.deleteStructure)
router.post('/saveToken',authMiddleware('save token'),UserController.saveToken)
module.exports=router;