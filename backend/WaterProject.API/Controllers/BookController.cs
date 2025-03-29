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
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "default", [FromQuery] List<string>? bookTypes = null)
    {
        var query = _context.Books.AsQueryable();

        if (bookTypes != null && bookTypes.Any())
        {
            query= query.Where(b => bookTypes.Contains(b.Category));
        }

        if (sortOrder ==  "title")
        {
            query = query.OrderBy(b => b.Title);
        }
        
        var totalNumBooks = query.Count();
        
        var something = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        return Ok(new
        {
            Books = something,
            TotalNumBooks = totalNumBooks
        });
    }

    [HttpGet("GetBookTypes")]
    public IActionResult GetBookTypes()
    {
        var bookTypes = _context.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        
        return Ok(bookTypes);
    }
}