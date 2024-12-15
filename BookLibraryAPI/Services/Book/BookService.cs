using BookLibraryAPI.Data;
using BookLibraryAPI.DTO;
using BookLibraryAPI.Repositories.Books;

namespace BookLibraryAPI.Services.Book
{
    public class BookService(IBookRepository bookRepository, BookLibraryContext context) : IBookService
    {
        private readonly IBookRepository _bookRepository = bookRepository;
        private readonly BookLibraryContext _context = context;

        // Get all books 
        public async Task<IEnumerable<BookDTO>> GetBooksAsync()
        {
            var books = await _bookRepository.GetBooksAsync();
            return books;
        }

        // Get a single book by its ID
        public async Task<BookDTO> GetBookByIdAsync(int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);

            if (book == null)
                return null;

            return book;
        }

        // Add a new book and return the BookDTO
        public async Task<BookDTO> AddBookAsync(BookRequestDTO bookRequest)
        {
            // Fetch Author and Genre for validation
            var author = await _context.Authors.FindAsync(bookRequest.AuthorId);
            var genre = await _context.Genres.FindAsync(bookRequest.GenreId);

            if (author == null || genre == null)
            {
                throw new ArgumentException("Author or Genre not found.");
            }

            // Create Book entity from BookRequestDTO
            var book = new Models.Book
            {
                Title = bookRequest.Title,
                AuthorId = bookRequest.AuthorId,
                GenreId = bookRequest.GenreId,
                PublicationYear = bookRequest.PublicationYear
            };

            // Add the book using the repository
            var addedBook = await _bookRepository.AddBookAsync(bookRequest);
            return addedBook;
        }

        // Update an existing book by its ID and return the updated BookDTO
        public async Task<BookDTO> UpdateBookAsync(int id, BookRequestDTO bookRequest)
        {
            // Fetch existing book by ID
            var existingBook = await _bookRepository.GetBookByIdAsync(id);
            if (existingBook == null)
                throw new KeyNotFoundException("Book not found.");

            // Fetch Author and Genre for validation
            var author = await _context.Authors.FindAsync(bookRequest.AuthorId);
            var genre = await _context.Genres.FindAsync(bookRequest.GenreId);

            if (author == null || genre == null)
            {
                throw new ArgumentException("Author or Genre not found.");
            }

            // Update the properties of the existing book entity
            existingBook.Title = bookRequest.Title;
            existingBook.AuthorId = bookRequest.AuthorId;
            existingBook.GenreId = bookRequest.GenreId;
            existingBook.PublicationYear = bookRequest.PublicationYear;

            // Update book in the repository
            var updatedBook = await _bookRepository.UpdateBookAsync(bookRequest, id);
            return updatedBook;
        }

        // Delete a book by its ID
        public async Task<bool> DeleteBookAsync(int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            if (book == null)
                return false;

            return await _bookRepository.DeleteBookAsync(id);
        }
    }
}