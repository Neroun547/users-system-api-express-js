const { DbService } = require("../db/db.service");

const dbService = new DbService();

class UsersService {
    constructor() {};
    
    async getAllUsers() {
        try {
            const users = await dbService.getAllUsers();

            return users;
        } catch(e) {
            throw new Error(JSON.stringify({ status: 500, errorMessage: "Database error" }));
        }
    }

    async createUser(name, username, email, password) {
        try {
            const findTheSameUser = await dbService.findUserByUserNameOrEmail(username, email);
            
            if(findTheSameUser[0]) {
                return { status: 400, message: "User the same params already exists" };
            }
            await dbService.createUser(name, username, email, password);

            return { status: 200, message: "User was created success" };
        } catch(e) {
            throw new Error(JSON.stringify({ status: 500, errorMessage: "Database error" }));
        }
    }

    async deteteUserById(id) {
        try {
            
            const delUser = await dbService.deleteUser(id);
            
            if(delUser.affectedRows) {
                return {
                    status: 200,
                    message: "User was deleted success"
                }
            }

            return {
                status: 404,
                message: "User not found"
            }
        } catch(e) {
            throw new Error(JSON.stringify({ status: 500, errorMessage: "Database error" }));
        }
    }

    async getUserById(id) {
        try {   
            const user = (await dbService.findUserById(id))[0];

            if(user) {
                return {
                    status: 200,
                    message: user
                }
            }

            return {
                status: 404,
                message: "User not found"
            }
        } catch(e) {
            throw new Error(JSON.stringify({ status: 500, errorMessage: "Database error" }));
        }
    }

    async updateUserById(id, name, username, email, password) {
        try {
            const findTheSameUser = await dbService.findUserByUserNameOrEmail(username, email);
            
            if(findTheSameUser[0] && findTheSameUser[0]._id !== id) {
                return {
                    status: 400,
                    message: "User the same params already exists"
                }
            }
            const user = await dbService.updateUserById(Number(id), name, username, email, password);

            if(user.affectedRows) {
                return {
                    status: 200,
                    message: "User was updated success"
                }
            }
            return {
                status: 404,
                message: "User not found"
            }
        } catch(e) {
            throw new Error(JSON.stringify({ status: 500, errorMessage: "Database error" }));
        }
    }
}

module.exports = { UsersService };  
