import { ElementRef, Renderer } from '@angular/core';
export declare class DropZoneStyle {
    private element;
    private renderer;
    private defaultIdleColor;
    private defaultHoverColor;
    private defaultRejectedColor;
    private currentElementColour;
    private lerpController;
    private transitionTime;
    constructor(element: ElementRef, renderer: Renderer);
    onHoverStart(): void;
    onHoverEnd(): void;
    onFileRejected(): void;
    onFileAccepted(): void;
    private convertRgbToHex(rgb);
    componentToHex(component: number): string;
    private startColourTransition(target, transition, style);
    private updateColourLerp(lerpResults, time);
    private updateElementColour();
}
