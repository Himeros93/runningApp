"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var MemberService = (function () {
    function MemberService(http) {
        this.http = http;
    }
    Object.defineProperty(MemberService, "parameters", {
        get: function () {
            return [[http_1.Http]];
        },
        enumerable: true,
        configurable: true
    });
    MemberService.prototype.searchMember = function (memberPseudo) {
        var url = 'http://localhost:3000/members/' + memberPseudo;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    return MemberService;
}());
exports.MemberService = MemberService;
