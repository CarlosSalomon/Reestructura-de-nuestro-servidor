import { Router } from "express";
import { __dirname } from "../utils.js";
import { requireAuth } from "../config/authMiddleware.js"
import express from 'express';
import path from 'path';
import passport from "passport";
import {logindb,registerOk} from '../controllers/usersControllers.js'
import { addToCart, deleteCart, emptyCart } from "../controllers/cartsControllers.js";
import { logout} from '../controllers/usersControllers.js'


const router = Router()

// Middleware para pasar el objeto user a las vistas
const setUserInLocals = (req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
};

// Usar el middleware en todas las rutas
router.use(setUserInLocals);

router.use('/productos', express.static(path.join(__dirname, 'public')));


router.post('/register', passport.authenticate('register',{failureRedirect:'/failedregister'}),registerOk)
router.post('/login', logindb );
router.delete('/empty-cart', requireAuth, emptyCart);
router.delete('/delete-to-cart', requireAuth, deleteCart);
router.post('/add-to-cart', requireAuth, addToCart);
router.post('/logout', logout)
export default router