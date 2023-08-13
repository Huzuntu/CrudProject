var UserDB = require('../model/model');
const express = require('express');
const app = express();

// Create and save new users
exports.create = (req, res)=>{
    if(!req.body)
    {
        res.status(400).send({message : "Content can not be empty"});
        return;
    }

    const user = new UserDB({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    user
        .save(user)
        .then(data => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occured while create operation"
            })
        })
}
exports.getUsers = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    UserDB.countDocuments({})
        .then((count) => {
            const totalPages = Math.ceil(count / perPage);
            const offset = (page - 1) * perPage;

            UserDB.find({})
                .skip(offset)
                .limit(perPage)
                .then((users) => {
                    const result = {
                        users: users,
                        page: page,
                        totalPages: totalPages,
                    };
                    res.status(200).send(result);
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message || "Error Occurred while retrieving user information" });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error Occurred while counting users" });
        });
}

exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        UserDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        UserDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
} 


//Update a new identified user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id
    UserDB.findByIdAndUpdate(id, req.body)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : `Can not Update user with ${id}. Maybe user not found`})
            }
            else
            {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message : "Error update user information"})
        })
}

// Delete a user with a specified user id in the request 
exports.delete = (req, res)=>{
    const id = req.params.id
    
    UserDB.findByIdAndDelete(id, req.body)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : `Can not delete user with ${id}. Maybe ID is wrong`})
            }
            else
            {
                res.send({ message : "User deleted succesfully"})
            }
        })
        .catch(err => {
            res.status(500).send({ message : `Could not delete the user with id: ${id}`})
        })
}
