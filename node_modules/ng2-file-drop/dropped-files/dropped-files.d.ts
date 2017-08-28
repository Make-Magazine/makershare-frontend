import { AcceptedFile } from './accepted-file';
import { RejectedFile } from './rejected-file';
export declare class DroppedFiles {
    private acceptedFiles;
    private rejectedFiles;
    readonly accepted: AcceptedFile[];
    readonly rejected: RejectedFile[];
    areAllAccepted(): boolean;
    constructor(acceptedFiles?: AcceptedFile[], rejectedFiles?: RejectedFile[]);
}
