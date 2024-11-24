import express from 'express';
import multer from 'multer';

const app = express();
const unload = multer ({dest: 'upload/'})

app.use(express.urlencoded({extended: true}));
app.use( upload.none() );
app.use(express.json());

app.listen(3001,()=>{
    console.log('Server runing..');

})

app.get('/user', (req, res) =>{
    let user = req.body;
    console.log(user);

    res.send();
});
