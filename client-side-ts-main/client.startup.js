var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from "tsyringe";
import { SessionHandler } from "handlers/session.handler";
import { CharacterCreatorHandler } from "handlers/character/character-creator.handler";
import { PlayerHandler } from "handlers/player.handler";
import { InventoryHandler } from "handlers/inventory.handler";
import { ChatHandler } from "handlers/chat.handler";
import { CharacterHandler } from "handlers/character/character.handler";
import { VehicleSelectorHandler } from "handlers/character/vehicle-selector.handler";
import { VehicleHandler } from "handlers/vehicle.handler";
import { WebviewHandler } from "handlers/webview.handler";
import { TuningHandler } from "handlers/tuning.handler";
import { FreeCamHandler } from "handlers/freecam.handler";
import { NotificationHandler } from "handlers/notification.handler";
import { AuthenticationHandler } from "handlers/authentication.handler";
import { TutorialHandler } from "handlers/tutorial.handler";
import { NameTagHandler } from "handlers/name-tag.handler";
import { HudHandler } from "handlers/hud.handler";
import { ContextMenuHandler } from "handlers/context-menu.handler";
import { PhoneHandler } from "handlers/phone.handler";
import { AdminHandler } from "handlers/admin.handler";
import { HouseHandler } from "handlers/house/house.handler";
import { SubTitleHandler } from "handlers/sub-title.handler";
import { HouseSelectorHandler } from "handlers/character/house-selector.handler";
import { SpawnSelectorHandler } from "handlers/character/spawn-selector.handler";
import { DefinedJobHandler } from "handlers/defined-job.handler";
import { BankHandler } from "handlers/bank.handler";
import { VehicleInventoryHandler } from "handlers/vehicle-inventory.handler";
import { PublicGarageHandler } from "handlers/public-garage.handler";
import { GroupDataHandler } from "handlers/group/group-data.handler";
import { GroupsMenuHandler } from "handlers/group/groups-menu.handler";
import { WaypointHandler } from "handlers/waypoint.handler";
import { DialogHandler } from "handlers/dialog.handler";
import { InteriorHandler } from "handlers/interior.handler";
import { SupermarketHandler } from "handlers/company/supermarket.handler";
import { AmmunationHandler } from "handlers/company/ammunation.handler";
import { MenuHandler } from "handlers/menu.handler";
import { CountdownHandler } from "handlers/countdown.handler";
import { AccountHandler } from "handlers/account.handler";
import { VehicleCatalogHandler } from "handlers/vehicle-catalog.handler";
import { AdminPrisonHandler } from "handlers/admin-prison.handler";
import { HairSalonHandler } from "handlers/company/hair-salon.handler";
import { TattooStudioHandler } from "handlers/company/tattoo-studio.handler";
import { ClothingStoreHandler } from "handlers/company/clothing-store.handler";
import { DrivingSchoolHandler } from "handlers/driving-school.handler";
import { WeatherHandler } from "handlers/weather.handler";
import { WeaponHandler } from "handlers/weapon.handler";
import { GasStationHandler } from "handlers/company/gas-station.handler";
import { ClothingHandler } from "handlers/clothing.handler";
import { AnimationsHandler } from "handlers/animations.handler";
import { PlayersListHandler } from "handlers/players-list.handler";
import { ObjectSyncHandler } from "handlers/entity-sync/object-sync.handler";
import { MarkerSyncHandler } from "handlers/entity-sync/marker-sync.handler";
import { PedSyncHandler } from "handlers/entity-sync/ped-sync.handler";
import { AnimationWheelHandler } from "handlers/animation-wheel.handler";
import { DeathHandler } from "handlers/death.handler";
import { DoorSyncHandler } from "handlers/entity-sync/door-sync.handler";
import { BlipSyncHandler } from "handlers/entity-sync/blip-sync.handler";
import { MdcHandler } from "handlers/mdc.handler";
import { EmergencyCallHandler } from "handlers/emergency-call.handler";
import { PoliceMdcHandler } from "handlers/police-mdc.handler";
import { VehicleSirenHandler } from "handlers/vehicle-siren.handler";
import { FireMdcHandler } from "handlers/fire-mdc.handler";
import { PrisonHandler } from "handlers/prison.handler";
import { FriskHandler } from "handlers/frisk.handler";
import { CharacterSelectorHandler } from "handlers/character/character-selector.handler";
import { LockpickingHandler } from "handlers/lockpicking.handler";
import { VehicleServiceHandler } from "handlers/vehicle-service.handler";
let ClientStartup = class ClientStartup {
    VehicleServiceHandler;
    friskHandler;
    prisonHandler;
    fireMdcHandler;
    vehicleSirenHandler;
    policeMdcHandler;
    emergencyCallHandler;
    mdcHandler;
    blipSyncHandler;
    doorSyncHandler;
    pedSyncHandler;
    markerSyncHandler;
    objectSyncHandler;
    playersList;
    animationWheelHandler;
    animations;
    deathHandler;
    clothing;
    weapon;
    weather;
    webview;
    session;
    charcreator;
    characterSelectorHandler;
    player;
    inventory;
    chat;
    character;
    vehicleSelector;
    vehicle;
    tuning;
    freecam;
    notification;
    auth;
    tutorial;
    nameTag;
    hud;
    context;
    phone;
    admin;
    house;
    subtitle;
    houseSelector;
    spawnSelector;
    definedJob;
    bank;
    vehicleInventory;
    publicGarage;
    groupData;
    groupsMenu;
    waypoint;
    dialogHandler;
    interiorHandler;
    supermarketHandler;
    ammuniationHandler;
    gasstationHandler;
    menuHandler;
    countdownHandler;
    accountHandler;
    vehicleCatalogHandler;
    adminPrisonHandler;
    hairSalonHandler;
    tattooStudioHandler;
    clothingStoreHandler;
    lockpickingHandler;
    drivingSchoolHandler;
    constructor(VehicleServiceHandler, friskHandler, prisonHandler, fireMdcHandler, vehicleSirenHandler, policeMdcHandler, emergencyCallHandler, mdcHandler, blipSyncHandler, doorSyncHandler, pedSyncHandler, markerSyncHandler, objectSyncHandler, playersList, animationWheelHandler, animations, deathHandler, clothing, weapon, weather, webview, session, charcreator, characterSelectorHandler, player, inventory, chat, character, vehicleSelector, vehicle, tuning, freecam, notification, auth, tutorial, nameTag, hud, context, phone, admin, house, subtitle, houseSelector, spawnSelector, definedJob, bank, vehicleInventory, publicGarage, groupData, groupsMenu, waypoint, dialogHandler, interiorHandler, supermarketHandler, ammuniationHandler, gasstationHandler, menuHandler, countdownHandler, accountHandler, vehicleCatalogHandler, adminPrisonHandler, hairSalonHandler, tattooStudioHandler, clothingStoreHandler, lockpickingHandler, drivingSchoolHandler) {
        this.VehicleServiceHandler = VehicleServiceHandler;
        this.friskHandler = friskHandler;
        this.prisonHandler = prisonHandler;
        this.fireMdcHandler = fireMdcHandler;
        this.vehicleSirenHandler = vehicleSirenHandler;
        this.policeMdcHandler = policeMdcHandler;
        this.emergencyCallHandler = emergencyCallHandler;
        this.mdcHandler = mdcHandler;
        this.blipSyncHandler = blipSyncHandler;
        this.doorSyncHandler = doorSyncHandler;
        this.pedSyncHandler = pedSyncHandler;
        this.markerSyncHandler = markerSyncHandler;
        this.objectSyncHandler = objectSyncHandler;
        this.playersList = playersList;
        this.animationWheelHandler = animationWheelHandler;
        this.animations = animations;
        this.deathHandler = deathHandler;
        this.clothing = clothing;
        this.weapon = weapon;
        this.weather = weather;
        this.webview = webview;
        this.session = session;
        this.charcreator = charcreator;
        this.characterSelectorHandler = characterSelectorHandler;
        this.player = player;
        this.inventory = inventory;
        this.chat = chat;
        this.character = character;
        this.vehicleSelector = vehicleSelector;
        this.vehicle = vehicle;
        this.tuning = tuning;
        this.freecam = freecam;
        this.notification = notification;
        this.auth = auth;
        this.tutorial = tutorial;
        this.nameTag = nameTag;
        this.hud = hud;
        this.context = context;
        this.phone = phone;
        this.admin = admin;
        this.house = house;
        this.subtitle = subtitle;
        this.houseSelector = houseSelector;
        this.spawnSelector = spawnSelector;
        this.definedJob = definedJob;
        this.bank = bank;
        this.vehicleInventory = vehicleInventory;
        this.publicGarage = publicGarage;
        this.groupData = groupData;
        this.groupsMenu = groupsMenu;
        this.waypoint = waypoint;
        this.dialogHandler = dialogHandler;
        this.interiorHandler = interiorHandler;
        this.supermarketHandler = supermarketHandler;
        this.ammuniationHandler = ammuniationHandler;
        this.gasstationHandler = gasstationHandler;
        this.menuHandler = menuHandler;
        this.countdownHandler = countdownHandler;
        this.accountHandler = accountHandler;
        this.vehicleCatalogHandler = vehicleCatalogHandler;
        this.adminPrisonHandler = adminPrisonHandler;
        this.hairSalonHandler = hairSalonHandler;
        this.tattooStudioHandler = tattooStudioHandler;
        this.clothingStoreHandler = clothingStoreHandler;
        this.lockpickingHandler = lockpickingHandler;
        this.drivingSchoolHandler = drivingSchoolHandler;
    }
};
ClientStartup = __decorate([
    injectable(),
    __metadata("design:paramtypes", [VehicleServiceHandler,
        FriskHandler,
        PrisonHandler,
        FireMdcHandler,
        VehicleSirenHandler,
        PoliceMdcHandler,
        EmergencyCallHandler,
        MdcHandler,
        BlipSyncHandler,
        DoorSyncHandler,
        PedSyncHandler,
        MarkerSyncHandler,
        ObjectSyncHandler,
        PlayersListHandler,
        AnimationWheelHandler,
        AnimationsHandler,
        DeathHandler,
        ClothingHandler,
        WeaponHandler,
        WeatherHandler,
        WebviewHandler,
        SessionHandler,
        CharacterCreatorHandler,
        CharacterSelectorHandler,
        PlayerHandler,
        InventoryHandler,
        ChatHandler,
        CharacterHandler,
        VehicleSelectorHandler,
        VehicleHandler,
        TuningHandler,
        FreeCamHandler,
        NotificationHandler,
        AuthenticationHandler,
        TutorialHandler,
        NameTagHandler,
        HudHandler,
        ContextMenuHandler,
        PhoneHandler,
        AdminHandler,
        HouseHandler,
        SubTitleHandler,
        HouseSelectorHandler,
        SpawnSelectorHandler,
        DefinedJobHandler,
        BankHandler,
        VehicleInventoryHandler,
        PublicGarageHandler,
        GroupDataHandler,
        GroupsMenuHandler,
        WaypointHandler,
        DialogHandler,
        InteriorHandler,
        SupermarketHandler,
        AmmunationHandler,
        GasStationHandler,
        MenuHandler,
        CountdownHandler,
        AccountHandler,
        VehicleCatalogHandler,
        AdminPrisonHandler,
        HairSalonHandler,
        TattooStudioHandler,
        ClothingStoreHandler,
        LockpickingHandler,
        DrivingSchoolHandler])
], ClientStartup);
export { ClientStartup };
//# sourceMappingURL=client.startup.js.map