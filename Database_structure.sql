
CREATE TABLE Genre (
    GenreID SERIAL PRIMARY KEY,
    Name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Movie (
    MovieID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    GenreID INT,
    FOREIGN KEY (GenreID) REFERENCES Genre(GenreID)
);

CREATE TABLE MovieUser (
    UserID SERIAL PRIMARY KEY,
    Name VARCHAR(100),
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    YearOfBirth INT
);

CREATE TABLE Review (
    ReviewID SERIAL PRIMARY KEY,
    Stars INT CHECK (Stars BETWEEN 1 AND 5),
    ReviewText TEXT,
    ReviewDate DATE DEFAULT CURRENT_DATE,
    UserID INT,
    MovieID INT,
    FOREIGN KEY (UserID) REFERENCES MovieUser(UserID),
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
    UNIQUE(UserID, MovieID)
);

CREATE TABLE Favorite (
    FavoriteID SERIAL PRIMARY KEY,
    UserID INT,
    MovieID INT,
    FOREIGN KEY (UserID) REFERENCES MovieUser(UserID),
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
    UNIQUE(UserID, MovieID)
);

INSERT INTO Genre (Name) VALUES 
('Drama'), 
('Comedy'), 
('Scifi'), 
('Fantasy'), 
('Action'), 
('Thriller');

INSERT INTO Movie (Name, Year, GenreID) VALUES
('Inception', 2010, (SELECT GenreID FROM Genre WHERE Name = 'Action')),
('The Terminator', 1984, (SELECT GenreID FROM Genre WHERE Name = 'Action')),
('Tropic Thunder', 2008, (SELECT GenreID FROM Genre WHERE Name = 'Comedy')),
('Borat', 2006, (SELECT GenreID FROM Genre WHERE Name = 'Comedy')),
('Interstellar', 2014, (SELECT GenreID FROM Genre WHERE Name = 'Drama')),
('Joker', 2019, (SELECT GenreID FROM Genre WHERE Name = 'Drama'));

INSERT INTO MovieUser (Name, Username, Password, YearOfBirth) VALUES
('Michael Hill', 'michaelh', 'password123', 1990),
('Lisa Simpson', 'lizzy', 'abcdef', 1991),
('Ben Bossy', 'boss', 'salasana', 1981);

INSERT INTO Review (Stars, ReviewText, UserID, MovieID) VALUES
(5, 'One of the best movies ever!', (SELECT UserID FROM MovieUser WHERE Username = 'michaelh'), (SELECT MovieID FROM Movie WHERE Name = 'Inception')),
(4, 'Pretty good for its time.', (SELECT UserID FROM MovieUser WHERE Username = 'lizzy'), (SELECT MovieID FROM Movie WHERE Name = 'The Terminator')),
(3, 'Decent, but not my favorite.', (SELECT UserID FROM MovieUser WHERE Username = 'boss'), (SELECT MovieID FROM Movie WHERE Name = 'Joker'));

INSERT INTO Favorite (UserID, MovieID) VALUES
((SELECT UserID FROM MovieUser WHERE Username = 'michaelh'), (SELECT MovieID FROM Movie WHERE Name = 'Inception')),
((SELECT UserID FROM MovieUser WHERE Username = 'lizzy'), (SELECT MovieID FROM Movie WHERE Name = 'Interstellar')),
((SELECT UserID FROM MovieUser WHERE Username = 'boss'), (SELECT MovieID FROM Movie WHERE Name = 'The Terminator'));
