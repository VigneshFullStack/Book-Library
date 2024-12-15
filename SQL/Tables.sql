-- Databse Name : Library
-- Create Authors Table
CREATE TABLE Authors (
    AuthorId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Bio NVARCHAR(MAX) NULL
);

-- Create Genres Table
CREATE TABLE Genres (
    GenreId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);

-- Create Books Table
CREATE TABLE Books (
    BookId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    AuthorId INT NOT NULL,
    GenreId INT NOT NULL,
    PublicationYear INT NOT NULL,
    FOREIGN KEY (AuthorId) REFERENCES Authors(AuthorId),
    FOREIGN KEY (GenreId) REFERENCES Genres(GenreId)
);