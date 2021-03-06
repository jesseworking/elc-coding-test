/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const express   = require('express');
const cors      = require('cors');
const hostname  = 'localhost';
const port      = 3035;

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    try {
        if (!req.query) {
            return res.status(400).send('Query is invalid.');
        }

        const {search} = req.query;

        const result = data.filter(
            (item) => {
                const res = item.tags.filter(
                    (tag) => {
                        return tag.includes(search)
                    }
                );
                return res.length;
            }
        );

        res.status(200).send(result);
    } catch(error) {
        res.status(400).send('Unexpected Error.')
    }
});

app.listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
