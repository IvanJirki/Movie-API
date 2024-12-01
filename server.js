import express from 'express';

const app = express();
app.use(express.json()); 

let users = [];
let movies = [];
let reviews = [];

app.post('/users', (req, res) => {
    const { name, username, password, year_of_birth } = req.body;
    const user_id = users.length + 1;
    const newUser = { user_id, name, username, password, year_of_birth };
    users.push(newUser);
    res.status(201).send(newUser);
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.user_id === parseInt(req.params.id));
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.user_id === parseInt(req.params.id));
    if (!user) return res.status(404).send({ message: 'User not found' });
    Object.assign(user, req.body); 
    res.send(user);
});

app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.user_id !== parseInt(req.params.id));
    res.send({ message: 'User deleted successfully' });
});

app.post('/movies', (req, res) => {
    const { name, year, genre_id } = req.body;
    const movie_id = movies.length + 1;
    const newMovie = { movie_id, name, year, genre_id };
    movies.push(newMovie);
    res.status(201).send(newMovie);
});

app.get('/movies', (req, res) => {
    res.send(movies);
});

app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.movie_id === parseInt(req.params.id));
    if (!movie) return res.status(404).send({ message: 'Movie not found' });
    res.send(movie);
});

app.post('/reviews', (req, res) => {
    const { user_id, movie_id, stars, review_text } = req.body;
    if (stars < 1 || stars > 5) {
        return res.status(400).send({ message: 'Stars must be between 1 and 5' });
    }
    const review_id = reviews.length + 1;
    const newReview = { review_id, user_id, movie_id, stars, review_text };
    reviews.push(newReview);
    res.status(201).send(newReview);
});

app.get('/reviews', (req, res) => {
    res.send(reviews);
});

app.get('/reviews/:id', (req, res) => {
    const review = reviews.find(r => r.review_id === parseInt(req.params.id));
    if (!review) return res.status(404).send({ message: 'Review not found' });
    res.send(review);
});

app.delete('/reviews/:id', (req, res) => {
    reviews = reviews.filter(r => r.review_id !== parseInt(req.params.id));
    res.send({ message: 'Review deleted successfully' });
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
