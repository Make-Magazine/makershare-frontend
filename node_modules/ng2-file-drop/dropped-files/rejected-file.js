"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RejectedFile = (function () {
    function RejectedFile(acceptedFile, reason) {
        this.acceptedFile = acceptedFile;
        this.reason = reason;
    }
    Object.defineProperty(RejectedFile.prototype, "file", {
        get: function () {
            return this.acceptedFile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RejectedFile.prototype, "rejectionReason", {
        get: function () {
            return this.reason;
        },
        enumerable: true,
        configurable: true
    });
    return RejectedFile;
}());
exports.RejectedFile = RejectedFile;
//# sourceMappingURL=rejected-file.js.map