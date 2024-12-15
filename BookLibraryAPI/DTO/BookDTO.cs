namespace BookLibraryAPI.DTO
{
    public class BookDTO
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public int GenreId { get; set; }
        public string AuthorName { get; set; } 
        public string GenreName { get; set; } 
        public int PublicationYear { get; set; }
    }
}