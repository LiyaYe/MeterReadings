using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeterReadings.Data.Contexts;
using MeterReadings.Models.Interfaces;
using MeterReadings.Models;
using MeterReadings.Data.EntityModels;
using MeterReadings.Extensions.DbContext;

namespace MeterReadings.Controllers
{
    public class CustomerAccountsController : Controller
    {
        private readonly MeterReadingsContext _context;

        public CustomerAccountsController(MeterReadingsContext context)
        {
            _context = context;
        }

        // GET: CustomerAccounts
        public async Task<IActionResult> Index()
        {
            return View(await _context.CustomerAccounts.ToListAsync());
        }

        public IEnumerable<ICustomerAccount> GetAll()
        {
            return _context.CustomerAccounts.ToList();
        }

        // GET: CustomerAccounts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customerAccount = await _context.CustomerAccounts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (customerAccount == null)
            {
                return NotFound();
            }

            return View(customerAccount);
        }

        // POST: CustomerAccounts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("AccountId,FirstName,LastName")] ICustomerAccount customerAccount)
        {
            if (ModelState.IsValid)
            {
                _context.Add(customerAccount);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(customerAccount);
        }

        // Creates several Customer Account Entries
        [HttpPost]
        public int Import([FromBody] CustomerAccountEntity[] customerAccounts)
        {
            var successfulEntries = 0;

            if (ModelState.IsValid)
            {
                foreach (var customerAccount in customerAccounts)
                {
                    if (_context.CustomerAccounts.AddIfNotExists(customerAccount, ca => ca.AccountId == customerAccount.AccountId)) {
                        successfulEntries++;
                    }
                }

                _context.SaveChanges();

                return successfulEntries;
            }

            return -1;
        }

        // GET: CustomerAccounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customerAccount = await _context.CustomerAccounts.FindAsync(id);
            if (customerAccount == null)
            {
                return NotFound();
            }
            return View(customerAccount);
        }

        // POST: CustomerAccounts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AccountId,FirstName,LastName")] ICustomerAccount customerAccount)
        {
            if (id != customerAccount.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(customerAccount);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CustomerAccountExists(customerAccount.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(customerAccount);
        }

        // GET: CustomerAccounts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customerAccount = await _context.CustomerAccounts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (customerAccount == null)
            {
                return NotFound();
            }

            return View(customerAccount);
        }

        // POST: CustomerAccounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var customerAccount = await _context.CustomerAccounts.FindAsync(id);
            _context.CustomerAccounts.Remove(customerAccount);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CustomerAccountExists(int id)
        {
            return _context.CustomerAccounts.Any(e => e.Id == id);
        }
    }
}
