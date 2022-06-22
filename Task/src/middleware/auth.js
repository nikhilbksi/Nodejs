const jwt= require('jsonwebtoken');
const Users= require('../models/user');

const auth= async (req, res, next)=> {
    try {
        const token= req.header('Authorization').replace('Bearer ','');
        const decoded= jwt.verify(token, 'nodecourse');
        const user= await Users.findOne({ _id: decoded._id, 'tokens.token': token});
        //finds the encoded id in the token and checks whether the token is valid(present in the database in tokens array)

        if(!user)
        {
            throw new Error();
        }

        req.token= token;
        req.user= user;     //to pass the reqd user to the router, s.t., it doesn't try to search the user again
        next();

    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.'});
    }
}

module.exports= auth;