const express= require('express');
const Tasks= require('../models/task');
const auth= require('../middleware/auth');

const router= express.Router();

router.post('/tasks', auth, async (req,res)=>{
    const task= new Tasks({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', auth, async (req,res)=>{

    try {
        const tasks= await Tasks.find({owner: req.user._id});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/tasks/:id', auth, async (req,res)=>{

    const _id= req.params.id;

    try {
        // const task = await Tasks.findById(_id);
        const task= await Tasks.findOne({_id, owner: req.user._id});

        if(!task)
        {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/tasks/:id', auth, async (req,res)=>{

    const updates= Object.keys(req.body);
    const allowed= ['description', 'completed'];
    const valid= updates.every((update)=>{
        return allowed.includes(update);
    })

    if(!valid)
    {
        res.status(400).send('Invalid update');
    }

    try {

        // const task= Tasks.findById(req.params.id);
        const task= await Tasks.find({_id: req.params.id, owner: req.user._id });
        
        //const task= await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!task)
        {
            res.status(404).send();
        }

        updates.forEach((update)=>{
            task[update]= req.body[update];
        });
        await task.save();

        res.send(task);
    } catch (error) {
        res.status(400).send();
    }
});

router.delete('/tasks/:id', auth, async (req,res)=>{

    try {
        // const task= await Tasks.findByIdAndDelete(req.params.id);
        
        const task= await Tasks.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task)
        {
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports= router;