import { pool } from "../../db/connect.js";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;
        // CHECK UNIQUE USERNAME
        const [checkName] = await pool.query('select name from userS where name=?', name)
        if (checkName.length > 0) return res.status(409).json({ message: "Name already taken" });
        // CHECK USER ALREADY EXISTS
        const [checkUser] = await pool.query('select * from users where email=?', email);
        if (checkUser.length > 0) return res.status(409).json({ message: "user already registered" });
        // HASH PASSWORD
        const hash = await bcrypt.hash(password, 10)
        // INSERT DATA
        const [result] = await pool.query('insert into users (name,email,password) values (?,?,?)', [name, email, hash])
        if (result.affectedRows === 0) return res.status(409).json({ message: "user not registered" });
        // GENERATE TOKEN
        const TOKEN = JWT.sign({ userId: result.insertId, name: name }, process.env.JWT_SECRET)
        // SAVE COOKIES
        res.cookie('token', TOKEN, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        // RESPONSE
        return res.status(200).json({ message: "user registered success", userId: result.insertId })
    } catch (error) {
        return res.status(500).json({ message: "user registration failed", error: error })
    }
}


async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        // CHECK USER EXISTS
        const [checkUser] = await pool.query('select * from users where email=?', email);
        if (checkUser.length === 0) return res.status(409).json({ message: "user not registered" });
        // VERIFY HASH PASSWORD
        const verifyHash = await bcrypt.compare(password, checkUser[0].password)
        if (!verifyHash) return res.status(409).json({ message: "wrong password" });
        // GENERATE TOKEN
        const TOKEN = JWT.sign({ userId: checkUser[0].user_id, name: checkUser[0].name }, process.env.JWT_SECRET)
        // SAVE COOKIES
        res.cookie('token', TOKEN, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        // RESPONSE
        return res.status(200).json({ message: "user login success", data: checkUser[0] })
    } catch (error) {
        return res.status(500).json({ message: "user login failed", error: error.message })
    }
}



async function signOut(req, res) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        return res.status(200).json({ message: "user signOut success" })
    } catch (error) {
        return res.status(500).json({ message: "user signOut failed", error: error.message })
    }
}


export default {
    signUp,
    signOut,
    signIn
}