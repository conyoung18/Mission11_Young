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
    public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "default")
    {
        var query = _context.Books.AsQueryable();

        if (sortOrder ==  "title")
        {
            query = query.OrderBy(b => b.Title);
        }
        
        var something = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        var totalNumBooks = _context.Books.Count();

        return Ok(new
        {
            Books = something,
            TotalNumBooks = totalNumBooks
        });
    }
}