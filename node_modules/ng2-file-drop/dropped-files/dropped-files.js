"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DroppedFiles = (function () {
    function DroppedFiles(acceptedFiles, rejectedFiles) {
        if (acceptedFiles === void 0) { acceptedFiles = []; }
        if (rejectedFiles === void 0) { rejectedFiles = []; }
        this.acceptedFiles = acceptedFiles;
        this.rejectedFiles = rejectedFiles;
    }
    Object.defineProperty(DroppedFiles.prototype, "accepted", {
        get: function () {
            return this.acceptedFiles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DroppedFiles.prototype, "rejected", {
        get: function () {
            return this.rejectedFiles;
        },
        enumerable: true,
        configurable: true
    });
    DroppedFiles.prototype.areAllAccepted = function () {
        return this.acceptedFiles.length > 0 && this.rejectedFiles.length === 0;
    };
    return DroppedFiles;
}());
exports.DroppedFiles = DroppedFiles;
//# sourceMappingURL=dropped-files.js.map