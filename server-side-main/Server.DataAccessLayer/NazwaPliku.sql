CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

CREATE TABLE `Accounts` (
    `SocialClubId` decimal(20,0) NOT NULL,
    `DiscordId` decimal(20,0) NOT NULL,
    `PasswordHash` text NOT NULL,
    `CurrentName` text NOT NULL,
    `NameHistory` text NOT NULL,
    `HardwareIdHash` decimal(20,0) NULL,
    `HardwareIdExHash` decimal(20,0) NULL,
    `Permission` int NOT NULL,
    `BannedFrom` decimal(20,0) NOT NULL,
    `BannedReason` text NULL,
    `BannedPermanent` bool NOT NULL,
    `BannedUntil` datetime(6) NOT NULL,
    `LastLogin` datetime(6) NULL,
    `OnlineSince` datetime(6) NOT NULL,
    `AdminCheckpoints` int NOT NULL,
    `SouthCentralPoints` int NOT NULL,
    `LastIp` text NOT NULL,
    `LastSelectedCharacterId` int NOT NULL,
    `MaxCharacters` int NOT NULL,
    `MaxAnimations` int NOT NULL,
    `MaxRoleplayInfos` int NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_Accounts` PRIMARY KEY (`SocialClubId`)
);

CREATE TABLE `Animations` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Dictionary` text NOT NULL,
    `Clip` text NOT NULL,
    `Name` text NOT NULL,
    `Flags` int NOT NULL,
    `CreatedAt` datetime NOT NULL,
    `LastUsage` datetime NOT NULL,
    CONSTRAINT `PK_Animations` PRIMARY KEY (`Id`)
);

CREATE TABLE `BankAccounts` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Status` int NOT NULL,
    `Type` int NOT NULL,
    `Amount` bigint NOT NULL,
    `BankDetails` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_BankAccounts` PRIMARY KEY (`Id`)
);

CREATE TABLE `EmergencyCalls` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `PhoneNumber` longtext NOT NULL,
    `Location` longtext NOT NULL,
    `Situation` longtext NOT NULL,
    `FactionType` int NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_EmergencyCalls` PRIMARY KEY (`Id`)
);

CREATE TABLE `Groups` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Status` int NOT NULL,
    `Name` longtext NOT NULL,
    `GroupType` int NOT NULL,
    `MaxRanks` int NOT NULL,
    `LicensesFlags` int NULL,
    `PurchasedLicenses` int NULL,
    `Products` int NULL,
    `DeliveryVisibilityStatus` int NULL,
    `FactionType` int NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_Groups` PRIMARY KEY (`Id`)
);

CREATE TABLE `ItemCatalog` (
    `Id` integer NOT NULL,
    `Name` text NOT NULL,
    `Model` text NOT NULL,
    `ZOffset` real NOT NULL,
    `Image` text NOT NULL,
    `Description` text NOT NULL,
    `Rarity` integer NOT NULL,
    `Weight` real NOT NULL,
    `Equippable` boolean NOT NULL,
    `Stackable` boolean NOT NULL,
    `Buyable` boolean NOT NULL,
    `Sellable` boolean NOT NULL,
    `Price` integer NOT NULL,
    `SellPrice` integer NOT NULL,
    `MaxLimit` integer NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    `PositionX` real NOT NULL,
    `PositionY` real NOT NULL,
    `PositionZ` real NOT NULL,
    `Roll` real NOT NULL,
    `Pitch` real NOT NULL,
    `Yaw` real NOT NULL,
    CONSTRAINT `PK_ItemCatalog` PRIMARY KEY (`Id`)
);

CREATE TABLE `MailAccounts` (
    `MailAddress` text NOT NULL,
    `Type` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_MailAccounts` PRIMARY KEY (`MailAddress`)
);

CREATE TABLE `Mails` (
    `Id` integer NOT NULL,
    `SenderMailAddress` text NOT NULL,
    `MailReadedFromAddress` text[] NOT NULL,
    `Title` character varying(50) NOT NULL,
    `Context` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_Mails` PRIMARY KEY (`Id`)
);

CREATE TABLE `MdcNodes` (
    `Id` integer NOT NULL,
    `TargetModelId` text NOT NULL,
    `Type` integer NOT NULL,
    `CreatorCharacterName` text NOT NULL,
    `Note` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_MdcNodes` PRIMARY KEY (`Id`)
);

