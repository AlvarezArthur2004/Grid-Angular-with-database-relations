using GridAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GridAPI.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 
        
        }

        public DbSet<Student> Students { get; set; }

        public DbSet<Subject> Subjects { get; set; }
    }
}
