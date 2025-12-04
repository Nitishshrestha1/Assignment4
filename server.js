const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.static("public")); // allow images to be served

const storage = multer.diskStorage({
    distination: (req,file, cb) => {
        return cb(null, "./public");
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`);
    },
});

const upload = multer({storage })

app.use(express.json())
// API route to return the correct image
app.get("/api/getImage", (req, res) => {
    const name = req.query.name.toLowerCase();  //name = jerry

    let image = "default.jpg";

    if (name.includes("tom")) image = "tom.jpg";
    if (name.includes("jerry")) image = "jerry.jpg";
    if (name.includes("dog")) image = "dog.jpg";

    res.json({ url: "/" + image });   
});

app.post('/api/upload', upload.single('image'),(req,res) => {
    const name = req.query.name;

    if (!name) return res.status(400).send('Missing ?name=');
    if (!req.file) return res.status(400).send('No file uploaded');

    const filename = `${name}.jpg`;
    const filepath = path.join(__dirname, 'public', filename);

    res.send(req.body);
})

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
