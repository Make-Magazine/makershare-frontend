"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_index_1 = require("../properties/color-index");
var tslerp_1 = require("tslerp");
var DropZoneStyle = (function () {
    function DropZoneStyle(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.defaultIdleColor = [255, 255, 255];
        this.defaultHoverColor = [187, 215, 252];
        this.defaultRejectedColor = [255, 191, 191];
        this.currentElementColour = this.defaultIdleColor;
        this.lerpController = new tslerp_1.TsLerp();
        this.transitionTime = 0.5;
    }
    DropZoneStyle.prototype.onHoverStart = function () {
        this.startColourTransition(this.defaultHoverColor, tslerp_1.TsLerpTransition.EaseOut, tslerp_1.TsLerpStyle.Sine);
    };
    DropZoneStyle.prototype.onHoverEnd = function () {
        this.startColourTransition(this.defaultIdleColor, tslerp_1.TsLerpTransition.EaseIn, tslerp_1.TsLerpStyle.Sine);
    };
    DropZoneStyle.prototype.onFileRejected = function () {
        this.currentElementColour = this.defaultRejectedColor;
        this.startColourTransition(this.defaultIdleColor, tslerp_1.TsLerpTransition.EaseIn, tslerp_1.TsLerpStyle.Cubic);
    };
    DropZoneStyle.prototype.onFileAccepted = function () {
    };
    DropZoneStyle.prototype.convertRgbToHex = function (rgb) {
        return '#' + this.componentToHex(rgb[color_index_1.ColorIndex.Red]) +
            this.componentToHex(rgb[color_index_1.ColorIndex.Green]) +
            this.componentToHex(rgb[color_index_1.ColorIndex.Blue]);
    };
    DropZoneStyle.prototype.componentToHex = function (component) {
        component = Math.round(component);
        var hex = component.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    DropZoneStyle.prototype.startColourTransition = function (target, transition, style) {
        var _this = this;
        this.lerpController.define([
            [this.currentElementColour[color_index_1.ColorIndex.Red], target[color_index_1.ColorIndex.Red]],
            [this.currentElementColour[color_index_1.ColorIndex.Green], target[color_index_1.ColorIndex.Green]],
            [this.currentElementColour[color_index_1.ColorIndex.Blue], target[color_index_1.ColorIndex.Blue]],
        ], this.transitionTime, transition, style);
        this.lerpController.lerp(function (lerpResults, time) {
            _this.updateColourLerp(lerpResults, time);
        });
    };
    DropZoneStyle.prototype.updateColourLerp = function (lerpResults, time) {
        this.currentElementColour = lerpResults;
        this.updateElementColour();
    };
    DropZoneStyle.prototype.updateElementColour = function () {
        var endColor = this.convertRgbToHex(this.currentElementColour);
        this.renderer.setElementStyle(this.element.nativeElement, 'backgroundColor', endColor);
    };
    return DropZoneStyle;
}());
exports.DropZoneStyle = DropZoneStyle;
//# sourceMappingURL=drop-zone-style.js.map