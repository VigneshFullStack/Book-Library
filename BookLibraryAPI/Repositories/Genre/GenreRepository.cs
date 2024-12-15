using BookLibraryAPI.Data;
using Microsoft.EntityFrameworkCore;
using BookLibraryAPI.DTO;
using Serilog;

namespace BookLibraryAPI.Repositories.Genre
{
    public class GenreRepository(BookLibraryContext context) : IGenreRepository
    {
        private readonly BookLibraryContext _context = context;

        // Get all genres
        public async Task<IEnumerable<GenreDTO>> GetGenresAsync()
        {
            try
            {
                return await _context.Genres
                    .Select(g => new GenreDTO
                    {
                        GenreId = g.GenreId,
                        Name = g.Name
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching genres.");
                throw;
            }
        }

        // Get genre by ID
        public async Task<GenreDTO> GetGenreByIdAsync(int id)
        {
            try
            {
                var genre = await _context.Genres
                    .FirstOrDefaultAsync(g => g.GenreId == id);

                if (genre == null)
                {
                    Log.Warning("Genre with ID {GenreId} not found.", id);
                    return null;
                }

                return new GenreDTO
                {
                    GenreId = genre.GenreId,
                    Name = genre.Name
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching genre with ID {GenreId}.", id);
                throw;
            }
        }

        // Add a new genre
        public async Task<GenreDTO> AddGenreAsync(Models.Genre genre)
        {
            try
            {
                _context.Genres.Add(genre);
                await _context.SaveChangesAsync();
                return new GenreDTO
                {
                    GenreId = genre.GenreId,
                    Name = genre.Name
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while adding new genre with name {GenreName}.", genre.Name);
                throw;
            }
        }

        // Update an existing genre
        public async Task<GenreDTO> UpdateGenreAsync(Models.Genre genre)
        {
            try
            {
                var existingGenre = await _context.Genres.FindAsync(genre.GenreId);
                if (existingGenre == null)
                {
                    throw new KeyNotFoundException("Genre not found.");
                }

                existingGenre.Name = genre.Name;
                await _context.SaveChangesAsync();

                return new GenreDTO
                {
                    GenreId = existingGenre.GenreId,
                    Name = existingGenre.Name
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while updating genre with ID {GenreId}.", genre.GenreId);
                throw;
            }
        }

        // Delete a genre by ID
        public async Task<bool> DeleteGenreAsync(int id)
        {
            try
            {
                var genre = await _context.Genres.FindAsync(id);
                if (genre != null)
                {
                    _context.Genres.Remove(genre);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while deleting genre with ID {GenreId}.", id);
                throw;
            }
        }
    }
}