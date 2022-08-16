const express = require('express')
const app = express()
const multer = require('multer')
const uploadMiddleware = multer({
    limits:{
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: (req, file, cb) => {
        cb(undefined, true)
    },
    storage: multer.diskStorage({
        filename: (req, file, cb) =>{
            cb(null, file.originalname)
        },
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        }
    })
})

// GET / - Yükleme formunun bulunduğu html dosyası
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

// POST /upload - Yükleme formundan gelen dosyaları local klasöre ekleyen URL
app.post('/upload', uploadMiddleware.single('avatar'),(req, res) => {
    if(!req.file){
        return res.json({
            success: false,
            message: "Dosya Yüklenemedi"
        })
    }
    // return success
    return res.json({
        succes: true,
        message: "Dosya Yüklendi. Tebrikler...",
        file: req.file
    })
})

// GET /uploads/:filename - Yükleme formundan gelen dosyaları local klasöre ekleyen URL
app.get('/uploads/:filename', (req, res) => {
    var filename = req.params.filename
    res.sendFile(__dirname + filename)  //res.sendFile(__dirname + '/uploads/' + filename)
})


app.listen(9090, () => {
    console.log('server is running on port http:/localhost:9090')
})