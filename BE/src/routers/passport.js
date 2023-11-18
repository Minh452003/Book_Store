import express from 'express';
import passport from 'passport';
import '../controllers/passport.js'
import { LoginWithFacebook, LoginWithGoogle, LogoutGoogle } from '../controllers/passport.js';
const routerPassport = express.Router();

routerPassport.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));
routerPassport.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: `http://localhost:8080/api/google/success`,
        failureRedirect: `http://localhost:4200/signin`
    }));
routerPassport.use('/auth/logout', LogoutGoogle);
routerPassport.use('/google/success', LoginWithGoogle);
// 
routerPassport.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
routerPassport.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:4200/signin' }), LoginWithFacebook);
export default routerPassport;
