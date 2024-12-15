using BookLibraryAPI.DTO;

namespace BookLibraryAPI.Services.Genre
{
    public interface IGenreService
    {
        Task<IEnumerable<GenreDTO>> GetGenresAsync();
        Task<GenreDTO> GetGenreByIdAsync(int id);
        Task<GenreDTO> AddGenreAsync(GenreDTO genreDTO);
        Task<GenreDTO> UpdateGenreAsync(int id, GenreDTO genreDTO);
        Task<bool> DeleteGenreAsync(int id);
    }
}