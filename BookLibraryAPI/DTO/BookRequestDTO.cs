namespace BookLibraryAPI.DTO
{
    public class BookRequestDTO
    {
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public int GenreId { get; set; }
        public int PublicationYear { get; set; }
    }
}