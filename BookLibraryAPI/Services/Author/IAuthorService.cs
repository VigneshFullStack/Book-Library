using BookLibraryAPI.DTO;

namespace BookLibraryAPI.Services.Author
{
    public interface IAuthorService
    {
        Task<IEnumerable<AuthorDTO>> GetAuthorsAsync();
        Task<AuthorDTO> GetAuthorByIdAsync(int id);
        Task<AuthorDTO> AddAuthorAsync(AuthorDTO authorDTO);
        Task<AuthorDTO> UpdateAuthorAsync(int id, AuthorDTO authorDTO);
        Task<bool> DeleteAuthorAsync(int id);
    }
}