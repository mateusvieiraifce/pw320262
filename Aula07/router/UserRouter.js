const express = require('express');
const router = express.Router();
const userController = require("../controller/UserController.js")

router.post("/users/login", (req, res) => {
    return userController.login(req, res);
});

router.post('/users', (req, res) => {
    return userController.create(req,res)
   }
);

router.delete("/users/:id",(req,res)=>{
   return userController.delete(req,res); 
})

router.get("/users/:id",(req,res)=>{
   return userController.findById(req,res);
})

router.put("/users/:id",(req,res)=>{
    return userController.update(req,res); 
})

router.get("/users",  (req,res)=>{
  return userController.findAll(req,res)
})





module.exports = router;    