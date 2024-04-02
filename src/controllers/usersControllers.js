import passport from "passport";



export const home = async (req, res) =>{
    res.render('home')
}
export const chat = async (req, res) =>{
    res.render('chat')
}
export const login = async (req, res) =>{
    res.render('login')
}
export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send('Failed Logout');
        } else {
            res.redirect('/login'); 
        }
    });
}
export const register = async (req, res) =>{
    res.render('register')
}
export const failLogin = async (req, res) =>{
    res.send({error:"Failed login Strategy"})
}

export const failedregister = async (req, res) =>{
    res.send({error:"Failed Strategy"})
}
export const registerOk =  async (req, res)=>{
    res.redirect('/login')
}

export const logindb = async (req,res,next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).send({ status: "error", error: "Invalid credentials" });
            }
            req.login(user, async (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }
                req.session.user = {
                    email: user.email,
                    name: user.first_name,
                    age: user.age,
                    lastname: user.last_name,
                };
                return res.redirect('/productos')
                // return res.send({ status: "success", message: "Login successful" });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}
