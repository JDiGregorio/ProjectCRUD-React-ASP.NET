using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectCRUD.Models;
using System.Text.RegularExpressions;

namespace ProjectCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly PubContext _dbcontext;

        public ContactController(PubContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("GetContacts")]
        public async Task<IActionResult> GetContacts()
        {
            List<Contact> contacts = await _dbcontext.Contacts.OrderByDescending(contact => contact.IdContact).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, contacts);
        }

        [HttpPost]
        [Route("StoreContact")]
        public async Task<IActionResult> StoreContact([FromBody] Contact contact) {
            await _dbcontext.Contacts.AddAsync(contact);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");

        }

        [HttpPut]
        [Route("EditContact")]
        public async Task<IActionResult> EditContact([FromBody] Contact contact)
        {
            _dbcontext.Contacts.Update(contact);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("DeleteContact/{id:int}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            Contact contact = _dbcontext.Contacts.Find(id);

            _dbcontext.Contacts.Remove(contact);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");

        }
    }
}