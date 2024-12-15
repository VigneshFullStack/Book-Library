using Microsoft.EntityFrameworkCore;
using BookLibraryAPI.Data;
using BookLibraryAPI.Models;
using BookLibraryAPI.DTO;
using Serilog;

namespace BookLibraryAPI.Repositories.Books
{
    public class BookRepository(BookLibraryContext context) : IBookRepository
    {
        private readonly BookLibraryContext _context = context;

        public async Task<IEnumerable<BookDTO?>> GetBooksAsync()
        {
            try
            {
                var books = await _context.Books
                            .Include(b => b.Author)
                            .Include(b => b.Genre)
                            .Select(b => new BookDTO
                            {
                                BookId = b.BookId,
                                Title = b.Title,
                                AuthorId = b.AuthorId,
                                GenreId = b.GenreId,
                                AuthorName = b.Author.Name,
                                GenreName = b.Genre.Name,
                                PublicationYear = b.PublicationYear
                            }).ToListAsync();

                return books;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while getting books.");
                throw;
            }
        }

        public async Task<BookDTO> GetBookByIdAsync(int id)
        {
            try
            {
                var book = await _context.Books
                    .Include(b => b.Author)
                    .Include(b => b.Genre)
                    .Select(b => new BookDTO
                    {
                        BookId = b.BookId,
                        Title = b.Title,
                        AuthorId = b.AuthorId,
                        GenreId = b.GenreId,
                        AuthorName = b.Author.Name,
                        GenreName = b.Genre.Name,
                        PublicationYear = b.PublicationYear
                    })
                    .FirstOrDefaultAsync(b => b.BookId == id);

                if (book == null) return null;

                return book;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching book with ID {BookId}.", id);
                throw;
            }
        }

        public async Task<BookDTO> AddBookAsync(BookRequestDTO bookRequest)
        {
            try
            {
                // Fetch Author and Genre for validation
                var author = await _context.Authors.FindAsync(bookRequest.AuthorId);
                var genre = await _context.Genres.FindAsync(bookRequest.GenreId);

                if (author == null || genre == null)
                {
                    throw new ArgumentException("Author or Genre not found.");
                }

                // Create Book entity from BookRequestDTO
                var book = new Book
                {
                    Title = bookRequest.Title,
                    AuthorId = bookRequest.AuthorId,
                    GenreId = bookRequest.GenreId,
                    PublicationYear = bookRequest.PublicationYear
                };

                _context.Books.Add(book);
                await _context.SaveChangesAsync();

                return new BookDTO
                {
                    BookId = book.BookId,
                    Title = book.Title,
                    AuthorId = book.AuthorId,
                    GenreId = book.GenreId,
                    AuthorName = author.Name,
                    GenreName = genre.Name,
                    PublicationYear = book.PublicationYear
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while adding new book with title {Title}.", bookRequest.Title);
                throw;
            }
        }

        public async Task<BookDTO> UpdateBookAsync(BookRequestDTO bookRequest, int id)
        {
            try
            {
                var existingBook = await _context.Books.FindAsync(id);
                if (existingBook == null)
                    throw new KeyNotFoundException("Book not found.");

                // Fetch Author and Genre for validation
                var author = await _context.Authors.FindAsync(bookRequest.AuthorId);
                var genre = await _context.Genres.FindAsync(bookRequest.GenreId);

                if (author == null || genre == null)
                {
                    throw new ArgumentException("Author or Genre not found.");
                }

                // Update properties of the existing book
                existingBook.Title = bookRequest.Title;
                existingBook.AuthorId = bookRequest.AuthorId;
                existingBook.GenreId = bookRequest.GenreId;
                existingBook.PublicationYear = bookRequest.PublicationYear;

                await _context.SaveChangesAsync();

                return new BookDTO
                {
                    BookId = existingBook.BookId,
                    Title = existingBook.Title,
                    AuthorId = existingBook.AuthorId,
                    GenreId = existingBook.GenreId,
                    AuthorName = author.Name,
                    GenreName = genre.Name,
                    PublicationYear = existingBook.PublicationYear
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while updating book with ID {BookId}.", id);
                throw;
            }
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            try
            {
                var book = await _context.Books.FindAsync(id);
                if (book != null)
                {
                    _context.Books.Remove(book);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while deleting book with ID {BookId}.", id);
                throw;
            }
        }
    }
}