export var GroupPermission;
(function (GroupPermission) {
    GroupPermission[GroupPermission["NONE"] = 0] = "NONE";
    GroupPermission[GroupPermission["MANAGER_MEMBERS"] = 2] = "MANAGER_MEMBERS";
    GroupPermission[GroupPermission["INVITE"] = 4] = "INVITE";
    GroupPermission[GroupPermission["UNINVITE"] = 8] = "UNINVITE";
    GroupPermission[GroupPermission["CHANGE_DELIVERY_VISIBILITY"] = 16] = "CHANGE_DELIVERY_VISIBILITY";
    GroupPermission[GroupPermission["ORDER_PRODUCTS"] = 32] = "ORDER_PRODUCTS";
    GroupPermission[GroupPermission["BUY_LICENSES"] = 64] = "BUY_LICENSES";
    GroupPermission[GroupPermission["SELL_LICENSES"] = 128] = "SELL_LICENSES";
    GroupPermission[GroupPermission["SELL_VEHICLES"] = 256] = "SELL_VEHICLES";
    GroupPermission[GroupPermission["ORDER_VEHICLES"] = 512] = "ORDER_VEHICLES";
    GroupPermission[GroupPermission["STORE_VEHICLES"] = 1024] = "STORE_VEHICLES";
    GroupPermission[GroupPermission["BANKING_DEPOSIT"] = 2048] = "BANKING_DEPOSIT";
    GroupPermission[GroupPermission["BANKING_WITHDRAW"] = 4096] = "BANKING_WITHDRAW";
    GroupPermission[GroupPermission["BANKING_TRANSFER"] = 8192] = "BANKING_TRANSFER";
    GroupPermission[GroupPermission["BANKING_SEE_HISTORY"] = 16384] = "BANKING_SEE_HISTORY";
    GroupPermission[GroupPermission["MAILING_SENDING"] = 32768] = "MAILING_SENDING";
    GroupPermission[GroupPermission["MAILING_READING"] = 65536] = "MAILING_READING";
    GroupPermission[GroupPermission["MAILING_DELETING"] = 131072] = "MAILING_DELETING";
    GroupPermission[GroupPermission["MDC_OPERATOR"] = 262144] = "MDC_OPERATOR";
})(GroupPermission || (GroupPermission = {}));
//# sourceMappingURL=group.permission.js.map