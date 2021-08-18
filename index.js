import Express from "express"
import Connection from "./database.js"
import {addData, getData} from "./databaseMongo.js"

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
    addData(item, 'test', 'rpayUser')
})

app.get('/getMongo', (req, res) => {
    const result = getData('test', 'rpayUser')
    console.log(result)
    res.send(result)
})

app.listen(port, () => console.log("Listening on port " + port))
