import express from 'express';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'upload/' }); // Korjattu muuttujan nimi

app.use(express.urlencoded({ extended: true }));
app.use(upload.none());
app.use(express.json());

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});

app.get('/user', (req, res) => {
    // Korjataan virheellinen muuttujaviittaus
    let user = req.query.user; // Oletetaan, että käyttäjädata tulee kyselyparametrina
    console.log(user);

    res.send({ message: 'User data logged!' });
});
