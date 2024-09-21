using GridAPI.Data;
using GridAPI.DTOs;
using GridAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GridAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GridController : ControllerBase
    {
        private readonly DataContext _context;

        public GridController(DataContext context)
        { 
            _context = context;
        }

        //
        //Students
        //

        [HttpGet("students")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("students/{id}")]
        public async Task<ActionResult<Student>> GetStudentById(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        [HttpPost("students")]
        public async Task<ActionResult<IEnumerable<Student>>> PostStudents(StudentDto request)
        {
            var newStudent = new Student
            {
                Name = request.Name,
                SubjectId = request.SubjectId,
                Mark = request.Mark,
                PassSubject = request.PassSubject,
            };

            _context.Students.Add(newStudent);
            await _context.SaveChangesAsync();

            return await _context.Students.ToListAsync();
        }

        //
        //Subjects
        //

        [HttpGet("subjects")]
        public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects()
        {
            return await _context.Subjects.ToListAsync();
        }

        [HttpGet("subjects/{id}")]
        public async Task<ActionResult<Subject>> GetSubjectById(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);

            if (subject == null)
            {
                return NotFound();
            }

            return subject;
        }

        [HttpPost("subjects")]
        public async Task<ActionResult<IEnumerable<Subject>>> PostSubjects(SubjectDto request)
        {
            var newSubject = new Subject
            {
                Name= request.Name,
                DateExam = request.DateExam,
                
            };

            _context.Subjects.Add(newSubject);
            await _context.SaveChangesAsync();

            return await _context.Subjects.ToListAsync();
        }


    }
}