CREATE TABLE `UserShopDatas` (
    `CharacterModelId` integer NOT NULL,
    `GotWarned` boolean NOT NULL,
    `BillToPay` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_UserShopDatas` PRIMARY KEY (`CharacterModelId`)
);

CREATE TABLE `VehicleCatalog` (
    `Model` text NOT NULL,
    `DisplayName` text NOT NULL,
    `DisplayClass` text NOT NULL,
    `ClassId` text NOT NULL,
    `MaxTank` integer NOT NULL,
    `FuelType` integer NOT NULL,
    `Price` integer NOT NULL,
    `DlcName` text NOT NULL,
    `AmountOfOrderableVehicles` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_VehicleCatalog` PRIMARY KEY (`Model`)
);

CREATE TABLE `Characters` (
    `Id` integer NOT NULL,
    `AccountModelId` numeric(20,0) NOT NULL,
    `OnlineSince` timestamp with time zone NOT NULL,
    `FirstName` text NOT NULL,
    `LastName` text NOT NULL,
    `Age` integer NOT NULL,
    `Origin` text NOT NULL,
    `Physique` character varying(512) NOT NULL,
    `Story` character varying(2048) NOT NULL,
    `BodySize` integer NOT NULL,
    `Gender` integer NOT NULL,
    `Mother` integer NOT NULL,
    `Father` integer NOT NULL,
    `Similarity` real NOT NULL,
    `SkinSimilarity` real NOT NULL,
    `CharacterState` integer NOT NULL,
    `Torso` integer NOT NULL,
    `TorsoTexture` integer NOT NULL,
    `Health` integer NOT NULL,
    `Armor` integer NOT NULL,
    `DeathState` integer NOT NULL,
    `AnimationIds` integer[] NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    `PositionX` real NOT NULL,
    `PositionY` real NOT NULL,
    `PositionZ` real NOT NULL,
    `Roll` real NOT NULL,
    `Pitch` real NOT NULL,
    `Yaw` real NOT NULL,
    `Dimension` integer NOT NULL,
    CONSTRAINT `PK_Characters` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Characters_Accounts_AccountModelId` FOREIGN KEY (`AccountModelId`) REFERENCES `Accounts` (`SocialClubId`) ON DELETE CASCADE
);

CREATE TABLE `BankHistoryEntryModel` (
    `Id` integer NOT NULL,
    `BankAccountModelId` integer NOT NULL,
    `HistoryType` integer NOT NULL,
    `Income` boolean NOT NULL,
    `Amount` integer NOT NULL,
    `PurposeOfUse` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_BankHistoryEntryModel` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_BankHistoryEntryModel_BankAccounts_BankAccountModelId` FOREIGN KEY (`BankAccountModelId`) REFERENCES `BankAccounts` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `BankAccountGroupAccesses` (
    `BankAccountModelId` integer NOT NULL,
    `GroupModelId` integer NOT NULL,
    `Owner` boolean NOT NULL,
    CONSTRAINT `PK_BankAccountGroupAccesses` PRIMARY KEY (`BankAccountModelId`, `GroupModelId`),
    CONSTRAINT `FK_BankAccountGroupAccesses_BankAccounts_BankAccountModelId` FOREIGN KEY (`BankAccountModelId`) REFERENCES `BankAccounts` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_BankAccountGroupAccesses_Groups_GroupModelId` FOREIGN KEY (`GroupModelId`) REFERENCES `Groups` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `Directories` (
    `Id` integer NOT NULL,
    `GroupModelId` integer NOT NULL,
    `Title` character varying(50) NOT NULL,
    `ReadGroupLevel` integer NOT NULL,
    `WriteGroupLevel` integer NOT NULL,
    `LastEditCharacterName` text NOT NULL,
    `CreatorCharacterId` integer NOT NULL,
    `CreatorCharacterName` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_Directories` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Directories_Groups_GroupModelId` FOREIGN KEY (`GroupModelId`) REFERENCES `Groups` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `GroupRanks` (
    `GroupModelId` integer NOT NULL,
    `Level` integer NOT NULL,
    `Name` text NOT NULL,
    `GroupPermission` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_GroupRanks` PRIMARY KEY (`GroupModelId`, `Level`),
    CONSTRAINT `FK_GroupRanks_Groups_GroupModelId` FOREIGN KEY (`GroupModelId`) REFERENCES `Groups` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `Houses` (
    `Id` integer NOT NULL,
    `CharacterModelId` integer NULL,
    `GroupModelId` integer NULL,
    `HouseType` integer NOT NULL,
    `HouseNumber` integer NOT NULL,
    `SubName` text NOT NULL,
    `StreetDirection` integer NOT NULL,
    `Price` integer NOT NULL,
    `InteriorId` integer NULL,
    `Rentable` boolean NOT NULL,
    `BlockedOwnership` boolean NOT NULL,
    `RentBankAccountId` integer NULL,
    `LockState` integer NOT NULL,
    `Keys` integer[] NOT NULL,
    `LeaseCompanyType` integer NULL,
    `HasCashier` boolean NULL,
    `PlayerDuties` integer NULL,
    `CashierX` real NULL,
    `CashierY` real NULL,
    `CashierZ` real NULL,
    `CashierHeading` real NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    `PositionX` real NOT NULL,
    `PositionY` real NOT NULL,
    `PositionZ` real NOT NULL,
    `Roll` real NOT NULL,
    `Pitch` real NOT NULL,
    `Yaw` real NOT NULL,
    CONSTRAINT `PK_Houses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Houses_Groups_GroupModelId` FOREIGN KEY (`GroupModelId`) REFERENCES `Groups` (`Id`)
);

CREATE TABLE `MailAccountGroupAccessModel` (
    `MailAccountModelMailAddress` text NOT NULL,
    `GroupModelId` integer NOT NULL,
    `Owner` boolean NOT NULL,
    CONSTRAINT `PK_MailAccountGroupAccessModel` PRIMARY KEY (`MailAccountModelMailAddress`, `GroupModelId`),
    CONSTRAINT `FK_MailAccountGroupAccessModel_Groups_GroupModelId` FOREIGN KEY (`GroupModelId`) REFERENCES `Groups` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MailAccountGroupAccessModel_MailAccounts_MailAccountModelMa~` FOREIGN KEY (`MailAccountModelMailAddress`) REFERENCES `MailAccounts` (`MailAddress`) ON DELETE CASCADE
);

CREATE TABLE `MailLinkModel` (
    `MailAccountModelMailAddress` text NOT NULL,
    `MailModelId` integer NOT NULL,
    `IsAuthor` boolean NOT NULL,
    CONSTRAINT `PK_MailLinkModel` PRIMARY KEY (`MailAccountModelMailAddress`, `MailModelId`),
    CONSTRAINT `FK_MailLinkModel_MailAccounts_MailAccountModelMailAddress` FOREIGN KEY (`MailAccountModelMailAddress`) REFERENCES `MailAccounts` (`MailAddress`) ON DELETE CASCADE,
    CONSTRAINT `FK_MailLinkModel_Mails_MailModelId` FOREIGN KEY (`MailModelId`) REFERENCES `Mails` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `OrderedVehicles` (
    `Id` integer NOT NULL,
    `OrderedBy` text NOT NULL,
    `CatalogVehicleModelId` text NOT NULL,
    `GroupModelId` integer NOT NULL,
    `DeliverdAt` timestamp with time zone NOT NULL,
    `DeliveryRequestedAt` timestamp with time zone NOT NULL,
    `DeliveryRequestedBy` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_OrderedVehicles` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_OrderedVehicles_VehicleCatalog_CatalogVehicleModelId` FOREIGN KEY (`CatalogVehicleModelId`) REFERENCES `VehicleCatalog` (`Model`) ON DELETE CASCADE
);

CREATE TABLE `Appearances` (
    `CharacterModelId` integer NOT NULL,
    `Hair` integer NOT NULL,
    `PrimHairColor` integer NOT NULL,
    `SecHairColor` integer NOT NULL,
    `EyeColor` integer NOT NULL,
    `BlemishesValue` integer NOT NULL,
    `BlemishesOpacity` real NOT NULL,
    `BlemishesColor` integer NOT NULL,
    `FacialhairValue` integer NOT NULL,
    `FacialhairOpacity` real NOT NULL,
    `FacialhairColor` integer NOT NULL,
    `EyebrowsValue` integer NOT NULL,
    `EyebrowsOpacity` real NOT NULL,
    `EyebrowsColor` integer NOT NULL,
    `AgeingValue` integer NOT NULL,
    `AgeingOpacity` real NOT NULL,
    `AgeingColor` integer NOT NULL,
    `MakeupValue` integer NOT NULL,
    `MakeupOpacity` real NOT NULL,
    `MakeupColor` integer NOT NULL,
    `BlushValue` integer NOT NULL,
    `BlushOpacity` real NOT NULL,
    `BlushColor` integer NOT NULL,
    `ComplexionValue` integer NOT NULL,
    `ComplexionOpacity` real NOT NULL,
    `ComplexionColor` integer NOT NULL,
    `SundamageValue` integer NOT NULL,
    `SundamageOpacity` real NOT NULL,
    `SundamageColor` integer NOT NULL,
    `LipstickValue` integer NOT NULL,
    `LipstickOpacity` real NOT NULL,
    `LipstickColor` integer NOT NULL,
    `FrecklesValue` integer NOT NULL,
    `FrecklesOpacity` real NOT NULL,
    `FrecklesColor` integer NOT NULL,
    `ChesthairValue` integer NOT NULL,
    `ChesthairOpacity` real NOT NULL,
    `ChesthairColor` integer NOT NULL,
    `BodyblemishesValue` integer NOT NULL,
    `BodyblemishesOpacity` real NOT NULL,
    `BodyblemishesColor` integer NOT NULL,
    `AddbodyblemihesValue` integer NOT NULL,
    `AddbodyblemihesOpacity` real NOT NULL,
    `AddbodyblemihesColor` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_Appearances` PRIMARY KEY (`CharacterModelId`),
    CONSTRAINT `FK_Appearances_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `BankAccountCharacterAccesses` (
    `BankAccountModelId` integer NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `Permission` integer NOT NULL,
    `Owner` boolean NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_BankAccountCharacterAccesses` PRIMARY KEY (`BankAccountModelId`, `CharacterModelId`),
    CONSTRAINT `FK_BankAccountCharacterAccesses_BankAccounts_BankAccountModelId` FOREIGN KEY (`BankAccountModelId`) REFERENCES `BankAccounts` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_BankAccountCharacterAccesses_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `ChatLogs` (
    `Id` integer NOT NULL,
    `AccountModelId` numeric(20,0) NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `ChatType` integer NOT NULL,
    `Text` character varying(2048) NOT NULL,
    `LoggedAt` timestamp with time zone NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_ChatLogs` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_ChatLogs_Accounts_AccountModelId` FOREIGN KEY (`AccountModelId`) REFERENCES `Accounts` (`SocialClubId`) ON DELETE CASCADE,
    CONSTRAINT `FK_ChatLogs_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `CommandLogs` (
    `Id` integer NOT NULL,
    `AccountModelId` numeric(20,0) NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `Name` character varying(2048) NOT NULL,
    `Arguments` character varying(2048) NOT NULL,
    `LoggedAt` timestamp with time zone NOT NULL,
    `RequiredPermission` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_CommandLogs` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_CommandLogs_Accounts_AccountModelId` FOREIGN KEY (`AccountModelId`) REFERENCES `Accounts` (`SocialClubId`) ON DELETE CASCADE,
    CONSTRAINT `FK_CommandLogs_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `CriminalRecords` (
    `Id` integer NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `CreatorCharacterName` text NOT NULL,
    `Reason` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_CriminalRecords` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_CriminalRecords_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `DefinedJobs` (
    `CharacterModelId` integer NOT NULL,
    `JobId` integer NOT NULL,
    `BankAccountId` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_DefinedJobs` PRIMARY KEY (`CharacterModelId`),
    CONSTRAINT `FK_DefinedJobs_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `FaceFeatures` (
    `CharacterModelId` integer NOT NULL,
    `EyesSize` real NOT NULL,
    `LipsThickness` real NOT NULL,
    `NoseWidth` real NOT NULL,
    `NoseHeight` real NOT NULL,
    `NoseLength` real NOT NULL,
    `NoseBridge` real NOT NULL,
    `NoseTip` real NOT NULL,
    `NoseBridgeShift` real NOT NULL,
    `BrowHeight` real NOT NULL,
    `BrowWidth` real NOT NULL,
    `CheekboneHeight` real NOT NULL,
    `CheekboneWidth` real NOT NULL,
    `CheekWidth` real NOT NULL,
    `JawWidth` real NOT NULL,
    `JawHeight` real NOT NULL,
    `ChinLength` real NOT NULL,
    `ChinPosition` real NOT NULL,
    `ChinWidth` real NOT NULL,
    `ChinShape` real NOT NULL,
    `NeckWidth` real NOT NULL,
    CONSTRAINT `PK_FaceFeatures` PRIMARY KEY (`CharacterModelId`),
    CONSTRAINT `FK_FaceFeatures_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `GroupMembers` (
    `GroupModelId` integer NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `RankLevel` bigint NOT NULL,
    `Salary` bigint NOT NULL,
    `BankAccountId` integer NOT NULL,
    `Owner` boolean NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_GroupMembers` PRIMARY KEY (`GroupModelId`, `CharacterModelId`),
    CONSTRAINT `FK_GroupMembers_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_GroupMembers_Groups_GroupModelId` FOREIGN KEY (`GroupModelId`) REFERENCES `Groups` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `MailAccountCharacterAccessModel` (
    `MailAccountModelMailAddress` text NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `Permission` integer NOT NULL,
    `Owner` boolean NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_MailAccountCharacterAccessModel` PRIMARY KEY (`MailAccountModelMailAddress`, `CharacterModelId`),
    CONSTRAINT `FK_MailAccountCharacterAccessModel_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_MailAccountCharacterAccessModel_MailAccounts_MailAccountMod~` FOREIGN KEY (`MailAccountModelMailAddress`) REFERENCES `MailAccounts` (`MailAddress`) ON DELETE CASCADE
);

CREATE TABLE `MdcAllergies` (
    `Id` integer NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `Content` text NOT NULL,
    `CreatorCharacterName` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_MdcAllergies` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MdcAllergies_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `MdcMedicalEntries` (
    `Id` integer NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `Content` text NOT NULL,
    `CreatorCharacterName` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_MdcMedicalEntries` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_MdcMedicalEntries_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `PersonalLicenses` (
    `Id` integer NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `Type` integer NOT NULL,
    `Warnings` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_PersonalLicenses` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PersonalLicenses_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `RegistrationOfficeEntries` (
    `CharacterModelId` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_RegistrationOfficeEntries` PRIMARY KEY (`CharacterModelId`),
    CONSTRAINT `FK_RegistrationOfficeEntries_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `RoleplayInfos` (
    `Id` integer NOT NULL,
    `MarkerId` numeric(20,0) NOT NULL,
    `CharacterModelId` integer NOT NULL,
    `Dimension` integer NOT NULL,
    `Distance` integer NOT NULL,
    `Context` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    `PositionX` real NOT NULL,
    `PositionY` real NOT NULL,
    `PositionZ` real NOT NULL,
    `Roll` real NOT NULL,
    `Pitch` real NOT NULL,
    `Yaw` real NOT NULL,
    CONSTRAINT `PK_RoleplayInfos` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_RoleplayInfos_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `TattoosModel` (
    `CharacterModelId` integer NOT NULL,
    `HeadCollection` text NOT NULL,
    `HeadHash` text NOT NULL,
    `TorsoCollection` text NOT NULL,
    `TorsoHash` text NOT NULL,
    `LeftArmCollection` text NOT NULL,
    `LeftArmHash` text NOT NULL,
    `RightArmCollection` text NOT NULL,
    `RightArmHash` text NOT NULL,
    `LeftLegCollection` text NOT NULL,
    `LeftLegHash` text NOT NULL,
    `RightLegCollection` text NOT NULL,
    `RightLegHash` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_TattoosModel` PRIMARY KEY (`CharacterModelId`),
    CONSTRAINT `FK_TattoosModel_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `UserRecordLogs` (
    `Id` integer NOT NULL,
    `AccountModelId` numeric(20,0) NOT NULL,
    `StaffAccountModelId` numeric(20,0) NOT NULL,
    `CharacterModelId` integer NULL,
    `UserRecordType` integer NOT NULL,
    `Text` character varying(2048) NOT NULL,
    `LoggedAt` timestamp with time zone NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_UserRecordLogs` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_UserRecordLogs_Accounts_AccountModelId` FOREIGN KEY (`AccountModelId`) REFERENCES `Accounts` (`SocialClubId`) ON DELETE CASCADE,
    CONSTRAINT `FK_UserRecordLogs_Accounts_StaffAccountModelId` FOREIGN KEY (`StaffAccountModelId`) REFERENCES `Accounts` (`SocialClubId`) ON DELETE CASCADE,
    CONSTRAINT `FK_UserRecordLogs_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`)
);

CREATE TABLE `Vehicles` (
    `Id` integer NOT NULL,
    `CharacterModelId` integer NULL,
    `GroupModelOwnerId` integer NULL,
    `Model` text NOT NULL,
    `VehicleState` integer NOT NULL,
    `Price` integer NOT NULL,
    `NumberplateText` text NOT NULL,
    `EngineHealth` integer NOT NULL,
    `BodyHealth` bigint NOT NULL,
    `PrimaryColor` integer NOT NULL,
    `SecondaryColor` integer NOT NULL,
    `Livery` smallint NOT NULL,
    `Fuel` real NOT NULL,
    `DrivenKilometre` real NOT NULL,
    `LastDrivers` text[] NOT NULL,
    `EngineOn` boolean NOT NULL,
    `LockState` integer NOT NULL,
    `Keys` integer[] NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    `PositionX` real NOT NULL,
    `PositionY` real NOT NULL,
    `PositionZ` real NOT NULL,
    `Roll` real NOT NULL,
    `Pitch` real NOT NULL,
    `Yaw` real NOT NULL,
    `Dimension` integer NOT NULL,
    CONSTRAINT `PK_Vehicles` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Vehicles_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`),
    CONSTRAINT `FK_Vehicles_Groups_GroupModelOwnerId` FOREIGN KEY (`GroupModelOwnerId`) REFERENCES `Groups` (`Id`)
);

CREATE TABLE `Files` (
    `Id` integer NOT NULL,
    `DirectoryModelId` integer NOT NULL,
    `Title` character varying(50) NOT NULL,
    `Context` text NOT NULL,
    `IsBlocked` boolean NOT NULL,
    `BlockedByCharacterName` text NULL,
    `LastEditCharacterName` text NOT NULL,
    `CreatorCharacterId` integer NOT NULL,
    `CreatorCharacterName` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_Files` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Files_Directories_DirectoryModelId` FOREIGN KEY (`DirectoryModelId`) REFERENCES `Directories` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `Doors` (
    `Id` integer NOT NULL,
    `HouseModelId` integer NOT NULL,
    `Hash` bigint NOT NULL,
    `LockState` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    `PositionX` real NOT NULL,
    `PositionY` real NOT NULL,
    `PositionZ` real NOT NULL,
    CONSTRAINT `PK_Doors` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Doors_Houses_HouseModelId` FOREIGN KEY (`HouseModelId`) REFERENCES `Houses` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `Deliveries` (
    `Id` integer NOT NULL,
    `DeliveryType` integer NOT NULL,
    `OrderGroupModelId` integer NOT NULL,
    `SupplierGroupModelId` integer NULL,
    `SupplierCharacterId` integer NULL,
    `SupplierPhoneNumber` text NULL,
    `SupplierFullName` text NULL,
    `PlayerVehicleModelId` integer NULL,
    `OldStatus` integer NOT NULL,
    `Status` integer NOT NULL,
    `ProductsRemaining` integer NULL,
    `OrderedProducts` integer NULL,
    `VehicleModel` text NULL,
    `DisplayName` text NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_Deliveries` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Deliveries_Groups_OrderGroupModelId` FOREIGN KEY (`OrderGroupModelId`) REFERENCES `Groups` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_Deliveries_Groups_SupplierGroupModelId` FOREIGN KEY (`SupplierGroupModelId`) REFERENCES `Groups` (`Id`),
    CONSTRAINT `FK_Deliveries_Vehicles_PlayerVehicleModelId` FOREIGN KEY (`PlayerVehicleModelId`) REFERENCES `Vehicles` (`Id`)
);

CREATE TABLE `PublicGarageEntries` (
    `Id` integer NOT NULL,
    `GroupModelId` integer NULL,
    `CharacterModelId` integer NULL,
    `PlayerVehicleModelId` integer NOT NULL,
    `GarageId` integer NOT NULL,
    `BankAccountId` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_PublicGarageEntries` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PublicGarageEntries_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`),
    CONSTRAINT `FK_PublicGarageEntries_Groups_GroupModelId` FOREIGN KEY (`GroupModelId`) REFERENCES `Groups` (`Id`),
    CONSTRAINT `FK_PublicGarageEntries_Vehicles_PlayerVehicleModelId` FOREIGN KEY (`PlayerVehicleModelId`) REFERENCES `Vehicles` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `Inventories` (
    `Id` integer NOT NULL,
    `CharacterModelId` integer NULL,
    `HouseModelId` integer NULL,
    `VehicleModelId` integer NULL,
    `ItemClothModelId` integer NULL,
    `GroupCharacterId` integer NULL,
    `GroupId` integer NULL,
    `InventoryType` integer NOT NULL,
    `MaxWeight` real NOT NULL,
    `Name` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_Inventories` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Inventories_Characters_CharacterModelId` FOREIGN KEY (`CharacterModelId`) REFERENCES `Characters` (`Id`),
    CONSTRAINT `FK_Inventories_Houses_HouseModelId` FOREIGN KEY (`HouseModelId`) REFERENCES `Houses` (`Id`),
    CONSTRAINT `FK_Inventories_Vehicles_VehicleModelId` FOREIGN KEY (`VehicleModelId`) REFERENCES `Vehicles` (`Id`)
);

CREATE TABLE `Items` (
    `Id` integer NOT NULL,
    `InventoryModelId` integer NULL,
    `CatalogItemModelId` integer NOT NULL,
    `ItemType` integer NOT NULL,
    `Slot` integer NULL,
    `DroppedByCharacter` text NULL,
    `CustomData` text NULL,
    `Note` text NULL,
    `Amount` integer NOT NULL,
    `Condition` integer NULL,
    `IsBought` boolean NOT NULL,
    `IsStolen` boolean NOT NULL,
    `ItemState` integer NOT NULL,
    `ItemGroupKeyModel_GroupModelId` integer NULL,
    `GroupModelId` integer NULL,
    `ItemKeyModelId` integer NULL,
    `HouseModelId` integer NULL,
    `PlayerVehicleModelId` integer NULL,
    `PhoneNumber` text NULL,
    `Active` boolean NULL,
    `BackgroundImageId` integer NULL,
    `CurrentOwnerId` integer NULL,
    `InitialOwnerId` integer NULL,
    `LastTimeOpenedNotifications` timestamp with time zone NULL,
    `FactionType` integer NULL,
    `Frequency` integer NULL,
    `ItemWeaponId` integer NULL,
    `ItemModelWeaponId` integer NULL,
    `SerialNumber` text NULL,
    `ItemWeaponModel_InitialOwnerId` integer NULL,
    `ComponentHashes` text[] NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    `PositionX` real NOT NULL,
    `PositionY` real NOT NULL,
    `PositionZ` real NOT NULL,
    `Roll` real NOT NULL,
    `Pitch` real NOT NULL,
    `Yaw` real NOT NULL,
    `Dimension` integer NOT NULL,
    CONSTRAINT `PK_Items` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Items_Groups_ItemGroupKeyModel_GroupModelId` FOREIGN KEY (`ItemGroupKeyModel_GroupModelId`) REFERENCES `Groups` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_Items_Inventories_InventoryModelId` FOREIGN KEY (`InventoryModelId`) REFERENCES `Inventories` (`Id`),
    CONSTRAINT `FK_Items_ItemCatalog_CatalogItemModelId` FOREIGN KEY (`CatalogItemModelId`) REFERENCES `ItemCatalog` (`Id`) ON DELETE CASCADE,
    CONSTRAINT `FK_Items_Items_ItemModelWeaponId` FOREIGN KEY (`ItemModelWeaponId`) REFERENCES `Items` (`Id`)
);

CREATE TABLE `PhoneChats` (
    `Id` integer NOT NULL,
    `ItemPhoneModelId` integer NOT NULL,
    `PhoneNumber` text NOT NULL,
    `Name` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_PhoneChats` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PhoneChats_Items_ItemPhoneModelId` FOREIGN KEY (`ItemPhoneModelId`) REFERENCES `Items` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `PhoneContacts` (
    `Id` integer NOT NULL,
    `ItemPhoneModelId` integer NOT NULL,
    `PhoneNumber` text NOT NULL,
    `Name` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_PhoneContacts` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PhoneContacts_Items_ItemPhoneModelId` FOREIGN KEY (`ItemPhoneModelId`) REFERENCES `Items` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `PhoneNotifications` (
    `Id` integer NOT NULL,
    `ItemPhoneModelId` integer NOT NULL,
    `Context` text NOT NULL,
    `Type` integer NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_PhoneNotifications` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PhoneNotifications_Items_ItemPhoneModelId` FOREIGN KEY (`ItemPhoneModelId`) REFERENCES `Items` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `PhoneMessages` (
    `Id` integer NOT NULL,
    `ChatModelId` integer NOT NULL,
    `OwnerId` integer NOT NULL,
    `Context` text NOT NULL,
    `Local` boolean NOT NULL,
    `SenderPhoneNumber` text NOT NULL,
    `TargetPhoneNumber` text NOT NULL,
    `CreatedAt` datetime(6) NOT NULL,
    `LastUsage` datetime(6) NOT NULL,
    CONSTRAINT `PK_PhoneMessages` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_PhoneMessages_PhoneChats_ChatModelId` FOREIGN KEY (`ChatModelId`) REFERENCES `PhoneChats` (`Id`) ON DELETE CASCADE
);

CREATE INDEX `IX_BankAccountCharacterAccesses_CharacterModelId` ON `BankAccountCharacterAccesses` (`CharacterModelId`);

CREATE INDEX `IX_BankAccountGroupAccesses_GroupModelId` ON `BankAccountGroupAccesses` (`GroupModelId`);

CREATE INDEX `IX_BankHistoryEntryModel_BankAccountModelId` ON `BankHistoryEntryModel` (`BankAccountModelId`);

CREATE INDEX `IX_Characters_AccountModelId` ON `Characters` (`AccountModelId`);

CREATE INDEX `IX_ChatLogs_AccountModelId` ON `ChatLogs` (`AccountModelId`);

CREATE INDEX `IX_ChatLogs_CharacterModelId` ON `ChatLogs` (`CharacterModelId`);

CREATE INDEX `IX_CommandLogs_AccountModelId` ON `CommandLogs` (`AccountModelId`);

CREATE INDEX `IX_CommandLogs_CharacterModelId` ON `CommandLogs` (`CharacterModelId`);

CREATE INDEX `IX_CriminalRecords_CharacterModelId` ON `CriminalRecords` (`CharacterModelId`);

CREATE INDEX `IX_Deliveries_OrderGroupModelId` ON `Deliveries` (`OrderGroupModelId`);

CREATE INDEX `IX_Deliveries_PlayerVehicleModelId` ON `Deliveries` (`PlayerVehicleModelId`);

CREATE INDEX `IX_Deliveries_SupplierGroupModelId` ON `Deliveries` (`SupplierGroupModelId`);

CREATE INDEX `IX_Directories_GroupModelId` ON `Directories` (`GroupModelId`);

CREATE INDEX `IX_Doors_HouseModelId` ON `Doors` (`HouseModelId`);

CREATE INDEX `IX_Files_DirectoryModelId` ON `Files` (`DirectoryModelId`);

CREATE INDEX `IX_GroupMembers_CharacterModelId` ON `GroupMembers` (`CharacterModelId`);

CREATE INDEX `IX_Houses_GroupModelId` ON `Houses` (`GroupModelId`);

CREATE UNIQUE INDEX `IX_Inventories_CharacterModelId` ON `Inventories` (`CharacterModelId`);

CREATE UNIQUE INDEX `IX_Inventories_HouseModelId` ON `Inventories` (`HouseModelId`);

CREATE UNIQUE INDEX `IX_Inventories_ItemClothModelId` ON `Inventories` (`ItemClothModelId`);

CREATE UNIQUE INDEX `IX_Inventories_VehicleModelId` ON `Inventories` (`VehicleModelId`);

CREATE INDEX `IX_Items_CatalogItemModelId` ON `Items` (`CatalogItemModelId`);

CREATE INDEX `IX_Items_InventoryModelId` ON `Items` (`InventoryModelId`);

CREATE INDEX `IX_Items_ItemGroupKeyModel_GroupModelId` ON `Items` (`ItemGroupKeyModel_GroupModelId`);

CREATE INDEX `IX_Items_ItemModelWeaponId` ON `Items` (`ItemModelWeaponId`);

CREATE INDEX `IX_MailAccountCharacterAccessModel_CharacterModelId` ON `MailAccountCharacterAccessModel` (`CharacterModelId`);

CREATE INDEX `IX_MailAccountGroupAccessModel_GroupModelId` ON `MailAccountGroupAccessModel` (`GroupModelId`);

CREATE INDEX `IX_MailLinkModel_MailModelId` ON `MailLinkModel` (`MailModelId`);

CREATE INDEX `IX_MdcAllergies_CharacterModelId` ON `MdcAllergies` (`CharacterModelId`);

CREATE INDEX `IX_MdcMedicalEntries_CharacterModelId` ON `MdcMedicalEntries` (`CharacterModelId`);

CREATE INDEX `IX_OrderedVehicles_CatalogVehicleModelId` ON `OrderedVehicles` (`CatalogVehicleModelId`);

CREATE INDEX `IX_PersonalLicenses_CharacterModelId` ON `PersonalLicenses` (`CharacterModelId`);

CREATE INDEX `IX_PhoneChats_ItemPhoneModelId` ON `PhoneChats` (`ItemPhoneModelId`);

CREATE INDEX `IX_PhoneContacts_ItemPhoneModelId` ON `PhoneContacts` (`ItemPhoneModelId`);

CREATE INDEX `IX_PhoneMessages_ChatModelId` ON `PhoneMessages` (`ChatModelId`);

CREATE INDEX `IX_PhoneNotifications_ItemPhoneModelId` ON `PhoneNotifications` (`ItemPhoneModelId`);

CREATE INDEX `IX_PublicGarageEntries_CharacterModelId` ON `PublicGarageEntries` (`CharacterModelId`);

CREATE INDEX `IX_PublicGarageEntries_GroupModelId` ON `PublicGarageEntries` (`GroupModelId`);

CREATE INDEX `IX_PublicGarageEntries_PlayerVehicleModelId` ON `PublicGarageEntries` (`PlayerVehicleModelId`);

CREATE INDEX `IX_RoleplayInfos_CharacterModelId` ON `RoleplayInfos` (`CharacterModelId`);

CREATE INDEX `IX_UserRecordLogs_AccountModelId` ON `UserRecordLogs` (`AccountModelId`);

CREATE INDEX `IX_UserRecordLogs_CharacterModelId` ON `UserRecordLogs` (`CharacterModelId`);

CREATE INDEX `IX_UserRecordLogs_StaffAccountModelId` ON `UserRecordLogs` (`StaffAccountModelId`);

CREATE INDEX `IX_Vehicles_CharacterModelId` ON `Vehicles` (`CharacterModelId`);

CREATE INDEX `IX_Vehicles_GroupModelOwnerId` ON `Vehicles` (`GroupModelOwnerId`);

ALTER TABLE `Inventories` ADD CONSTRAINT `FK_Inventories_Items_ItemClothModelId` FOREIGN KEY (`ItemClothModelId`) REFERENCES `Items` (`Id`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240324111442_InitialCreate', '8.0.3');

COMMIT;

START TRANSACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20240324113704_InitialCreatee', '8.0.3');

COMMIT;

