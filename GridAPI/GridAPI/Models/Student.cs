namespace GridAPI.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Mark { get; set; }
        public DateTime PassSubject { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
