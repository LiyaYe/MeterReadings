using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace MeterReadings.Extensions.DbContext
{
    public static class DbSetExtensions
    {
        public static Boolean AddIfNotExists<T>(this DbSet<T> dbSet, T entity, Expression<Func<T, bool>> predicate = null) where T : class, new()
        {
            var exists = predicate != null ? dbSet.Any(predicate) : dbSet.Any();

            if (!exists)
            {
                dbSet.Add(entity);
            }

            return !exists;
        }
    }
}