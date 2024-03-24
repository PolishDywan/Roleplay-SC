using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Core.Abstractions.ScriptStrategy;
using Server.DataAccessLayer.Context;
using Server.DataAccessLayer.Services.Base;
using Server.Database.Models.Inventory;

namespace Server.DataAccessLayer.Services;

public class ItemPhoneService : BaseService<ItemPhoneModel>, ITransientScript
{
    private readonly IDbContextFactory<DatabaseContext> _dbContextFactory;

    public ItemPhoneService(IDbContextFactory<DatabaseContext> dbContextFactory) : base(dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    public override async Task<List<ItemPhoneModel>> GetAll()
    {
        await using var dbContext = await _dbContextFactory.CreateDbContextAsync();
        return await dbContext.ItemPhones.Include(i => i.Contacts).Include(i => i.Chats).ThenInclude(c => c.Messages)
            .Include(i => i.Notifications).Include(i => i.CatalogItemModel).Include(i => i.InventoryModel)
            .ThenInclude(i => i.CharacterModel).ToListAsync();
    }

    public async Task<ItemPhoneModel?> GetByKey(int id)
    {
        await using var dbContext = await _dbContextFactory.CreateDbContextAsync();
        return await dbContext.ItemPhones.Include(i => i.Contacts).Include(i => i.Chats).ThenInclude(c => c.Messages)
            .Include(i => i.Notifications).Include(i => i.CatalogItemModel).Include(i => i.InventoryModel)
            .ThenInclude(i => i.CharacterModel).FirstOrDefaultAsync(i => i.Id == id);
    }

    public override async Task<ItemPhoneModel?> Find(Expression<Func<ItemPhoneModel, bool>> expression)
    {
        await using var dbContext = await _dbContextFactory.CreateDbContextAsync();
        return await dbContext.ItemPhones.Include(i => i.Contacts).Include(i => i.Chats).ThenInclude(c => c.Messages)
            .Include(i => i.Notifications).Include(i => i.CatalogItemModel).Include(i => i.InventoryModel)
            .ThenInclude(i => i.CharacterModel).FirstOrDefaultAsync(expression);
    }

    public override async Task<List<ItemPhoneModel>> Where(Expression<Func<ItemPhoneModel, bool>> expression)
    {
        await using var dbContext = await _dbContextFactory.CreateDbContextAsync();
        return await dbContext.ItemPhones.Include(i => i.Contacts).Include(i => i.Chats).ThenInclude(c => c.Messages)
            .Include(i => i.Notifications).Include(i => i.CatalogItemModel).Include(i => i.InventoryModel)
            .ThenInclude(i => i.CharacterModel).Where(expression).ToListAsync();
    }
}