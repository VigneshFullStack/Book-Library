using BookLibraryAPI.Data;
using BookLibraryAPI.DTO;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace BookLibraryAPI.Repositories.Author
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly BookLibraryContext _context;

        public AuthorRepository(BookLibraryContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AuthorDTO>> GetAuthorsAsync()
        {
            try
            {
                return await _context.Authors
                    .Select(a => new AuthorDTO
                    {
                        AuthorId = a.AuthorId,
                        Name = a.Name,
                        Bio = a.Bio
                    }).ToListAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching authors.");
                throw;
            }
        }

        public async Task<AuthorDTO> GetAuthorByIdAsync(int id)
        {
            try
            {
                var author = await _context.Authors
                    .Where(a => a.AuthorId == id)
                    .Select(a => new AuthorDTO
                    {
                        AuthorId = a.AuthorId,
                        Name = a.Name,
                        Bio = a.Bio
                    })
                    .FirstOrDefaultAsync();

                if (author == null)
                {
                    Log.Warning("Author with ID {AuthorId} not found.", id);
                    return null;
                }

                return author;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching author with ID {AuthorId}.", id);
                throw;
            }
        }

        public async Task<AuthorDTO> AddAuthorAsync(Models.Author author)
        {
            try
            {
                _context.Authors.Add(author);
                await _context.SaveChangesAsync();

                return new AuthorDTO
                {
                    AuthorId = author.AuthorId,
                    Name = author.Name,
                    Bio = author.Bio
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while adding new author with name {AuthorName}.", author.Name);
                throw;
            }
        }

        public async Task<AuthorDTO> UpdateAuthorAsync(Models.Author author)
        {
            try
            {
                var existingAuthor = await _context.Authors.FindAsync(author.AuthorId);
                if (existingAuthor == null)
                {
                    throw new KeyNotFoundException("Author not found.");
                }

                existingAuthor.Name = author.Name;
                existingAuthor.Bio = author.Bio;

                await _context.SaveChangesAsync();

                return new AuthorDTO
                {
                    AuthorId = existingAuthor.AuthorId,
                    Name = existingAuthor.Name,
                    Bio = existingAuthor.Bio
                };
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while updating author with ID {AuthorId}.", author.AuthorId);
                throw;
            }
        }

        public async Task<bool> DeleteAuthorAsync(int id)
        {
            try
            {
                var author = await _context.Authors.FindAsync(id);
                if (author != null)
                {
                    _context.Authors.Remove(author);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while deleting author with ID {AuthorId}.", id);
                throw;
            }
        }
    }
}