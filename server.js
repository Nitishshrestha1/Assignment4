const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.static("public")); // allow images to be served

const storage = multer.diskStorage({
    destination: './public',
    filename: (req, file, cb) => {
        return cb(null, `${req.query.name}.jpg`);
    },
});

const upload = multer({storage })

app.use(express.json())
app.get("/api/getImage", (req, res) => {
    const name = req.query.name.toLowerCase(); 

    const imagename = `${name}.jpg`
    const filepath = path.join(__dirname,'public',imagename);

    console.log(fs);

    if (fs.existsSync(filepath)){
        return res.status(200).json({url: '/'+imagename})
    } else {
        return res.status(200).json({url: "/default.jpg"})
    }  
});

app.post('/api/upload', upload.single('image'),(req,res) => {
    const name = req.query.name;

    console.log(name)
    if (!name) return res.status(400).send('Missing ?name=');
    if (!req.file) return res.status(400).send('No file uploaded');

    const filename = `${name}.jpg`;
    const filepath = path.join(__dirname, 'public', filename);

    res.status(200).json({status: true, message: `Image is successfully add in ${filepath}`});
})

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
