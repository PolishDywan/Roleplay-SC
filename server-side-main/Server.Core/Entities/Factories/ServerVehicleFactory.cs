using System;
using AltV.Net;
using AltV.Net.Elements.Entities;

namespace Server.Core.Entities.Factories;

public class ServerVehicleFactory : IEntityFactory<IVehicle>
{
    public IVehicle Create(ICore server, IntPtr playerPointer, uint id)
    {
        return new ServerVehicle(server, playerPointer, (ushort)id);
    }
}