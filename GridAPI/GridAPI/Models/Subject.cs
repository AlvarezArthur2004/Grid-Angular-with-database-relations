namespace GridAPI.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime DateExam { get; set; }
        public List<Student> Student { get; set; }
    }
}
