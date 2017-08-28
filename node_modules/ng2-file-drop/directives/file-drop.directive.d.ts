import { EventEmitter, ElementRef, Renderer, OnInit } from '@angular/core';
import { AcceptedFile } from '../dropped-files/accepted-file';
import { RejectedFile } from '../dropped-files/rejected-file';
import { DroppedFiles } from '../dropped-files/dropped-files';
export declare class FileDropDirective implements OnInit {
    private element;
    private renderer;
    ng2FileDropHoverStart: EventEmitter<any>;
    ng2FileDropHoverEnd: EventEmitter<any>;
    ng2FileDropFileAccepted: EventEmitter<AcceptedFile>;
    ng2FileDropFileRejected: EventEmitter<RejectedFile>;
    ng2FileDropFilesDropped: EventEmitter<DroppedFiles>;
    ng2FileDropAcceptMultiple: boolean;
    ng2FileDropSupportedFileTypes: string[];
    ng2FileDropMaximumSizeBytes: number;
    ng2FileDropDisableStyles: boolean;
    private fileService;
    private dropZoneStyle;
    constructor(element: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    onDragOver(event: Event): void;
    onDragLeave(event: Event): void;
    onDrop(event: Event): void;
    private preventAndStopEventPropagation(event);
    private getDataTransferObject(event);
}
