const { Router } = require("express");
const router = Router();
const { UsersService } = require("../services/user/users.service");

const usersService = new UsersService(); 

router.get("/users", async (req, res) => {
    try {
        const users = await usersService.getAllUsers();

        res.send({ message: users });
    } catch {
        res.sendStatus(500);
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params["id"]);
        
        res.status(user.status).send({message: user.message});
    } catch(e) {
        const error = JSON.parse(e.message);

        res.status(error.status).send({ message: error.message });
    }
});

router.post("/user", async (req, res) => {
    try {
        const createUser = await usersService.createUser(req.body.name, req.body.username, req.body.email, req.body.password);

        res.status(createUser.status).send({ message: createUser.message });
    } catch (e) {
        const error = JSON.parse(e.message);

        res.status(error.status).send(error.errorMessage);
    }
});

router.delete("/user", async (req, res) => {
    try {
        const deleteUser = await usersService.deteteUserById(req.body.id);

        res.status(deleteUser.status).send({ message: deleteUser.message });
    } catch(e) {
        const error = JSON.parse(e.message);

        res.status(error.status).send(error.errorMessage);
    }
});

router.put("/user", async (req, res) => {
    try {
        const updateUser = await usersService.updateUserById(req.body.id, req.body.name, req.body.username, req.body.email, req.body.password);
    
        res.status(updateUser.status).send({ message: updateUser.message });
    } catch(e) {
        const error = JSON.parse(e.message);

        res.status(error.status).send(error.errorMessage); 
    }
});

module.exports = router;
