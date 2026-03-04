const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3500

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth: true
})

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        return;
    }
    console.log("Connected to MySQL database.");
});

db.on('error', (err) => {
    console.log('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Database connection was closed. Please restart the server.');
    } else {
        throw err;
    }
});

app.post('/add_user', (req, res) => {
    const sql = "INSERT INTO user_details (`name`, `email`, `age`,`gender`) VALUES (?,?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ];

    db.query(sql, values, (err, result)=> {
        if (err) {
            console.error("MYSQL ERROR:", err.sqlMessage || err);
            return res.status(500).json({ message: 'Something unexpected has occured' + err})
        }
        return res.json({ success: "User added successfully"})
    })
})


app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user_details"
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error", error: err})
        }
        return res.json(result)
    })

})


app.get('/get_user/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM user_details WHERE `id`= ?"
    db.query(sql,[id], (err,result) => {
        if (err) {
            console.log("MYSQL ERROR:", err.sqlMessage || err)
            return res.status(500).json({ message: "Server error", error: err})
        }
        return res.json(result)
    })
})

app.post('/edit_user/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE user_details SET `name`= ?, `email`=?, `age`=?, `gender`=? WHERE id=?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        id
    ];

    db.query(sql, values, (err, result)=> {
        if (err) {
            console.error("MYSQL ERROR:", err.sqlMessage || err);
            return res.status(500).json({ message: 'Something unexpected has occured' + err})
        }
        return res.json({ success: "User updated successfully"})
    })
})

app.delete('/delete_user/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM user_details WHERE id=?"
    const values = [id]
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Mysql Error:", err.sqlMessage || err);
            return res.status(500).json({ message: 'something unexpected error has occured' + err})
        }
        return res.json({ success: "User deleted successfully"})
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
