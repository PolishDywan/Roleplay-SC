using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    SocialClubId = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    DiscordId = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    CurrentName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NameHistory = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HardwareIdHash = table.Column<ulong>(type: "bigint unsigned", nullable: true),
                    HardwareIdExHash = table.Column<ulong>(type: "bigint unsigned", nullable: true),
                    Permission = table.Column<int>(type: "int", nullable: false),
                    BannedFrom = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    BannedReason = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BannedPermanent = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BannedUntil = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    OnlineSince = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    AdminCheckpoints = table.Column<int>(type: "int", nullable: false),
                    SouthCentralPoints = table.Column<int>(type: "int", nullable: false),
                    LastIp = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastSelectedCharacterId = table.Column<int>(type: "int", nullable: false),
                    MaxCharacters = table.Column<int>(type: "int", nullable: false),
                    MaxAnimations = table.Column<int>(type: "int", nullable: false),
                    MaxRoleplayInfos = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.SocialClubId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Animations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Dictionary = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Clip = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Flags = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Animations", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BankAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    BankDetails = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankAccounts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BulletInEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CreatorCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FactionType = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BulletInEntries", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmergencyCalls",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Situation = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FactionType = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyCalls", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GroupType = table.Column<int>(type: "int", nullable: false),
                    MaxRanks = table.Column<int>(type: "int", nullable: false),
                    LicensesFlags = table.Column<int>(type: "int", nullable: true),
                    PurchasedLicenses = table.Column<int>(type: "int", nullable: true),
                    Products = table.Column<int>(type: "int", nullable: true),
                    DeliveryVisibilityStatus = table.Column<int>(type: "int", nullable: true),
                    MarkerId = table.Column<ulong>(type: "bigint unsigned", nullable: true),
                    VehicleInteractionPointX = table.Column<float>(type: "float", nullable: true),
                    VehicleInteractionPointY = table.Column<float>(type: "float", nullable: true),
                    VehicleInteractionPointZ = table.Column<float>(type: "float", nullable: true),
                    VehicleInteractionPointRoll = table.Column<float>(type: "float", nullable: true),
                    VehicleInteractionPointPitch = table.Column<float>(type: "float", nullable: true),
                    VehicleInteractionPointYaw = table.Column<float>(type: "float", nullable: true),
                    FactionType = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ItemCatalog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Model = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ZOffset = table.Column<float>(type: "float", nullable: false),
                    Image = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rarity = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<float>(type: "float", nullable: false),
                    Equippable = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Stackable = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Buyable = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Sellable = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    MaxLimit = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PositionX = table.Column<float>(type: "float", nullable: false),
                    PositionY = table.Column<float>(type: "float", nullable: false),
                    PositionZ = table.Column<float>(type: "float", nullable: false),
                    Roll = table.Column<float>(type: "float", nullable: false),
                    Pitch = table.Column<float>(type: "float", nullable: false),
                    Yaw = table.Column<float>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemCatalog", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MailAccounts",
                columns: table => new
                {
                    MailAddress = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MailAccounts", x => x.MailAddress);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Mails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SenderMailAddress = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MailReadedFromAddress = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Context = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mails", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MdcNodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TargetModelId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CreatorCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Note = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MdcNodes", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserShopDatas",
                columns: table => new
                {
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    GotWarned = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BillToPay = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserShopDatas", x => x.CharacterModelId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "VehicleCatalog",
                columns: table => new
                {
                    Model = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayClass = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClassId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaxTank = table.Column<int>(type: "int", nullable: false),
                    FuelType = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    DlcName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AmountOfOrderableVehicles = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleCatalog", x => x.Model);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Characters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AccountModelId = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    OnlineSince = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FirstName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Origin = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Physique = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Story = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BodySize = table.Column<int>(type: "int", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    Mother = table.Column<int>(type: "int", nullable: false),
                    Father = table.Column<int>(type: "int", nullable: false),
                    Similarity = table.Column<float>(type: "float", nullable: false),
                    SkinSimilarity = table.Column<float>(type: "float", nullable: false),
                    CharacterState = table.Column<int>(type: "int", nullable: false),
                    Torso = table.Column<int>(type: "int", nullable: false),
                    TorsoTexture = table.Column<int>(type: "int", nullable: false),
                    Health = table.Column<ushort>(type: "smallint unsigned", nullable: false),
                    Armor = table.Column<ushort>(type: "smallint unsigned", nullable: false),
                    DeathState = table.Column<int>(type: "int", nullable: false),
                    AnimationIds = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JailedUntil = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    JailedByCharacterName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PositionX = table.Column<float>(type: "float", nullable: false),
                    PositionY = table.Column<float>(type: "float", nullable: false),
                    PositionZ = table.Column<float>(type: "float", nullable: false),
                    Roll = table.Column<float>(type: "float", nullable: false),
                    Pitch = table.Column<float>(type: "float", nullable: false),
                    Yaw = table.Column<float>(type: "float", nullable: false),
                    Dimension = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Characters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Characters_Accounts_AccountModelId",
                        column: x => x.AccountModelId,
                        principalTable: "Accounts",
                        principalColumn: "SocialClubId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BankHistoryEntryModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BankAccountModelId = table.Column<int>(type: "int", nullable: false),
                    HistoryType = table.Column<int>(type: "int", nullable: false),
                    Income = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    PurposeOfUse = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankHistoryEntryModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BankHistoryEntryModel_BankAccounts_BankAccountModelId",
                        column: x => x.BankAccountModelId,
                        principalTable: "BankAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BankAccountGroupAccesses",
                columns: table => new
                {
                    BankAccountModelId = table.Column<int>(type: "int", nullable: false),
                    GroupModelId = table.Column<int>(type: "int", nullable: false),
                    Owner = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankAccountGroupAccesses", x => new { x.BankAccountModelId, x.GroupModelId });
                    table.ForeignKey(
                        name: "FK_BankAccountGroupAccesses_BankAccounts_BankAccountModelId",
                        column: x => x.BankAccountModelId,
                        principalTable: "BankAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BankAccountGroupAccesses_Groups_GroupModelId",
                        column: x => x.GroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Directories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    GroupModelId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReadGroupLevel = table.Column<int>(type: "int", nullable: false),
                    WriteGroupLevel = table.Column<int>(type: "int", nullable: false),
                    LastEditCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatorCharacterId = table.Column<int>(type: "int", nullable: false),
                    CreatorCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Directories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Directories_Groups_GroupModelId",
                        column: x => x.GroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GroupRanks",
                columns: table => new
                {
                    GroupModelId = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GroupPermission = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupRanks", x => new { x.GroupModelId, x.Level });
                    table.ForeignKey(
                        name: "FK_GroupRanks_Groups_GroupModelId",
                        column: x => x.GroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Houses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CharacterModelId = table.Column<int>(type: "int", nullable: true),
                    GroupModelId = table.Column<int>(type: "int", nullable: true),
                    HouseType = table.Column<int>(type: "int", nullable: false),
                    HouseNumber = table.Column<int>(type: "int", nullable: false),
                    SubName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StreetDirection = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    InteriorId = table.Column<int>(type: "int", nullable: true),
                    Rentable = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BlockedOwnership = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    RentBankAccountId = table.Column<int>(type: "int", nullable: true),
                    Keys = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LockState = table.Column<int>(type: "int", nullable: false),
                    LeaseCompanyType = table.Column<int>(type: "int", nullable: true),
                    HasCashier = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    PlayerDuties = table.Column<int>(type: "int", nullable: true),
                    CashierX = table.Column<float>(type: "float", nullable: true),
                    CashierY = table.Column<float>(type: "float", nullable: true),
                    CashierZ = table.Column<float>(type: "float", nullable: true),
                    CashierHeading = table.Column<float>(type: "float", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PositionX = table.Column<float>(type: "float", nullable: false),
                    PositionY = table.Column<float>(type: "float", nullable: false),
                    PositionZ = table.Column<float>(type: "float", nullable: false),
                    Roll = table.Column<float>(type: "float", nullable: false),
                    Pitch = table.Column<float>(type: "float", nullable: false),
                    Yaw = table.Column<float>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Houses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Houses_Groups_GroupModelId",
                        column: x => x.GroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MailAccountGroupAccessModel",
                columns: table => new
                {
                    MailAccountModelMailAddress = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GroupModelId = table.Column<int>(type: "int", nullable: false),
                    Owner = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MailAccountGroupAccessModel", x => new { x.MailAccountModelMailAddress, x.GroupModelId });
                    table.ForeignKey(
                        name: "FK_MailAccountGroupAccessModel_Groups_GroupModelId",
                        column: x => x.GroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MailAccountGroupAccessModel_MailAccounts_MailAccountModelMai~",
                        column: x => x.MailAccountModelMailAddress,
                        principalTable: "MailAccounts",
                        principalColumn: "MailAddress",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MailLinkModel",
                columns: table => new
                {
                    MailAccountModelMailAddress = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MailModelId = table.Column<int>(type: "int", nullable: false),
                    IsAuthor = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MailLinkModel", x => new { x.MailAccountModelMailAddress, x.MailModelId });
                    table.ForeignKey(
                        name: "FK_MailLinkModel_MailAccounts_MailAccountModelMailAddress",
                        column: x => x.MailAccountModelMailAddress,
                        principalTable: "MailAccounts",
                        principalColumn: "MailAddress",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MailLinkModel_Mails_MailModelId",
                        column: x => x.MailModelId,
                        principalTable: "Mails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrderedVehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrderedBy = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CatalogVehicleModelId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GroupModelId = table.Column<int>(type: "int", nullable: false),
                    DeliverdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeliveryRequestedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeliveryRequestedBy = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedVehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderedVehicles_VehicleCatalog_CatalogVehicleModelId",
                        column: x => x.CatalogVehicleModelId,
                        principalTable: "VehicleCatalog",
                        principalColumn: "Model",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Appearances",
                columns: table => new
                {
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    Hair = table.Column<int>(type: "int", nullable: false),
                    PrimHairColor = table.Column<int>(type: "int", nullable: false),
                    SecHairColor = table.Column<int>(type: "int", nullable: false),
                    EyeColor = table.Column<int>(type: "int", nullable: false),
                    BlemishesValue = table.Column<int>(type: "int", nullable: false),
                    BlemishesOpacity = table.Column<float>(type: "float", nullable: false),
                    BlemishesColor = table.Column<int>(type: "int", nullable: false),
                    FacialhairValue = table.Column<int>(type: "int", nullable: false),
                    FacialhairOpacity = table.Column<float>(type: "float", nullable: false),
                    FacialhairColor = table.Column<int>(type: "int", nullable: false),
                    EyebrowsValue = table.Column<int>(type: "int", nullable: false),
                    EyebrowsOpacity = table.Column<float>(type: "float", nullable: false),
                    EyebrowsColor = table.Column<int>(type: "int", nullable: false),
                    AgeingValue = table.Column<int>(type: "int", nullable: false),
                    AgeingOpacity = table.Column<float>(type: "float", nullable: false),
                    AgeingColor = table.Column<int>(type: "int", nullable: false),
                    MakeupValue = table.Column<int>(type: "int", nullable: false),
                    MakeupOpacity = table.Column<float>(type: "float", nullable: false),
                    MakeupColor = table.Column<int>(type: "int", nullable: false),
                    BlushValue = table.Column<int>(type: "int", nullable: false),
                    BlushOpacity = table.Column<float>(type: "float", nullable: false),
                    BlushColor = table.Column<int>(type: "int", nullable: false),
                    ComplexionValue = table.Column<int>(type: "int", nullable: false),
                    ComplexionOpacity = table.Column<float>(type: "float", nullable: false),
                    ComplexionColor = table.Column<int>(type: "int", nullable: false),
                    SundamageValue = table.Column<int>(type: "int", nullable: false),
                    SundamageOpacity = table.Column<float>(type: "float", nullable: false),
                    SundamageColor = table.Column<int>(type: "int", nullable: false),
                    LipstickValue = table.Column<int>(type: "int", nullable: false),
                    LipstickOpacity = table.Column<float>(type: "float", nullable: false),
                    LipstickColor = table.Column<int>(type: "int", nullable: false),
                    FrecklesValue = table.Column<int>(type: "int", nullable: false),
                    FrecklesOpacity = table.Column<float>(type: "float", nullable: false),
                    FrecklesColor = table.Column<int>(type: "int", nullable: false),
                    ChesthairValue = table.Column<int>(type: "int", nullable: false),
                    ChesthairOpacity = table.Column<float>(type: "float", nullable: false),
                    ChesthairColor = table.Column<int>(type: "int", nullable: false),
                    BodyblemishesValue = table.Column<int>(type: "int", nullable: false),
                    BodyblemishesOpacity = table.Column<float>(type: "float", nullable: false),
                    BodyblemishesColor = table.Column<int>(type: "int", nullable: false),
                    AddbodyblemihesValue = table.Column<int>(type: "int", nullable: false),
                    AddbodyblemihesOpacity = table.Column<float>(type: "float", nullable: false),
                    AddbodyblemihesColor = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appearances", x => x.CharacterModelId);
                    table.ForeignKey(
                        name: "FK_Appearances_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BankAccountCharacterAccesses",
                columns: table => new
                {
                    BankAccountModelId = table.Column<int>(type: "int", nullable: false),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    Permission = table.Column<int>(type: "int", nullable: false),
                    Owner = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankAccountCharacterAccesses", x => new { x.BankAccountModelId, x.CharacterModelId });
                    table.ForeignKey(
                        name: "FK_BankAccountCharacterAccesses_BankAccounts_BankAccountModelId",
                        column: x => x.BankAccountModelId,
                        principalTable: "BankAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BankAccountCharacterAccesses_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ChatLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AccountModelId = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    ChatType = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatLogs_Accounts_AccountModelId",
                        column: x => x.AccountModelId,
                        principalTable: "Accounts",
                        principalColumn: "SocialClubId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChatLogs_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CommandLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AccountModelId = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Arguments = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequiredPermission = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommandLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommandLogs_Accounts_AccountModelId",
                        column: x => x.AccountModelId,
                        principalTable: "Accounts",
                        principalColumn: "SocialClubId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommandLogs_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CriminalRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    CreatorCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Reason = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CriminalRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CriminalRecords_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DefinedJobs",
                columns: table => new
                {
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefinedJobs", x => x.CharacterModelId);
                    table.ForeignKey(
                        name: "FK_DefinedJobs_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FaceFeatures",
                columns: table => new
                {
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    EyesSize = table.Column<float>(type: "float", nullable: false),
                    LipsThickness = table.Column<float>(type: "float", nullable: false),
                    NoseWidth = table.Column<float>(type: "float", nullable: false),
                    NoseHeight = table.Column<float>(type: "float", nullable: false),
                    NoseLength = table.Column<float>(type: "float", nullable: false),
                    NoseBridge = table.Column<float>(type: "float", nullable: false),
                    NoseTip = table.Column<float>(type: "float", nullable: false),
                    NoseBridgeShift = table.Column<float>(type: "float", nullable: false),
                    BrowHeight = table.Column<float>(type: "float", nullable: false),
                    BrowWidth = table.Column<float>(type: "float", nullable: false),
                    CheekboneHeight = table.Column<float>(type: "float", nullable: false),
                    CheekboneWidth = table.Column<float>(type: "float", nullable: false),
                    CheekWidth = table.Column<float>(type: "float", nullable: false),
                    JawWidth = table.Column<float>(type: "float", nullable: false),
                    JawHeight = table.Column<float>(type: "float", nullable: false),
                    ChinLength = table.Column<float>(type: "float", nullable: false),
                    ChinPosition = table.Column<float>(type: "float", nullable: false),
                    ChinWidth = table.Column<float>(type: "float", nullable: false),
                    ChinShape = table.Column<float>(type: "float", nullable: false),
                    NeckWidth = table.Column<float>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FaceFeatures", x => x.CharacterModelId);
                    table.ForeignKey(
                        name: "FK_FaceFeatures_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GroupMembers",
                columns: table => new
                {
                    GroupModelId = table.Column<int>(type: "int", nullable: false),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    RankLevel = table.Column<uint>(type: "int unsigned", nullable: false),
                    Salary = table.Column<uint>(type: "int unsigned", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    Owner = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupMembers", x => new { x.GroupModelId, x.CharacterModelId });
                    table.ForeignKey(
                        name: "FK_GroupMembers_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupMembers_Groups_GroupModelId",
                        column: x => x.GroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MailAccountCharacterAccessModel",
                columns: table => new
                {
                    MailAccountModelMailAddress = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    Permission = table.Column<int>(type: "int", nullable: false),
                    Owner = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MailAccountCharacterAccessModel", x => new { x.MailAccountModelMailAddress, x.CharacterModelId });
                    table.ForeignKey(
                        name: "FK_MailAccountCharacterAccessModel_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MailAccountCharacterAccessModel_MailAccounts_MailAccountMode~",
                        column: x => x.MailAccountModelMailAddress,
                        principalTable: "MailAccounts",
                        principalColumn: "MailAddress",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MdcAllergies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatorCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MdcAllergies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MdcAllergies_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MdcMedicalEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatorCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MdcMedicalEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MdcMedicalEntries_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PersonalLicenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Warnings = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalLicenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonalLicenses_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RegistrationOfficeEntries",
                columns: table => new
                {
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationOfficeEntries", x => x.CharacterModelId);
                    table.ForeignKey(
                        name: "FK_RegistrationOfficeEntries_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RoleplayInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MarkerId = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    Dimension = table.Column<int>(type: "int", nullable: false),
                    Distance = table.Column<int>(type: "int", nullable: false),
                    Context = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PositionX = table.Column<float>(type: "float", nullable: false),
                    PositionY = table.Column<float>(type: "float", nullable: false),
                    PositionZ = table.Column<float>(type: "float", nullable: false),
                    Roll = table.Column<float>(type: "float", nullable: false),
                    Pitch = table.Column<float>(type: "float", nullable: false),
                    Yaw = table.Column<float>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleplayInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleplayInfos_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TattoosModel",
                columns: table => new
                {
                    CharacterModelId = table.Column<int>(type: "int", nullable: false),
                    HeadCollection = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HeadHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TorsoCollection = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TorsoHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LeftArmCollection = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LeftArmHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RightArmCollection = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RightArmHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LeftLegCollection = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LeftLegHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RightLegCollection = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RightLegHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TattoosModel", x => x.CharacterModelId);
                    table.ForeignKey(
                        name: "FK_TattoosModel_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserRecordLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AccountModelId = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    StaffAccountModelId = table.Column<ulong>(type: "bigint unsigned", nullable: false),
                    CharacterModelId = table.Column<int>(type: "int", nullable: true),
                    UserRecordType = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRecordLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRecordLogs_Accounts_AccountModelId",
                        column: x => x.AccountModelId,
                        principalTable: "Accounts",
                        principalColumn: "SocialClubId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRecordLogs_Accounts_StaffAccountModelId",
                        column: x => x.StaffAccountModelId,
                        principalTable: "Accounts",
                        principalColumn: "SocialClubId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRecordLogs_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CharacterModelId = table.Column<int>(type: "int", nullable: true),
                    GroupModelOwnerId = table.Column<int>(type: "int", nullable: true),
                    Model = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    VehicleState = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    NumberplateText = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EngineHealth = table.Column<int>(type: "int", nullable: false),
                    BodyHealth = table.Column<uint>(type: "int unsigned", nullable: false),
                    Spoilers = table.Column<int>(type: "int", nullable: false),
                    FrontBumper = table.Column<int>(type: "int", nullable: false),
                    RearBumper = table.Column<int>(type: "int", nullable: false),
                    SideSkirt = table.Column<int>(type: "int", nullable: false),
                    Exhaust = table.Column<int>(type: "int", nullable: false),
                    Frame = table.Column<int>(type: "int", nullable: false),
                    Grille = table.Column<int>(type: "int", nullable: false),
                    Hood = table.Column<int>(type: "int", nullable: false),
                    Fender = table.Column<int>(type: "int", nullable: false),
                    RightFender = table.Column<int>(type: "int", nullable: false),
                    Roof = table.Column<int>(type: "int", nullable: false),
                    Engine = table.Column<int>(type: "int", nullable: false),
                    Brakes = table.Column<int>(type: "int", nullable: false),
                    Transmission = table.Column<int>(type: "int", nullable: false),
                    Horns = table.Column<int>(type: "int", nullable: false),
                    Suspension = table.Column<int>(type: "int", nullable: false),
                    Armor = table.Column<int>(type: "int", nullable: false),
                    Turbo = table.Column<int>(type: "int", nullable: false),
                    Xenon = table.Column<int>(type: "int", nullable: false),
                    FrontWheels = table.Column<int>(type: "int", nullable: false),
                    BackWheels = table.Column<int>(type: "int", nullable: false),
                    PlateHolder = table.Column<int>(type: "int", nullable: false),
                    PlateVanity = table.Column<int>(type: "int", nullable: false),
                    TrimDesign = table.Column<int>(type: "int", nullable: false),
                    Ornaments = table.Column<int>(type: "int", nullable: false),
                    Dashboard = table.Column<int>(type: "int", nullable: false),
                    DialDesign = table.Column<int>(type: "int", nullable: false),
                    DoorSpeaker = table.Column<int>(type: "int", nullable: false),
                    Seats = table.Column<int>(type: "int", nullable: false),
                    SteeringWheel = table.Column<int>(type: "int", nullable: false),
                    ShiftLever = table.Column<int>(type: "int", nullable: false),
                    Plaques = table.Column<int>(type: "int", nullable: false),
                    Speaker = table.Column<int>(type: "int", nullable: false),
                    Trunk = table.Column<int>(type: "int", nullable: false),
                    Hydraulics = table.Column<int>(type: "int", nullable: false),
                    EngineBlock = table.Column<int>(type: "int", nullable: false),
                    AirFilter = table.Column<int>(type: "int", nullable: false),
                    Struts = table.Column<int>(type: "int", nullable: false),
                    ArchCover = table.Column<int>(type: "int", nullable: false),
                    Aerials = table.Column<int>(type: "int", nullable: false),
                    Trim = table.Column<int>(type: "int", nullable: false),
                    Tank = table.Column<int>(type: "int", nullable: false),
                    Windows = table.Column<int>(type: "int", nullable: false),
                    Boost = table.Column<int>(type: "int", nullable: false),
                    WindowTint = table.Column<int>(type: "int", nullable: false),
                    Plate = table.Column<int>(type: "int", nullable: false),
                    PrimaryColor = table.Column<int>(type: "int", nullable: false),
                    SecondaryColor = table.Column<int>(type: "int", nullable: false),
                    Livery = table.Column<byte>(type: "tinyint unsigned", nullable: false),
                    Fuel = table.Column<float>(type: "float", nullable: false),
                    DrivenKilometre = table.Column<float>(type: "float", nullable: false),
                    LastDrivers = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EngineOn = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Keys = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LockState = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PositionX = table.Column<float>(type: "float", nullable: false),
                    PositionY = table.Column<float>(type: "float", nullable: false),
                    PositionZ = table.Column<float>(type: "float", nullable: false),
                    Roll = table.Column<float>(type: "float", nullable: false),
                    Pitch = table.Column<float>(type: "float", nullable: false),
                    Yaw = table.Column<float>(type: "float", nullable: false),
                    Dimension = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vehicles_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Vehicles_Groups_GroupModelOwnerId",
                        column: x => x.GroupModelOwnerId,
                        principalTable: "Groups",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DirectoryModelId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Context = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsBlocked = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BlockedByCharacterName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastEditCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatorCharacterId = table.Column<int>(type: "int", nullable: false),
                    CreatorCharacterName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Files_Directories_DirectoryModelId",
                        column: x => x.DirectoryModelId,
                        principalTable: "Directories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Doors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    HouseModelId = table.Column<int>(type: "int", nullable: false),
                    Hash = table.Column<uint>(type: "int unsigned", nullable: false),
                    LockState = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PositionX = table.Column<float>(type: "float", nullable: false),
                    PositionY = table.Column<float>(type: "float", nullable: false),
                    PositionZ = table.Column<float>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Doors_Houses_HouseModelId",
                        column: x => x.HouseModelId,
                        principalTable: "Houses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Deliveries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DeliveryType = table.Column<int>(type: "int", nullable: false),
                    OrderGroupModelId = table.Column<int>(type: "int", nullable: false),
                    SupplierGroupModelId = table.Column<int>(type: "int", nullable: true),
                    SupplierCharacterId = table.Column<int>(type: "int", nullable: true),
                    SupplierPhoneNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SupplierFullName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PlayerVehicleModelId = table.Column<int>(type: "int", nullable: true),
                    OldStatus = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ProductsRemaining = table.Column<int>(type: "int", nullable: true),
                    OrderedProducts = table.Column<int>(type: "int", nullable: true),
                    VehicleModel = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliveries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Deliveries_Groups_OrderGroupModelId",
                        column: x => x.OrderGroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Deliveries_Groups_SupplierGroupModelId",
                        column: x => x.SupplierGroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Deliveries_Vehicles_PlayerVehicleModelId",
                        column: x => x.PlayerVehicleModelId,
                        principalTable: "Vehicles",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PublicGarageEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    GroupModelId = table.Column<int>(type: "int", nullable: true),
                    CharacterModelId = table.Column<int>(type: "int", nullable: true),
                    PlayerVehicleModelId = table.Column<int>(type: "int", nullable: false),
                    GarageId = table.Column<int>(type: "int", nullable: false),
                    BankAccountId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicGarageEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PublicGarageEntries_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PublicGarageEntries_Groups_GroupModelId",
                        column: x => x.GroupModelId,
                        principalTable: "Groups",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PublicGarageEntries_Vehicles_PlayerVehicleModelId",
                        column: x => x.PlayerVehicleModelId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CharacterModelId = table.Column<int>(type: "int", nullable: true),
                    HouseModelId = table.Column<int>(type: "int", nullable: true),
                    VehicleModelId = table.Column<int>(type: "int", nullable: true),
                    ItemClothModelId = table.Column<int>(type: "int", nullable: true),
                    GroupCharacterId = table.Column<int>(type: "int", nullable: true),
                    GroupId = table.Column<int>(type: "int", nullable: true),
                    InventoryType = table.Column<int>(type: "int", nullable: false),
                    MaxWeight = table.Column<float>(type: "float", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventories_Characters_CharacterModelId",
                        column: x => x.CharacterModelId,
                        principalTable: "Characters",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Inventories_Houses_HouseModelId",
                        column: x => x.HouseModelId,
                        principalTable: "Houses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Inventories_Vehicles_VehicleModelId",
                        column: x => x.VehicleModelId,
                        principalTable: "Vehicles",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    InventoryModelId = table.Column<int>(type: "int", nullable: true),
                    CatalogItemModelId = table.Column<int>(type: "int", nullable: false),
                    ItemType = table.Column<int>(type: "int", nullable: false),
                    Slot = table.Column<int>(type: "int", nullable: true),
                    DroppedByCharacter = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CustomData = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Note = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Condition = table.Column<int>(type: "int", nullable: true),
                    IsBought = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsStolen = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ItemState = table.Column<int>(type: "int", nullable: false),
                    GenderType = table.Column<int>(type: "int", nullable: true),
                    DrawableId = table.Column<byte>(type: "tinyint unsigned", nullable: true),
                    TextureId = table.Column<byte>(type: "tinyint unsigned", nullable: true),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ItemGroupKeyModel_GroupModelId = table.Column<int>(type: "int", nullable: true),
                    GroupModelId = table.Column<int>(type: "int", nullable: true),
                    ItemKeyModelId = table.Column<int>(type: "int", nullable: true),
                    HouseModelId = table.Column<int>(type: "int", nullable: true),
                    PlayerVehicleModelId = table.Column<int>(type: "int", nullable: true),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Active = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    BackgroundImageId = table.Column<int>(type: "int", nullable: true),
                    CurrentOwnerId = table.Column<int>(type: "int", nullable: true),
                    InitialOwnerId = table.Column<int>(type: "int", nullable: true),
                    LastTimeOpenedNotifications = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ReferenceId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Reason = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Costs = table.Column<int>(type: "int", nullable: true),
                    Payed = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    CreatorCharacterName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TargetCharacterId = table.Column<int>(type: "int", nullable: true),
                    FactionType = table.Column<int>(type: "int", nullable: true),
                    Frequency = table.Column<int>(type: "int", nullable: true),
                    ItemWeaponId = table.Column<int>(type: "int", nullable: true),
                    ItemModelWeaponId = table.Column<int>(type: "int", nullable: true),
                    SerialNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ItemWeaponModel_InitialOwnerId = table.Column<int>(type: "int", nullable: true),
                    ComponentHashes = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PositionX = table.Column<float>(type: "float", nullable: false),
                    PositionY = table.Column<float>(type: "float", nullable: false),
                    PositionZ = table.Column<float>(type: "float", nullable: false),
                    Roll = table.Column<float>(type: "float", nullable: false),
                    Pitch = table.Column<float>(type: "float", nullable: false),
                    Yaw = table.Column<float>(type: "float", nullable: false),
                    Dimension = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Inventories_InventoryModelId",
                        column: x => x.InventoryModelId,
                        principalTable: "Inventories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Items_ItemCatalog_CatalogItemModelId",
                        column: x => x.CatalogItemModelId,
                        principalTable: "ItemCatalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_Items_ItemModelWeaponId",
                        column: x => x.ItemModelWeaponId,
                        principalTable: "Items",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PhoneChats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemPhoneModelId = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneChats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhoneChats_Items_ItemPhoneModelId",
                        column: x => x.ItemPhoneModelId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PhoneContacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemPhoneModelId = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneContacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhoneContacts_Items_ItemPhoneModelId",
                        column: x => x.ItemPhoneModelId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PhoneNotifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ItemPhoneModelId = table.Column<int>(type: "int", nullable: false),
                    Context = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneNotifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhoneNotifications_Items_ItemPhoneModelId",
                        column: x => x.ItemPhoneModelId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PhoneMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ChatModelId = table.Column<int>(type: "int", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    Context = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Local = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SenderPhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TargetPhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastUsage = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhoneMessages_PhoneChats_ChatModelId",
                        column: x => x.ChatModelId,
                        principalTable: "PhoneChats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_BankAccountCharacterAccesses_CharacterModelId",
                table: "BankAccountCharacterAccesses",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_BankAccountGroupAccesses_GroupModelId",
                table: "BankAccountGroupAccesses",
                column: "GroupModelId");

            migrationBuilder.CreateIndex(
                name: "IX_BankHistoryEntryModel_BankAccountModelId",
                table: "BankHistoryEntryModel",
                column: "BankAccountModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Characters_AccountModelId",
                table: "Characters",
                column: "AccountModelId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatLogs_AccountModelId",
                table: "ChatLogs",
                column: "AccountModelId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatLogs_CharacterModelId",
                table: "ChatLogs",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_CommandLogs_AccountModelId",
                table: "CommandLogs",
                column: "AccountModelId");

            migrationBuilder.CreateIndex(
                name: "IX_CommandLogs_CharacterModelId",
                table: "CommandLogs",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_CriminalRecords_CharacterModelId",
                table: "CriminalRecords",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_OrderGroupModelId",
                table: "Deliveries",
                column: "OrderGroupModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_PlayerVehicleModelId",
                table: "Deliveries",
                column: "PlayerVehicleModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_SupplierGroupModelId",
                table: "Deliveries",
                column: "SupplierGroupModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Directories_GroupModelId",
                table: "Directories",
                column: "GroupModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Doors_HouseModelId",
                table: "Doors",
                column: "HouseModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Files_DirectoryModelId",
                table: "Files",
                column: "DirectoryModelId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMembers_CharacterModelId",
                table: "GroupMembers",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Houses_GroupModelId",
                table: "Houses",
                column: "GroupModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_CharacterModelId",
                table: "Inventories",
                column: "CharacterModelId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_HouseModelId",
                table: "Inventories",
                column: "HouseModelId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_ItemClothModelId",
                table: "Inventories",
                column: "ItemClothModelId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_VehicleModelId",
                table: "Inventories",
                column: "VehicleModelId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_CatalogItemModelId",
                table: "Items",
                column: "CatalogItemModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_InventoryModelId",
                table: "Items",
                column: "InventoryModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemModelWeaponId",
                table: "Items",
                column: "ItemModelWeaponId");

            migrationBuilder.CreateIndex(
                name: "IX_MailAccountCharacterAccessModel_CharacterModelId",
                table: "MailAccountCharacterAccessModel",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_MailAccountGroupAccessModel_GroupModelId",
                table: "MailAccountGroupAccessModel",
                column: "GroupModelId");

            migrationBuilder.CreateIndex(
                name: "IX_MailLinkModel_MailModelId",
                table: "MailLinkModel",
                column: "MailModelId");

            migrationBuilder.CreateIndex(
                name: "IX_MdcAllergies_CharacterModelId",
                table: "MdcAllergies",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_MdcMedicalEntries_CharacterModelId",
                table: "MdcMedicalEntries",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedVehicles_CatalogVehicleModelId",
                table: "OrderedVehicles",
                column: "CatalogVehicleModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalLicenses_CharacterModelId",
                table: "PersonalLicenses",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneChats_ItemPhoneModelId",
                table: "PhoneChats",
                column: "ItemPhoneModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneContacts_ItemPhoneModelId",
                table: "PhoneContacts",
                column: "ItemPhoneModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneMessages_ChatModelId",
                table: "PhoneMessages",
                column: "ChatModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneNotifications_ItemPhoneModelId",
                table: "PhoneNotifications",
                column: "ItemPhoneModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicGarageEntries_CharacterModelId",
                table: "PublicGarageEntries",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicGarageEntries_GroupModelId",
                table: "PublicGarageEntries",
                column: "GroupModelId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicGarageEntries_PlayerVehicleModelId",
                table: "PublicGarageEntries",
                column: "PlayerVehicleModelId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleplayInfos_CharacterModelId",
                table: "RoleplayInfos",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRecordLogs_AccountModelId",
                table: "UserRecordLogs",
                column: "AccountModelId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRecordLogs_CharacterModelId",
                table: "UserRecordLogs",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRecordLogs_StaffAccountModelId",
                table: "UserRecordLogs",
                column: "StaffAccountModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_CharacterModelId",
                table: "Vehicles",
                column: "CharacterModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_GroupModelOwnerId",
                table: "Vehicles",
                column: "GroupModelOwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Items_ItemClothModelId",
                table: "Inventories",
                column: "ItemClothModelId",
                principalTable: "Items",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Characters_CharacterModelId",
                table: "Inventories");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Characters_CharacterModelId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Houses_Groups_GroupModelId",
                table: "Houses");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Groups_GroupModelOwnerId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Vehicles_VehicleModelId",
                table: "Inventories");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Houses_HouseModelId",
                table: "Inventories");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Items_ItemClothModelId",
                table: "Inventories");

            migrationBuilder.DropTable(
                name: "Animations");

            migrationBuilder.DropTable(
                name: "Appearances");

            migrationBuilder.DropTable(
                name: "BankAccountCharacterAccesses");

            migrationBuilder.DropTable(
                name: "BankAccountGroupAccesses");

            migrationBuilder.DropTable(
                name: "BankHistoryEntryModel");

            migrationBuilder.DropTable(
                name: "BulletInEntries");

            migrationBuilder.DropTable(
                name: "ChatLogs");

            migrationBuilder.DropTable(
                name: "CommandLogs");

            migrationBuilder.DropTable(
                name: "CriminalRecords");

            migrationBuilder.DropTable(
                name: "DefinedJobs");

            migrationBuilder.DropTable(
                name: "Deliveries");

            migrationBuilder.DropTable(
                name: "Doors");

            migrationBuilder.DropTable(
                name: "EmergencyCalls");

            migrationBuilder.DropTable(
                name: "FaceFeatures");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "GroupMembers");

            migrationBuilder.DropTable(
                name: "GroupRanks");

            migrationBuilder.DropTable(
                name: "MailAccountCharacterAccessModel");

            migrationBuilder.DropTable(
                name: "MailAccountGroupAccessModel");

            migrationBuilder.DropTable(
                name: "MailLinkModel");

            migrationBuilder.DropTable(
                name: "MdcAllergies");

            migrationBuilder.DropTable(
                name: "MdcMedicalEntries");

            migrationBuilder.DropTable(
                name: "MdcNodes");

            migrationBuilder.DropTable(
                name: "OrderedVehicles");

            migrationBuilder.DropTable(
                name: "PersonalLicenses");

            migrationBuilder.DropTable(
                name: "PhoneContacts");

            migrationBuilder.DropTable(
                name: "PhoneMessages");

            migrationBuilder.DropTable(
                name: "PhoneNotifications");

            migrationBuilder.DropTable(
                name: "PublicGarageEntries");

            migrationBuilder.DropTable(
                name: "RegistrationOfficeEntries");

            migrationBuilder.DropTable(
                name: "RoleplayInfos");

            migrationBuilder.DropTable(
                name: "TattoosModel");

            migrationBuilder.DropTable(
                name: "UserRecordLogs");

            migrationBuilder.DropTable(
                name: "UserShopDatas");

            migrationBuilder.DropTable(
                name: "BankAccounts");

            migrationBuilder.DropTable(
                name: "Directories");

            migrationBuilder.DropTable(
                name: "MailAccounts");

            migrationBuilder.DropTable(
                name: "Mails");

            migrationBuilder.DropTable(
                name: "VehicleCatalog");

            migrationBuilder.DropTable(
                name: "PhoneChats");

            migrationBuilder.DropTable(
                name: "Characters");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Houses");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Inventories");

            migrationBuilder.DropTable(
                name: "ItemCatalog");
        }
    }
}
