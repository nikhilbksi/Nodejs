const express= require('express');
const Users= require('../models/user');
const auth= require('../middleware/auth');

const router= express.Router();

// post/create
router.post('/users', async (req,res)=>{
    const user= new Users(req.body);

    try{                                    //error is catched if await promise isn't executed properly
        await user.save();
        const token= await user.generateToken();

        res.status(201).send({user, token});
    }catch(error){
        res.status(400).send(error);
    }
});

// login
router.post('/users/login', async (req,res)=>{

    try {
        const user= await Users.findByCredentials(req.body.email, req.body.password);   //static method for module
        const token =await user.generateToken();                                        //instance method
        res.send({ user, token});
    } catch (error) {
        res.status(400).send();
    }
});
router.post('/users/logout', auth, async (req, res)=> {
    try {
        req.user.tokens= req.user.tokens.filter((token)=> token.token !== req.token );
        await req.user.save();

        res.send('Logged out');

    } catch (error) {
        res.status(500).send();
    }
});
router.post('/users/logoutall', auth, async (req, res)=> {
    try {
        req.user.tokens= [];
        await req.user.save();

        res.send('Logged out of all sessions');
    } catch (error) {
        res.status(500).send();
    }
});

// get/read

//should not be used as privacy is compromised
// router.get('/users', auth, async (req,res)=>{       //first implements express middleware(auth) then executes router(after next() )
//     try {
//         const users= await Users.find({});
//         res.send(users);
//     } catch (e) {
//         res.status(500).send(e);
//     }
    
// });

//route to get authenticated profile details
router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user);
});

// router.get('/users/:id', async (req,res)=>{          // '/:id' is a route parameter- captures dynamic value 
    
//     const _id= req.params.id;
    
//     try {
//         const user= await Users.findById(_id);
//         if(!user)
//         {
//             return res.status(404).send();
//         }
//         res.send(user);

//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// update/patch
router.patch('/users/me', auth, async (req,res)=>{

    const updates= Object.keys(req.body);
    const allowed= ['name', 'email', 'password', 'age'];
    const valid= updates.every((update)=>{
        return allowed.includes(update);
    });

    if(!valid)
    {
        res.status(400).send('Error: Invalid Updates');
    }

    try {

        // const user= Users.findById(req.params.id);
        updates.forEach((update)=>{
            req.user[update]= req.body[update];
        });

        await req.user.save();  //makes sure that the middleware cosistently runs

        // const user= await Users.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        //new returns the updated value, runValidators ensures that all validators are followed
        //findByIDand.. bypasses mongoose, that's why we add the above options; it also bypasses any mongoose middleware
        
        // if(!user)
        // {
        //     res.status(404).send();
        // }

        res.send(req.user);

    } catch (error) {
        res.status(400).send();
    }
});

// delete
router.delete('/users/me', auth, async (req,res)=>{

    try {
        // const user= await Users.findByIdAndDelete(req.user._id);
        // if(!user)
        // {
        //     return res.status(404).send();
        // }

        await req.user.remove();

        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports= router;