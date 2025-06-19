namespace backend.Models
{
    public class Book
    {
        public int Id { get; set; } // Primärnyckel
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public DateTime PublishedDate { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}
