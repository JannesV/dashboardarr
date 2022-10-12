"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var craco_1 = require("@craco/craco");
var path_1 = __importDefault(require("path"));
var packages = [path_1["default"].join(__dirname, '../../packages')];
// Make sure to transpile code in our packages folder
var config = {
    webpack: {
        configure: function (webpackConfig, arg) {
            var _a = (0, craco_1.getLoader)(webpackConfig, (0, craco_1.loaderByName)('babel-loader')), isFound = _a.isFound, match = _a.match;
            if (isFound) {
                var include = Array.isArray(match.loader.include)
                    ? match.loader.include
                    : [match.loader.include];
                match.loader.include = include.concat(packages);
            }
            return webpackConfig;
        }
    }
};
exports["default"] = config;
