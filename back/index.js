import express from "express";
import mysql from 'mysql2';
import cors from 'cors';
import crypto from "crypto"
import fs from 'fs'

export function encryptText (plainText) {
    return crypto.publicEncrypt({
            key: fs.readFileSync('public_key.pem', 'utf8'),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        // We convert the data string to a buffer
        Buffer.from(plainText)
    )
}

export function decryptText (encryptedText) {
    return crypto.privateDecrypt(
        {
            key: fs.readFileSync('private_key.pem', 'utf8'),
            // In order to decrypt the data, we need to specify the
            // same hashing function and padding scheme that we used to
            // encrypt the data in the previous step
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        encryptedText
    )
}


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'site'
});

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    connection.query(
        `SELECT * FROM User WHERE email = ?`,
        [email],
        function (err, results) {
            if (err) {
                throw err;
            }
            if (results.length > 0) {
                res.status(409).send('Cette adresse e-mail est déjà utilisée');
            } else {
                connection.query(
                    `INSERT INTO User (email, name, password) values (?,?,?)`,
                    [email, name, password],
                    function (err, results) {
                        if (err) {
                            throw err;
                        }
                        res.send(JSON.stringify(results));
                    }
                );
            }
        }
    );
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    let passwordCorrect = false;
    connection.query(
        `SELECT * FROM User WHERE email = ? AND password = ? AND name = ?`,
        [email, password, name],
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            if (results.length > 0) {
                const user = results[0];
                let token = encryptText(JSON.stringify({
                    id: user.id,
                    email: user.email,
                    name: user.name
                }))
                res.send({token : token.toString('base64')})
            } else {
                res.status(401).send({
                    message: 'Adresse e-mail ou mot de passe incorrect',
                    passwordCorrect: passwordCorrect
                });
            }
        }
    );
});
app.get('/profil', (req, res) => {
    const token = decryptText(Buffer.from(req.query.token, 'base64'));
    res.json({ message: token.toString() });
});

app.get('/cocktails',(req,res) => {
    connection.query(`SELECT * from cocktails`,
        function (err, results) {
            if (err) {
                throw err;
            }
            res.send(JSON.stringify(results));
        })


})
app.post('/cocktails',(req,res) => {
    const cocktail = req.body;

    console.log(cocktail)
    connection.query(`INSERT INTO cocktails (name,url,description) values ("${cocktail.name}","${cocktail.url}","${cocktail.description}")`,
        function (err,results){
            if (err) {
                console.log(err)
                throw err;
            }
            console.log(results)
            res.send(JSON.stringify(results))
        }
    )
})

app.listen(3000)