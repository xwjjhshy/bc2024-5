const { program } = require('commander');
const express = require('express');

program
    .requiredOption('-h, --host <host>', 'Server host')
    .requiredOption('-p, --port <port>', 'Server port')
    .requiredOption('-c, --cache <cacheDir>', 'Cache directory path');

program.parse(process.argv);
const options = program.opts();

const app = express();

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(options.port, options.host, () => {
    console.log(`Server is running at http://${options.host}:${options.port}`);
});
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const notesDir = options.cache;

// Переконайтесь, що директорія існує
if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}
