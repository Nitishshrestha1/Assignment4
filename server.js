const express = require("express");
const multer = require('multer');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static("public")); // allow images to be served

const storage = multer.diskStorage({
    distination: (req,file, cb) => {
        return cb(null, "./image");
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`);
    },
});

const upload = multer({storage })

app.use(express.json())
// API route to return the correct image
app.get("/api/getImage", upload.single('pic'), (req, res) => {
    const name = req.query.name.toLowerCase();  //name = jerry

    let image = "default.jpg";

    if (name.includes("tom")) image = "tom.jpg";
    if (name.includes("jerry")) image = "jerry.jpg";
    if (name.includes("dog")) image = "dog.jpg";

    res.json({ url: "/" + image });   
});

app.post('/api/upload',(req,res) => {

})

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
