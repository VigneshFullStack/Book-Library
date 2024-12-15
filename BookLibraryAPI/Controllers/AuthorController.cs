using Microsoft.AspNetCore.Mvc;
using Serilog;
using BookLibraryAPI.DTO;
using BookLibraryAPI.Services.Author;

namespace BookLibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController(IAuthorService authorService) : ControllerBase
    {
        private readonly IAuthorService _authorService = authorService;

        // Get all authors
        [HttpGet]
        public async Task<IActionResult> GetAuthors()
        {
            try
            {
                var authorDtos = await _authorService.GetAuthorsAsync();
                return Ok(authorDtos);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching authors.");
                return StatusCode(500, "An error occurred while fetching authors.");
            }
        }

        // Get author by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthor(int id)
        {
            try
            {
                var authorDto = await _authorService.GetAuthorByIdAsync(id);
                if (authorDto == null) return NotFound();
                return Ok(authorDto);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching author with ID {AuthorId}.", id);
                return StatusCode(500, "An error occurred while fetching the author.");
            }
        }

        // Add a new author
        [HttpPost]
        public async Task<IActionResult> AddAuthor([FromBody] AuthorDTO authorDTO)
        {
            if (authorDTO == null || !ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdAuthor = await _authorService.AddAuthorAsync(authorDTO);
                return CreatedAtAction(nameof(GetAuthor), new { id = createdAuthor.AuthorId }, createdAuthor);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while adding new author.");
                return StatusCode(500, "An error occurred while adding the author.");
            }
        }

        // Update an existing author
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(int id, [FromBody] AuthorDTO authorDTO)
        {
            if (authorDTO == null || !ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedAuthor = await _authorService.UpdateAuthorAsync(id, authorDTO);
                if (updatedAuthor == null)
                    return NotFound("Author not found.");

                return Ok(updatedAuthor);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while updating author with ID {AuthorId}.", id);
                return StatusCode(500, "An error occurred while updating the author.");
            }
        }

        // Delete an author
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            try
            {
                var result = await _authorService.DeleteAuthorAsync(id);
                if (!result)
                {
                    return NotFound("Author not found.");
                }

                return Ok(new { Success = true, Message = "Author deleted successfully." });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while deleting author with ID {AuthorId}.", id);
                return StatusCode(500, new { Success = false, Message = "An error occurred while deleting the author." });
            }
        }
    }
}