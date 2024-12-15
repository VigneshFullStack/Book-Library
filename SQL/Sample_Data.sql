-- Insert Authors
INSERT INTO Authors (Name, Bio) VALUES 
('J.K. Rowling', 'Author of the Harry Potter series'),
('George R.R. Martin', 'Author of A Song of Ice and Fire'),
('J.R.R. Tolkien', 'Author of The Lord of the Rings');

-- Insert Genres
INSERT INTO Genres (Name) VALUES 
('Fantasy'), 
('Science Fiction'), 
('Mystery'), 
('Non-fiction');

-- Insert Books
INSERT INTO Books (Title, AuthorId, GenreId, PublicationYear) VALUES
('Harry Potter and the Sorcerer''s Stone', 1, 1, 1997),
('A Game of Thrones', 2, 1, 1996),
('The Hobbit', 3, 1, 1937);
