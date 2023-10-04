import { app, mysq } from '../main.js';

export function init()
{
    app.get('/url', (req, res) => { getInventory() })
}

async function getMoney(user_id)
{
    // currency: string;
    // value: number;
    // quantity: number;
    // emoji: string;
    
    let query = 'SELECT currency, value, quantity, emoji FROM user where user_id = ?';
    let parameters = [user_id];
    const [currency, value, quantity, emoji] = await mysqlConnection.query(query, parameters);
    res.status(200).json({
        currency: currency,
        value: value,
        quantity: quantity,
        emoji: emoji
    });
}

async function getMemories(){
    // value: number;
    // quantity: number;
    // emoji: string;
    let query = 'SELECT value, quantity, emoji FROM memories';
    const [value, quantity, emoji] = await mysqlConnection.query(query);
    res.status(200).json({
        value: value,
        quantity: quantity,
        emoji: emoji
    });
    
}


async function getInventory() {
    
    money = await getMoney()
    memories = await getMemories()

    return {
        money: money,
        memories: memories
    }
}