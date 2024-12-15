using Microsoft.AspNetCore.Mvc;
using Serilog;
using BookLibraryAPI.DTO;
using BookLibraryAPI.Services.Genre;

namespace BookLibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController(IGenreService genreService) : ControllerBase
    {
        private readonly IGenreService _genreService = genreService;

        // Get all genres
        [HttpGet]
        public async Task<IActionResult> GetGenres()
        {
            try
            {
                var genreDtos = await _genreService.GetGenresAsync();
                return Ok(genreDtos);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching genres.");
                return StatusCode(500, "An error occurred while fetching genres.");
            }
        }

        // Get genre by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenre(int id)
        {
            try
            {
                var genreDto = await _genreService.GetGenreByIdAsync(id);
                if (genreDto == null) return NotFound();
                return Ok(genreDto);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching genre with ID {GenreId}.", id);
                return StatusCode(500, "An error occurred while fetching the genre.");
            }
        }

        // Add a new genre
        [HttpPost]
        public async Task<IActionResult> AddGenre([FromBody] GenreDTO genreDTO)
        {
            if (genreDTO == null || !ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdGenre = await _genreService.AddGenreAsync(genreDTO);
                return CreatedAtAction(nameof(GetGenre), new { id = createdGenre.GenreId }, createdGenre);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while adding new genre.");
                return StatusCode(500, "An error occurred while adding the genre.");
            }
        }

        // Update an existing genre
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGenre(int id, [FromBody] GenreDTO genreDTO)
        {
            if (genreDTO == null || !ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedGenre = await _genreService.UpdateGenreAsync(id, genreDTO);
                if (updatedGenre == null)
                    return NotFound("Genre not found.");

                return Ok(updatedGenre);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while updating genre with ID {GenreId}.", id);
                return StatusCode(500, "An error occurred while updating the genre.");
            }
        }

        // Delete a genre
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            try
            {
                var result = await _genreService.DeleteGenreAsync(id);
                if (!result)
                {
                    return NotFound("Genre not found.");
                }

                return Ok(new { Success = true, Message = "Genre deleted successfully." });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while deleting genre with ID {GenreId}.", id);
                return StatusCode(500, new { Success = false, Message = "An error occurred while deleting the genre." });
            }
        }
    }
}