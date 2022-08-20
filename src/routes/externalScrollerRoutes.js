const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');


router.get('/test',(_req, res) => {
    console.log('WS Alive!!!')
    res.status(200).send({status:"ok!"})
})

//READ
router.get('/getUsers', async (req, res) => {
    let sql = "select * from person where state=1";

    let result = await BD.Open(sql, [], false);
    let user_list = [];

    result.rows.map(user => {
        let userSchema = {
            "codu": user[0],
            "username": user[1],
            "firstname": user[2],
            "lastname": user[3]
        }
        user_list.push(userSchema);
    })

    res.json(user_list);
})

router.get('/getUser/:id', async (req, res) => {
    const { id } = req.params;
  
    sql = "select * from person where state=1 and codu = :id";

    let result = await BD.Open(sql, [id], false);
    let user_obj =  {};

    result.rows.map(user => {
        user_obj = {
            "codu": user[0],
            "username": user[1],
            "firstname": user[2],
            "lastname": user[3]
        }        
    })
    return (user_obj.codu != null || user_obj.codu != undefined)
        ? res.json(user_obj)
        : res.status(404).send({error:`no data found for person with codu: ${id}`})
})


//CREATE

router.post('/addUser', async (req, res) => {
    const { username, firstname, lastname } = req.body;

    sql = "insert into person(username,firstname,lastname) values (:username,:firstname,:lastname)";

    await BD.Open(sql, [username, firstname, lastname], true);

    res.status(200).json({
        "username": username,
        "firstname": firstname,
        "lastname": lastname
    })
})

//UPDATE
router.put("/updateUser", async (req, res) => {
    const { codu, username, firstname, lastname } = req.body;

    sql = "update person set username=:username, firstname=:firstname, lastname=:lastname where codu=:codu";

    await BD.Open(sql, [username, firstname, lastname,codu], true);

    res.status(200).json({
        "codu": codu,
        "username": username,
        "firstname": firstname,
        "lastname": lastname
    })

})


//DELETE
router.delete("/deleteUser/:codu", async (req, res) => {
    const { codu } = req.params;

    sql = "update person set state=0 where codu=:codu";

    await BD.Open(sql, [codu], true);

    res.json({ "msg": "Usuario Eliminado" })
})


module.exports = router;