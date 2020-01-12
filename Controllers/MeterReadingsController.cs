using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeterReadings.Data.Contexts;
using MeterReadings.Models.Interfaces;
using System.Collections.Generic;
using MeterReadings.Extensions.DbContext;
using MeterReadings.Data.EntityModels;
using System;
using MeterReadings.Models;

namespace MeterReadings.Controllers
{
    public class MeterReadingsController : Controller
    {
        private readonly MeterReadingsContext _context;

        public MeterReadingsController(MeterReadingsContext context)
        {
            _context = context;
        }

        // GET: MeterReadings
        public async Task<IActionResult> Index()
        {
            return View(await _context.MeterReadings.ToListAsync());
        }

        public IMeterReadingStats GetStats(Int32 accountId, DateTime? from, DateTime? to)
        {
            var result = _context.MeterReadings
                .Where(m => m.AccountId == accountId && m.MeterReadDateTime >= from && m.MeterReadDateTime < to)
                .OrderByDescending(m => m.MeterReadDateTime);

            return new MeterReadingStats {
                TotalCount = result.Count(),
                TotalValue = Int32.TryParse(result.FirstOrDefault()?.MeterReadValue, out Int32 Value) ? Value : 0
            };
        }

        public IEnumerable<IMeterReading> GetAll()
        {
            return _context.MeterReadings;
        }

        public IEnumerable<IMeterReading> Search(Int32 accountId, DateTime? from, DateTime? to)
        {
            return _context.MeterReadings
                .Where(m => m.AccountId == accountId && m.MeterReadDateTime >= from && m.MeterReadDateTime < to);
        }

        // GET: MeterReadings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var meterReading = await _context.MeterReadings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (meterReading == null)
            {
                return NotFound();
            }

            return View(meterReading);
        }

        // GET: MeterReadings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MeterReadings/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AccountId,MeterReadDateTime,MeterReadValue")] IMeterReading meterReading)
        {
            if (ModelState.IsValid)
            {
                _context.Add(meterReading);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(meterReading);
        }

        // Creates several Customer Account Entries
        [HttpPost]
        public int Import([FromBody] MeterReadingEntity[] meterReadings)
        {
            var successfulEntries = 0;

            if (ModelState.IsValid)
            {
                foreach (var meterReading in meterReadings)
                {
                    if (_context.CustomerAccounts.FirstOrDefault(ca => ca.AccountId == meterReading.AccountId) != null
                        && _context.MeterReadings.AddIfNotExists(meterReading,
                        m => m.AccountId == meterReading.AccountId && m.MeterReadDateTime == meterReading.MeterReadDateTime))
                    {
                        successfulEntries++;
                    }
                }

                _context.SaveChanges();

                return successfulEntries;
            }

            return -1;
        }

        // GET: MeterReadings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var meterReading = await _context.MeterReadings.FindAsync(id);
            if (meterReading == null)
            {
                return NotFound();
            }
            return View(meterReading);
        }

        // POST: MeterReadings/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AccountId,MeterReadingDateTime,MeterReadValue")] IMeterReading meterReading)
        {
            if (id != meterReading.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(meterReading);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MeterReadingExists(meterReading.Id))
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
            return View(meterReading);
        }

        // GET: MeterReadings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var meterReading = await _context.MeterReadings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (meterReading == null)
            {
                return NotFound();
            }

            return View(meterReading);
        }

        // POST: MeterReadings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var meterReading = await _context.MeterReadings.FindAsync(id);
            _context.MeterReadings.Remove(meterReading);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MeterReadingExists(int id)
        {
            return _context.MeterReadings.Any(e => e.Id == id);
        }
    }
}
