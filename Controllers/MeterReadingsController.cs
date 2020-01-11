using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeterReadings.Data.Contexts;
using MeterReadings.Models.Interfaces;
using System.Collections.Generic;
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
            return View(await _context.MeterReading.ToListAsync());
        }

        public IEnumerable<IMeterReading> GetAll()
        {
            return  _context.MeterReading.ToList();
        }

        // GET: MeterReadings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var meterReading = await _context.MeterReading
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
        public int Import([FromBody] MeterReading[] meterReadings)
        {
            if (ModelState.IsValid)
            {
                foreach (var meterReading in meterReadings)
                {
                    _context.Add(meterReading);
                }

                return _context.SaveChanges();
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

            var meterReading = await _context.MeterReading.FindAsync(id);
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

            var meterReading = await _context.MeterReading
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
            var meterReading = await _context.MeterReading.FindAsync(id);
            _context.MeterReading.Remove(meterReading);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MeterReadingExists(int id)
        {
            return _context.MeterReading.Any(e => e.Id == id);
        }
    }
}
