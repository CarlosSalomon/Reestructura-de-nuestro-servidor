
import { getUsers } from "../service/userService.js"



export const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

export const isAdmin = async (req, res, next) => {
    const userlog = req.session.user
    const user = await getUsers(userlog.email);
    console.log( user)
    if (req.session && req.session.user && user.admin === true ) {
        next(); 
    } else {
        res.status(403).send('Acceso denegado. Solo users Admin acceden a esta página.');
    }
};

export const setUserInLocals = async (req, res, next) => {
    if (req.session.user) {
        const userlog = req.session.user;
        const user = await getUsers(userlog.email);
        
        if (user) {
            const { admin, name, rol, email, first_name } = user;
            res.locals.user = {
                admin: admin || null,
                name: name || null,
                rol: rol || null,
                email: email || null,
                first_name: first_name || null
            };
        } else {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
};