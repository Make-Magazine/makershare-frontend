import { RejectionReasons } from '../properties/rejection-reasons';
import { DroppedFiles } from '../dropped-files/dropped-files';
export declare class FileState {
    private currentObject;
    private supportedFileTypes;
    private maximumFileSizeInBytes;
    currentFile: DataTransfer;
    setExpectedFileProperties(supportFileFormats: string[], maximumFileSize: number): void;
    getFiles(): FileList;
    isFileValid(): RejectionReasons;
    verifyFiles(): DroppedFiles;
}
