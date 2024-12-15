using BookLibraryAPI.Repositories.Genre;
using Serilog;
using BookLibraryAPI.DTO;
using BookLibraryAPI.Services.Genre;

namespace BookLibraryAPI.Services
{
    public class GenreService(IGenreRepository genreRepository) : IGenreService
    {
        private readonly IGenreRepository _genreRepository = genreRepository;

        // Get all genres
        public async Task<IEnumerable<GenreDTO>> GetGenresAsync()
        {
            try
            {
                return await _genreRepository.GetGenresAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while getting genres.");
                throw;
            }
        }

        // Get genre by ID
        public async Task<GenreDTO> GetGenreByIdAsync(int id)
        {
            try
            {
                return await _genreRepository.GetGenreByIdAsync(id);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while getting genre with ID {GenreId}.", id);
                throw;
            }
        }

        // Add a new genre
        public async Task<GenreDTO> AddGenreAsync(GenreDTO genreDTO)
        {
            try
            {
                var genre = new Models.Genre
                {
                    Name = genreDTO.Name
                };

                var addedGenre = await _genreRepository.AddGenreAsync(genre);

                return new GenreDTO
                {
                    GenreId = addedGenre.GenreId,
                    Name = addedGenre.Name
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while adding genre with name {GenreName}.", genreDTO.Name);
                throw;
            }
        }

        // Update an existing genre
        public async Task<GenreDTO> UpdateGenreAsync(int id, GenreDTO genreDTO)
        {
            try
            {
                var genre = new Models.Genre
                {
                    GenreId = id,
                    Name = genreDTO.Name
                };

                var updatedGenre = await _genreRepository.UpdateGenreAsync(genre);

                return new GenreDTO
                {
                    GenreId = updatedGenre.GenreId,
                    Name = updatedGenre.Name
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while updating genre with ID {GenreId}.", id);
                throw;
            }
        }

        // Delete a genre by ID
        public async Task<bool> DeleteGenreAsync(int id)
        {
            try
            {
                return await _genreRepository.DeleteGenreAsync(id);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while deleting genre with ID {GenreId}.", id);
                throw;
            }
        }
    }
}