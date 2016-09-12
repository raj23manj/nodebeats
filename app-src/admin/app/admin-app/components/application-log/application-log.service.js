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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var env_config_1 = require("../../../shared/configs/env.config");
var ApplicationLogService = (function () {
    function ApplicationLogService(_http) {
        this._http = _http;
        this.apiRoute = "error";
        this.apiRouteDeleteAll = "errordeleteall";
        this.apiRouteSendEmail = "log/notify/error";
    }
    ApplicationLogService.prototype.deleteLogById = function (objUpdate) {
        objUpdate.deleted = true;
        var body = JSON.stringify(objUpdate);
        return this._http.put(env_config_1.API_URL + this.apiRoute + "/" + objUpdate._id, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApplicationLogService.prototype.deleteAllLog = function () {
        var isdelete = true;
        var body = JSON.stringify({ isdeleted: isdelete });
        return this._http.put(env_config_1.API_URL + this.apiRouteDeleteAll, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApplicationLogService.prototype.getApplicationLog = function (perPage, currentPage, startDate, endDate) {
        var searchQueryString = "";
        searchQueryString += startDate ? "&startdate=" + startDate : "";
        searchQueryString += endDate ? "&enddate=" + endDate : "";
        return this._http.get(env_config_1.API_URL + this.apiRoute + "?perpage=" + perPage + "&page=" + currentPage + searchQueryString)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApplicationLogService.prototype.getApplicationById = function (id) {
        return this._http.get(env_config_1.API_URL + this.apiRoute + "/" + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApplicationLogService.prototype.sendLogEmailToSupport = function () {
        var body = JSON.stringify({ body: "" });
        return this._http.put(env_config_1.API_URL + this.apiRouteSendEmail, body)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ApplicationLogService.prototype.handleError = function (error) {
        console.log(error.json());
        return Observable_1.Observable.throw(error.json() || 'server error');
    };
    ApplicationLogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApplicationLogService);
    return ApplicationLogService;
}());
exports.ApplicationLogService = ApplicationLogService;
//# sourceMappingURL=application-log.service.js.map