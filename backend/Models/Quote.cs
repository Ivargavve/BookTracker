namespace backend.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public int UserId { get; set; } // The ID of the user who created the quote
    }
}
