using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers;

[Route("[controller]")]
[ApiController]
public class BookController : Controller
{
    private BookDbContext _context;
    
    public BookController(BookDbContext temp)
    {
        _context = temp;
    }

    [HttpGet]
    public IEnumerable<Book> GetBooks()
    {
        return _context.Books.ToList();
    }
    
    [HttpGet("Alphabetical")]
    public IEnumerable<Book> GetAscendingBooks()
    {
        return _context.Books
            .ToList()
            .OrderBy(b => b.Title);
    }
}