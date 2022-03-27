const mysql = require("mysql2");
const { hostDB, passwordDB, userDB, DB } = require("../../config.json");

const connection = mysql.createConnection({
    host: hostDB,
    password: passwordDB,
    user: userDB,
    database: DB
}).promise();

class DbService {
    constructor() {};

    async getAllUsers() {
        return (await connection.query("SELECT * FROM users"))[0];
    }

    async createUser(name, username, email, password) {
        await connection.query("INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)", [name, username, email, password]);
    }

    async findUserByUserNameOrEmail(username, email) {
        return (await connection.query("SELECT * FROM users WHERE username=? OR email=?", [username, email]))[0];
    }

    async deleteUser(id) {
        return (await connection.query("DELETE FROM users WHERE _id=?", [id]))[0];
    }

    async findUserById(id) {
        return (await connection.query("SELECT * FROM users WHERE _id=?", [id]))[0]
    }

    async updateUserById(id, name, username, email, password) {
        return (await connection.query("UPDATE users SET name=?, username=?, email=?, password=? WHERE _id=?", [name, username, email, password, id]))[0];
    }
}

module.exports = { DbService };
