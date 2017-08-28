"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rejection_reasons_1 = require("../properties/rejection-reasons");
var accepted_file_1 = require("../dropped-files/accepted-file");
var rejected_file_1 = require("../dropped-files/rejected-file");
var dropped_files_1 = require("../dropped-files/dropped-files");
var FileState = (function () {
    function FileState() {
        this.currentObject = null;
        this.supportedFileTypes = null;
        this.maximumFileSizeInBytes = 0;
    }
    Object.defineProperty(FileState.prototype, "currentFile", {
        get: function () {
            return this.currentObject;
        },
        set: function (thisFile) {
            this.currentObject = thisFile;
            if (this.currentObject !== null) {
                this.currentObject.dropEffect = 'copy';
            }
        },
        enumerable: true,
        configurable: true
    });
    FileState.prototype.setExpectedFileProperties = function (supportFileFormats, maximumFileSize) {
        this.supportedFileTypes = supportFileFormats;
        this.maximumFileSizeInBytes = maximumFileSize;
    };
    FileState.prototype.getFiles = function () {
        if (this.currentObject === null) {
            return null;
        }
        if (this.currentObject.files.length === 0) {
            return null;
        }
        return this.currentObject.files;
    };
    FileState.prototype.isFileValid = function () {
        var currentFiles = this.getFiles();
        if (currentFiles === null) {
            return rejection_reasons_1.RejectionReasons.Unknown;
        }
        if (this.supportedFileTypes) {
            var fileTypeIndex = this.supportedFileTypes.indexOf(currentFiles[0].type);
            if (fileTypeIndex === -1) {
                return rejection_reasons_1.RejectionReasons.FileType;
            }
        }
        if (this.maximumFileSizeInBytes) {
            if (this.maximumFileSizeInBytes < currentFiles[0].size) {
                return rejection_reasons_1.RejectionReasons.FileSize;
            }
        }
        return rejection_reasons_1.RejectionReasons.None;
    };
    FileState.prototype.verifyFiles = function () {
        var currentFiles = this.getFiles();
        if (currentFiles === null) {
            return new dropped_files_1.DroppedFiles();
        }
        var acceptedFiles = [];
        var rejectedFiles = [];
        for (var i = 0; i < currentFiles.length; ++i) {
            if (this.supportedFileTypes) {
                var fileTypeIndex = this.supportedFileTypes.indexOf(currentFiles[i].type);
                if (fileTypeIndex === -1) {
                    rejectedFiles.push(new rejected_file_1.RejectedFile(currentFiles[i], rejection_reasons_1.RejectionReasons.FileType));
                    continue;
                }
            }
            if (this.maximumFileSizeInBytes) {
                if (this.maximumFileSizeInBytes < currentFiles[i].size) {
                    rejectedFiles.push(new rejected_file_1.RejectedFile(currentFiles[i], rejection_reasons_1.RejectionReasons.FileSize));
                    continue;
                }
            }
            acceptedFiles.push(new accepted_file_1.AcceptedFile(currentFiles[i]));
        }
        return new dropped_files_1.DroppedFiles(acceptedFiles, rejectedFiles);
    };
    return FileState;
}());
exports.FileState = FileState;
//# sourceMappingURL=file-state.js.map