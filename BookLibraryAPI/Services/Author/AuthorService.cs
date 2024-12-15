using BookLibraryAPI.DTO;
using BookLibraryAPI.Repositories.Author;
using Serilog;

namespace BookLibraryAPI.Services.Author
{
    public class AuthorService(IAuthorRepository authorRepository) : IAuthorService
    {
        private readonly IAuthorRepository _authorRepository = authorRepository;

        public async Task<IEnumerable<AuthorDTO>> GetAuthorsAsync()
        {
            try
            {
                return await _authorRepository.GetAuthorsAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while getting authors.");
                throw;
            }
        }

        public async Task<AuthorDTO> GetAuthorByIdAsync(int id)
        {
            try
            {
                return await _authorRepository.GetAuthorByIdAsync(id);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while getting author with ID {AuthorId}.", id);
                throw;
            }
        }

        public async Task<AuthorDTO> AddAuthorAsync(AuthorDTO authorDTO)
        {
            try
            {
                var author = new Models.Author
                {
                    Name = authorDTO.Name,
                    Bio = authorDTO.Bio
                };

                return await _authorRepository.AddAuthorAsync(author);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while adding author with name {AuthorName}.", authorDTO.Name);
                throw;
            }
        }

        public async Task<AuthorDTO> UpdateAuthorAsync(int id, AuthorDTO authorDTO)
        {
            try
            {
                var author = new Models.Author
                {
                    AuthorId = id,
                    Name = authorDTO.Name,
                    Bio = authorDTO.Bio
                };

                return await _authorRepository.UpdateAuthorAsync(author);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while updating author with ID {AuthorId}.", id);
                throw;
            }
        }

        public async Task<bool> DeleteAuthorAsync(int id)
        {
            try
            {
                return await _authorRepository.DeleteAuthorAsync(id);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while deleting author with ID {AuthorId}.", id);
                throw;
            }
        }
    }
}