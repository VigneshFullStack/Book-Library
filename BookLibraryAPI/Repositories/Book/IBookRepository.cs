using BookLibraryAPI.DTO;

namespace BookLibraryAPI.Repositories.Books
{
    public interface IBookRepository
    {
        Task<IEnumerable<BookDTO>> GetBooksAsync();
        Task<BookDTO> GetBookByIdAsync(int id);
        Task<BookDTO> AddBookAsync(BookRequestDTO bookRequest);
        Task<BookDTO> UpdateBookAsync(BookRequestDTO bookRequest, int id);
        Task<bool> DeleteBookAsync(int id);
    }
}