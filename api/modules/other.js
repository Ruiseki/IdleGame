import { resolveTransitionHooks } from "vue";
import { app, mysqlConnection } from "../main.js"

export function init()
{
    app.post("/login", (req, res) => { registerName(req, res) })
    app.post("/reset", (req, res) => { reset(req, res) })
}

async function registerName(req, res)
{
    let data = req.body, tag = null, query, params;

    query = 'SELECT * FROM user WHERE username = ? AND tag = ?'
    let result;
    do
    {
        tag = Math.random().toString().substring(2,6);
        params = [data.username, tag];

        result = await mysqlConnection.execute(query, params);

    } while (result[0].length != 0);

    query = 'INSERT INTO user (username, tag) VALUES (?, ?)';
    mysqlConnection.execute(query, params);

    res.status(200).json({tag})
}

async function reset(req, res)
{
    let query = 'DELETE FROM user WHERE username = ? AND tag = ?'
    let params = [req.body.username, req.body.tag]
    mysqlConnection.execute(query, params)
    res.send(200)
}