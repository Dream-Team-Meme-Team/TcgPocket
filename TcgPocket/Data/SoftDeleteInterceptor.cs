using Microsoft.EntityFrameworkCore.Diagnostics;

namespace TcgPocket.Data;

public class SoftDeleteInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        if (eventData.Context is null) return result;

        foreach (var entry in eventData.Context.ChangeTracker.Entries())
        {
            // TODO: things and stuff maybe, idk this is just here for something
        }

        return result;
    }
}