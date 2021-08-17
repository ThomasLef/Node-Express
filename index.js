import Express from "express"
import Connection from "./database.js"
import assert from "assert"
import mongoClient from "./databseMongo.js"

const app = Express()
const port = 3000

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
    mongoClient.connect()
    const db = mongoClient.db('test')
    const users = db.collection('rpayUser')

    const result = users.insertOne(item);
    console.log(result)
})

app.get('/getMongo', (req, res) => {
    var resultArray = []

    mongoClient.connect()
    const cursor = mongoClient.db('test').collection('rpayUser').find()
    cursor.forEach((doc) => {
        resultArray.push(doc)
    })
    console.log(resultArray)
})

app.listen(port, () => console.log("Listening on port " + port))
