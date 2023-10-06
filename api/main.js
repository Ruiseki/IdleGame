import Express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createConnection } from "mysql2/promise"
import { init as shopInit } from './modules/shop.js'
import { init as otherInit } from './modules/other.js'

dotenv.config()
export var mysqlConnection = 'a'
var port = 48756
export const app = Express()
export const corsOptions = {
    origin : [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://10.57.33.202:5173'
    ],
    optionsSuccessStatus : 200,
    methods : ['GET', 'POST', 'PUT', 'DELETE']
}

init()

async function init()
{
    await connectToMysql()
    
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors(corsOptions))

    shopInit()
    otherInit()

    app.listen(port, () => console.log(`✅ API started on port ${port}`))
}

async function connectToMysql()
{
    await connectToDatabase()
    .then(() => console.log('✅ Connection to the database successful'))
    .catch(() => {
        console.log('❌ Connection to database failed. Next try in 5 sec');
        let intervalId = setInterval(async () => {
            await connectToDatabase()
            .then(() => {
                console.log('✅ Connection to the database successful')
                clearInterval(intervalId)
            })
            .catch(() => console.log('❌ Connection to database failed. Next try in 5 sec'))
        }, 5000)
    })
}

function connectToDatabase()
{
    return new Promise(async (resolve, reject) => {
            await createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        })
        .then(result => {
            mysqlConnection = result
            resolve('Connection successful')
        })
        .catch(err => reject("Cannot connect to database"))
    });
}