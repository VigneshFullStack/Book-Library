using BookLibraryAPI.DTO;

namespace BookLibraryAPI.Services.Book
{
    public interface IBookService
    {
        Task<IEnumerable<BookDTO>> GetBooksAsync();
        Task<BookDTO> GetBookByIdAsync(int id);
        Task<BookDTO> AddBookAsync(BookRequestDTO bookRequest);
        Task<BookDTO> UpdateBookAsync(int id, BookRequestDTO bookRequest);
        Task<bool> DeleteBookAsync(int id);
    }
}