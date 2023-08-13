const axios = require('axios');

exports.homeRoutes = (req, res) => 
{
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.user_table = (req, res) =>
{
    const page = req.query.page || 1;
    axios.get(`http://localhost:3000/api/paginated-users?page=${page}`)
        .then(function(response){
            res.render('include/user_table', {users : response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_user = (req, res) => 
{
    res.render('include/add_user');
}



exports.update_user = (req, res) => 
{
    axios.get('http://localhost:3000/api/users', {params : {id : req.query.id}})
        .then(function(userdata) {
            res.render('update_user', {user : userdata.data}  )
        })
        .catch(err => {
            res.send(err)
        })

}