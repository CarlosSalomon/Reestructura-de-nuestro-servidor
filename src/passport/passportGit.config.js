import passport from "passport";
import github from "passport-github2";
import { getUsers } from "../service/userService.js"
import { userModel } from "../models/user.model.js";
import { createCart } from "../service/cartService.js"
import dotenv from  'dotenv';

dotenv.config();


export const initPassportGit = () => {
    passport.use("github", new github.Strategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET, 
            callbackURL: process.env.CALLBACK_GITHUB,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let { name, email } = profile._json;
                if (email === null) {
                    const emailgit = profile.id + profile.username + "@users.noreply.github.com"
                    const newCart = await createCart()
                    let user = await getUsers(emailgit);
                    user = await userModel.create({ username: emailgit, name: name, email: emailgit, cartId: newCart._id });
                    return done(null, user)
                } else {
                    let user = await getUsers(email);
                    if (!user) {
                        const newCart = await createCart()
                        user = await userModel.create({ username: email, name: name, email: email, cartId: newCart._id });
                    }
                    return done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user)
}); 

passport.deserializeUser((user, done) => {
    done(null, user)
})

