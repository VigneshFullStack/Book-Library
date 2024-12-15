using BookLibraryAPI.DTO;

namespace BookLibraryAPI.Repositories.Genre
{
    public interface IGenreRepository
    {
        Task<IEnumerable<GenreDTO>> GetGenresAsync();
        Task<GenreDTO> GetGenreByIdAsync(int id);
        Task<GenreDTO> AddGenreAsync(Models.Genre genre);
        Task<GenreDTO> UpdateGenreAsync(Models.Genre genre);
        Task<bool> DeleteGenreAsync(int id);
    }
}