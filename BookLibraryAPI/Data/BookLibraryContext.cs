using Microsoft.EntityFrameworkCore;
using BookLibraryAPI.Models;

namespace BookLibraryAPI.Data
{
    public class BookLibraryContext(DbContextOptions<BookLibraryContext> options) : DbContext(options)
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Genre> Genres { get; set; }
    }
}
