"use strict";
//import 'cloudinary';
//declare var cloudinary:any;
var env_config_1 = require('./env.config');
exports.AUTH_TOKEN_KEY = "NodeBeatAuthToken";
exports.ADMIN_ROUTE = "AdminRoute";
exports.USERINFO = "UserInfo";
var Config = (function () {
    function Config() {
    }
    Config.clearToken = function () {
        window.localStorage.clear();
        this.AuthToken = null;
        this.AdminRoute = null;
        this.UserInfo = null;
    };
    Config.setLoggedInToken = function (auth, userInfo) {
        window.localStorage.setItem(exports.AUTH_TOKEN_KEY, auth);
        window.localStorage.setItem(exports.USERINFO, JSON.stringify(userInfo));
    };
    Config.getAuthToken = function () {
        return this.AuthToken = window.localStorage.getItem(exports.AUTH_TOKEN_KEY);
    };
    Config.getUserInfoToken = function () {
        return this.UserInfo = window.localStorage.getItem(exports.USERINFO);
    };
    Config.setAdminRouteToken = function (auth) {
        window.localStorage.setItem(exports.ADMIN_ROUTE, auth);
    };
    Config.removeAdminRouteToken = function () {
        window.localStorage.removeItem(exports.ADMIN_ROUTE);
    };
    Config.getAdminRoute = function () {
        return this.AdminRoute = window.localStorage.getItem(exports.ADMIN_ROUTE);
    };
    Config.setCloudinary = function (cloudName) {
        this.Cloudinary = cloudinary.Cloudinary.new({ cloud_name: cloudName });
    };
    Config.AuthToken = window.localStorage.getItem(exports.AUTH_TOKEN_KEY);
    Config.AdminRoute = window.localStorage.getItem(exports.ADMIN_ROUTE);
    Config.UserInfo = window.localStorage.getItem(exports.USERINFO);
    /*
     cloudinary is declared in manual typinsgs and script in included in head tag
     */
    Config.Cloudinary = cloudinary.Cloudinary.new({ cloud_name: "nodebeats" });
    Config.DefaultAvatar = env_config_1.HOST_URL + "/img/defaults/default_avatar.png";
    Config.DefaultImage = env_config_1.HOST_URL + "/img/defaults/default_img.png";
    Config.DefaultWideImage = env_config_1.HOST_URL + "/img/defaults/default_wide_img.png";
    Config.InvalidImage = env_config_1.HOST_URL + "/img/defaults/invalid_image.png";
    Config.LoginImage = env_config_1.HOST_URL + '/img/SB-admin.png';
    Config.GoogleAuthImage = env_config_1.HOST_URL + '/img/google_auth_silver.png';
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=general.config.js.map