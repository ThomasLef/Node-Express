import Express from "express"
import Connection from "./database.js"
import { MongoClient } from "mongodb";
import assert from "assert"

const app = Express()
const port = 3000

const url = 'mongodb://localhost:11341/test'

app.use(Express.json()) //Allows to parse json data into a post method
app.use(Express.urlencoded({ extended: true }))


app.post('/add', (req, res) => {
    console.log(req.body)
    try {
        const { id, name, isAdmin } = req.body //Get the arguments passed in the post request
        try {
            Connection.promise().query(`INSERT INTO USERS VALUES('${id}', '${name}','${isAdmin}')`)
            res.status(201).send({ msg: 'Created a new line'})
        }
        catch (error) {
            res.status(500).send({ msg: 'Error with the DB'})
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Ooops'})
    }
})

app.post('/addMongo', (req, res) => {
    console.log(req.body)
    const item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err)
        db.collection('rpayUser').insertOne(item, (err, result) => {
            assert.equal(null, err)
            console.log(result)
            db.close();
        })
    })
})

app.get('/getMongo', (req, res) => {
    var resultArray = []
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err)
        const cursor = db.collection('rpayUser').find()
        cursor.forEach((doc, err) => {
            assert.equal(null, err)
            resultArray.push(doc)
        }, () => {
            db.close()
            console.log(resultArray)
            res.render(resultArray)
        });
    })
})

app.listen(port, () => console.log("Listening on port " + port))
