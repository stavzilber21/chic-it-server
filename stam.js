const admin = require('firebase-admin');
const http = require("http");
const serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://chicit-a5e00-default-rtdb.firebaseio.com'
});

const db = admin.database();

const broadcastRef = db.ref('Posts');

const server = http.createServer((req,res) => {

    broadcastRef.once('value').then(function(snapshot) {
        const numItems = snapshot.numChildren();
        console.log(`Number of items in Posts: ${numItems}`);

        res.writeHead(200, {"content-type":"text/html"});
        res.write(`count post:${JSON.stringify(numItems, null, 2)}`);
        // res.write(`hello`);
        res.end();
    });
    // broadcastRef.once('value', (snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data);


    //     res.writeHead(200, {"content-type":"text/html"});
    //     res.write(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
    //     // res.write(`hello`);
    //     res.end();

    // });

})
server.listen(3000);
        console.log("listening on port 3000");

// to see:
//     http://localhost:3000/