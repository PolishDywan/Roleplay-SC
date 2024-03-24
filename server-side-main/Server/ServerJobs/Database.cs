
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using AltV.Net;
using AltV.Net.Elements.Entities;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Server.Core.Abstractions;
using Server.Core.Callbacks;
using Server.Core.Configuration;
using Server.Core.Entities;
using Server.DataAccessLayer.Context;
using Server.Database.Models.Character;

namespace Server.ServerJobs;

public class Database : IJob
{
    private readonly IDbContextFactory<DatabaseContext> _dbContextFactory;
    private readonly DevelopmentOptions _devOptions;
    private readonly ILogger<Database> _logger;

    public Database(ILogger<Database> logger, IDbContextFactory<DatabaseContext> dbContextFactory,
        IOptions<DevelopmentOptions> devOptions)
    {
        _logger = logger;
        _dbContextFactory = dbContextFactory;
        _devOptions = devOptions.Value;
    }

    public Task OnSave()
    {
        var playersTask = Task.Run(async () => {
            var charsToUpdate = new List<CharacterModel>();
            var callback = new AsyncFunctionCallback<IPlayer>(async player => {
                var serverPlayer = (ServerPlayer)player;

                if (serverPlayer.IsSpawned)
                {
                    serverPlayer.CharacterModel.Position = serverPlayer.Position;
                    serverPlayer.CharacterModel.Rotation = serverPlayer.Rotation;

                    serverPlayer.CharacterModel.Health = serverPlayer.Health;
                    serverPlayer.CharacterModel.Armor = serverPlayer.Armor;

                    charsToUpdate.Add(serverPlayer.CharacterModel);
                }

                await Task.CompletedTask;
            });

            await Alt.ForEachPlayers(callback);

            await using var dbContext = await _dbContextFactory.CreateDbContextAsync();
            dbContext.Characters.UpdateRange(charsToUpdate);
            await dbContext.SaveChangesAsync();
        });

        return Task.WhenAll(playersTask);
    }

    public async Task OnShutdown()
    {
        await Task.CompletedTask;
    }

    public async Task OnStartup()
    {
        await using var dbContext = await _dbContextFactory.CreateDbContextAsync();

        // Commenting out the section that drops the database to prevent table deletion
        /*
        if (_devOptions.DropDatabaseAtStartup)
        {
            if (!_devOptions.LocalDb)
            {
                await dbContext.Database.ExecuteSqlRawAsync("GRANT CONNECT ON DATABASE scdb TO public;");
            }

            await dbContext.Database.EnsureDeletedAsync();
            _logger.LogWarning("Database dropped.");
        }
        */

        // Ensuring database migration applies without dropping existing tables
        await dbContext.Database.MigrateAsync();

        if (_devOptions.SeedingDefaultDataIntoDatabase)
        {
            await dbContext.SaveChangesAsync();

            _logger.LogInformation("Seed default data.");
        }

        await Task.CompletedTask;
    }
}