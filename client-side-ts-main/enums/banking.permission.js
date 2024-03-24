export var BankingPermission;
(function (BankingPermission) {
    BankingPermission[BankingPermission["NONE"] = 0] = "NONE";
    BankingPermission[BankingPermission["DEPOSIT"] = 1] = "DEPOSIT";
    BankingPermission[BankingPermission["WITHDRAW"] = 2] = "WITHDRAW";
    BankingPermission[BankingPermission["TRANSFER"] = 4] = "TRANSFER";
    BankingPermission[BankingPermission["SEE_HISTORY"] = 8] = "SEE_HISTORY";
    BankingPermission[BankingPermission["MANAGEMENT"] = 16] = "MANAGEMENT";
})(BankingPermission || (BankingPermission = {}));
//# sourceMappingURL=banking.permission.js.map