using Microsoft.AspNetCore.Mvc;
using BookLibraryAPI.Models;
using Serilog;
using BookLibraryAPI.DTO;
using System;
using System.Threading.Tasks;
using BookLibraryAPI.Services.Book;

namespace BookLibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController(IBookService bookService) : ControllerBase
    {
        private readonly IBookService _bookService = bookService;

        // Get all books
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            try
            {
                var bookDtos = await _bookService.GetBooksAsync();
                return Ok(bookDtos);
            }
            catch (Exception ex)
            {
                // Log and return a proper error message
                Log.Error(ex, "Error while fetching books.");
                return StatusCode(500, "An error occurred while fetching books.");
            }
        }

        // Get book by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            try
            {
                var bookDto = await _bookService.GetBookByIdAsync(id);
                if (bookDto == null) return NotFound();
                return Ok(bookDto);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while fetching book with ID {BookId}.", id);
                return StatusCode(500, "An error occurred while fetching the book.");
            }
        }

        // Add a new book
        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] BookRequestDTO bookRequest)
        {
            if (bookRequest == null || !ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdBook = await _bookService.AddBookAsync(bookRequest);
                return CreatedAtAction(nameof(GetBook), new { id = createdBook.BookId }, createdBook);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while adding new book.");
                return StatusCode(500, "An error occurred while adding the book.");
            }
        }

        // Update an existing book
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookRequestDTO bookRequest)
        {
            if (bookRequest == null || !ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedBook = await _bookService.UpdateBookAsync(id, bookRequest);
                if (updatedBook == null)
                    return NotFound("Book not found.");

                return Ok(updatedBook);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while updating book with ID {BookId}.", id);
                return StatusCode(500, "An error occurred while updating the book.");
            }
        }

        // Delete a book
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                var result = await _bookService.DeleteBookAsync(id);
                if (!result)
                {
                    return NotFound("Book not found.");
                }

                return Ok(new { Success = true, Message = "Book deleted successfully." });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error while deleting book with ID {BookId}.", id);
                return StatusCode(500, new { Success = false, Message = "An error occurred while deleting the book." });
            }
        }
    }
}