import { RejectionReasons } from '../properties/rejection-reasons';
export declare class RejectedFile {
    private acceptedFile;
    private reason;
    readonly file: File;
    readonly rejectionReason: RejectionReasons;
    constructor(acceptedFile: File, reason: RejectionReasons);
}
