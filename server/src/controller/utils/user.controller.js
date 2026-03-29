import { pool } from "../../db/connect.js";


async function getUsers(req, res) {
    try {
        const [result] = await pool.query('select user_id, name, email from users')
        return res.status(200).json({ message: "Data fetch success", data: result })
    } catch (error) {
        return res.status(500).json({ message: "Data fetch failed", error: error })
    }
}


export default {
    getUsers,
}