using BookLibraryAPI.DTO;

namespace BookLibraryAPI.Repositories.Author
{
    public interface IAuthorRepository
    {
        Task<IEnumerable<AuthorDTO>> GetAuthorsAsync();
        Task<AuthorDTO> GetAuthorByIdAsync(int id);
        Task<AuthorDTO> AddAuthorAsync(Models.Author author);
        Task<AuthorDTO> UpdateAuthorAsync(Models.Author author);
        Task<bool> DeleteAuthorAsync(int id);
    }
}