export var AdminPermission;
(function (AdminPermission) {
    AdminPermission[AdminPermission["NONE"] = 0] = "NONE";
    AdminPermission[AdminPermission["TESTER"] = 1] = "TESTER";
    AdminPermission[AdminPermission["STAFF"] = 3] = "STAFF";
    AdminPermission[AdminPermission["FACTION_MANAGEMENT"] = 7] = "FACTION_MANAGEMENT";
    AdminPermission[AdminPermission["EVENT_MANAGEMENT"] = 11] = "EVENT_MANAGEMENT";
    AdminPermission[AdminPermission["TEAM_MANAGEMENT"] = 19] = "TEAM_MANAGEMENT";
    AdminPermission[AdminPermission["MOD"] = 35] = "MOD";
    AdminPermission[AdminPermission["ADMIN"] = 99] = "ADMIN";
    AdminPermission[AdminPermission["DEV"] = 131] = "DEV";
    AdminPermission[AdminPermission["OWNER"] = 483] = "OWNER";
})(AdminPermission || (AdminPermission = {}));
//# sourceMappingURL=admin.permission.js.map