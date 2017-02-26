var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://gautam:gautam@ds161029.mlab.com:61029/chatapp_userdb');

/*****Get all tasks***/
router.get('/tasks',function(req,res,next){
  db.tasks.find(function(err,tasks){

    if(err){
    	console.log('err');
    	res.send(err)
    }
    res.json(tasks);
  });
});


/*****Get single tasks***/
router.get('/task/:id',function(req,res,next){
  db.tasks.findOne({_id : mongojs.ObjectId(req.params.id)},function(err,task){

    if(err){
    	console.log('err');
    	res.send(err)
    }
    res.json(task);
  });
});

module.exports = router;

/********Post request***/
router.post('/task',function(req,res,next){
	
	var task = req.body;
	if(!task.title || !(task.isDone+'')){
		res.status(400);
		res.json({
			"error":"Bad data"
		});
	}
	else{
		db.tasks.save(task,function(err,task){
			if(err){
				res.send(err);
			}
			res.json(task);
		})
	}

  });


/*****delete single tasks***/
router.delete('/task/:id',function(req,res,next){
  db.tasks.remove({_id : mongojs.ObjectId(req.params.id)},function(err,task){

    if(err){
    	console.log('err');
    	res.send(err)
    }
    res.json(task);
  });
});

/*****delete single tasks***/
router.put('/task/:id',function(req,res,next){
	var task=req.body;
	var updTask = {};
	if(task.isDone)
		updTask.isDone=taks.isDone;
	if(task.title)
		updTask.title=taks.title;

	if(!updTask){
		res.status(400);
		res.json({
			"error":"Bad Data"
		})
	}
	else{
		db.tasks.update({_id : mongojs.ObjectId(req.params.id)},updTask,{},function(err,task){

    if(err){
    	console.log('err');
    	res.send(err)
    }
    res.json(task);
  });
	}
	
});


module.exports = router;