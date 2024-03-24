using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Server.DataAccessLayer.Context;

public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
{
    public DatabaseContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
        // Zaktualizowany ciąg połączenia dla MySQL
        var connectionString = "server=localhost;database=southcentral;user=postgres;password=admin;";
        // Konfiguracja opcji z użyciem Pomelo.EntityFrameworkCore.MySql

        optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        return new DatabaseContext(optionsBuilder.Options);
    }
}
