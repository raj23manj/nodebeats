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
var topnav_1 = require('./components/topnav/topnav');
var sidebar_1 = require('./components/sidebar/sidebar');
var user_list_component_1 = require("./components/user-management/user-list.component");
var spinner_component_1 = require('../shared/components/spinner/spinner.component');
var general_config_1 = require('../shared/configs/general.config');
var cloudinary_service_1 = require('./components/cloudinary/cloudinary.service');
var AdminAppComponent = (function () {
    function AdminAppComponent(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
        this.containerSlide = false;
        // modal.defaultViewContainer = viewContainerRef;
        // Read the RouteConfig annotation so we can pass it to the breadcrumb component
        // let annotations = Reflect.getOwnMetadata('annotations', AppComponent);
        // for (let i = 0; i < annotations.length; i += 1) {
        //     if (annotations[i].constructor.name === 'RouteConfig') {
        //         this.routeConfig = annotations[i].configs;
        //     }
        // }
    }
    AdminAppComponent.prototype.ngOnInit = function () {
        this.setCloudinaryName();
    };
    AdminAppComponent.prototype.setCloudinaryName = function () {
        var _this = this;
        this.cloudinaryService.getCloudinarySettings()
            .subscribe(function (res) { return general_config_1.Config.setCloudinary(res.cloudinaryCloudName); }, function (err) { return _this.handleErrorMsg(err); });
    };
    AdminAppComponent.prototype.handleErrorMsg = function (res) {
        console.log(res.message);
    };
    AdminAppComponent.prototype.toggleContainer = function (args) {
        this.containerSlide = args;
    };
    AdminAppComponent = __decorate([
        core_1.Component({
            selector: 'admin-dashboard',
            templateUrl: 'admin-app/admin-index.html',
            directives: [sidebar_1.SidebarCmp, topnav_1.TopNavCmp, spinner_component_1.SpinnerComponent],
            precompile: [user_list_component_1.UserListComponent],
            providers: [cloudinary_service_1.CloudinaryService]
        }), 
        __metadata('design:paramtypes', [cloudinary_service_1.CloudinaryService])
    ], AdminAppComponent);
    return AdminAppComponent;
}());
exports.AdminAppComponent = AdminAppComponent;
//# sourceMappingURL=admin-app.component.js.map