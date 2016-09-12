"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var image_gallery_album_list_component_1 = require("./image-gallery-album-list.component");
var image_gallery_image_list_component_1 = require("./image-gallery-image-list.component");
var ImageGalleryComponent = (function () {
    function ImageGalleryComponent() {
        this.isImageList = false;
    }
    ImageGalleryComponent.prototype.showAlbumList = function (args) {
        this.isImageList = false;
        this.isCanceled = args;
    };
    ImageGalleryComponent.prototype.showImageList = function (args) {
        this.isImageList = true;
        this.albumId = args;
    };
    ImageGalleryComponent = __decorate([
        core_1.Component({
            selector: 'image-gallery',
            templateUrl: 'admin-templates/image-gallery/image-gallery.html',
            directives: [image_gallery_album_list_component_1.ImageAlbumListComponent, image_gallery_image_list_component_1.ImageListComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ImageGalleryComponent);
    return ImageGalleryComponent;
}());
exports.ImageGalleryComponent = ImageGalleryComponent;
//# sourceMappingURL=image-gallery.component.js.map