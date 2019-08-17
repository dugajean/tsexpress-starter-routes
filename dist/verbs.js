"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const callsites_1 = __importDefault(require("callsites"));
const errors_1 = require("@tsexpress-starter/errors");
const utils_1 = require("@tsexpress-starter/utils");
/**
 * Adds a route handler via the HTTP verb decorator declarations.
 *
 * @param  {string}             verb
 * @param  {string}             route
 * @param  {Function[]}         middlewares
 * @param  {PropertyDescriptor} descriptor
 *
 * @return {PropertyDescriptor}
 */
function addRoute(verb, route, middlewares, descriptor) {
    const controllerPath = callsites_1.default()
        .find(f => f.getFileName().includes('controller'))
        .getFileName();
    const currentHandler = descriptor.value;
    const adaptedHandler = routeHandler(controllerPath, currentHandler);
    const baseRoute = path_1.default.basename(path_1.default.dirname(controllerPath));
    const routePart = utils_1.stripSlashes(route);
    const fullRoute = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;
    utils_1.log(`Detected route: [${verb.toUpperCase()}] ${fullRoute}`);
    globalThis.expressApp[verb](fullRoute, ...[...(middlewares || []), adaptedHandler]);
    return descriptor;
}
/**
 * Handles the actual route request as well as error handling.
 *
 * @param  {string}   controllerPath
 * @param  {Function} currentHandler
 *
 * @return {Function}
 */
function routeHandler(controllerPath, currentHandler) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const controller = (yield Promise.resolve().then(() => __importStar(require(controllerPath)))).default;
            const data = yield currentHandler.call(new controller(), req);
            const resultKey = typeof data !== 'boolean' ? 'data' : 'success';
            res.status(data.statusCode || 200).json({ [resultKey]: data });
        }
        catch (error) {
            if (error instanceof errors_1.HttpError) {
                return error.errorMessage
                    ? res.status(error.statusCode).json({ error: error.errorMessage.map((e) => e.constraints) })
                    : res.sendStatus(error.statusCode);
            }
            console.error(error);
            return res.sendStatus(500);
        }
    });
}
function Get(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('get', route, middlwares, descriptor);
    };
}
exports.Get = Get;
function Post(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('post', route, middlwares, descriptor);
    };
}
exports.Post = Post;
function Patch(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('patch', route, middlwares, descriptor);
    };
}
exports.Patch = Patch;
function Put(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('put', route, middlwares, descriptor);
    };
}
exports.Put = Put;
function Delete(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('delete', route, middlwares, descriptor);
    };
}
exports.Delete = Delete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmVyYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsMERBQWtDO0FBQ2xDLHNEQUFzRDtBQUN0RCxvREFBNkQ7QUFFN0Q7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBUyxRQUFRLENBQ2YsSUFBaUQsRUFDakQsS0FBYSxFQUNiLFdBQXVCLEVBQ3ZCLFVBQThCO0lBRTlCLE1BQU0sY0FBYyxHQUFXLG1CQUFTLEVBQUU7U0FDdkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqRCxXQUFXLEVBQUUsQ0FBQztJQUNqQixNQUFNLGNBQWMsR0FBYSxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2xELE1BQU0sY0FBYyxHQUFhLFlBQVksQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFOUUsTUFBTSxTQUFTLEdBQVcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsTUFBTSxTQUFTLEdBQVcsb0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLFNBQVMsR0FBVyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsRUFBRSxDQUFDO0lBRTdFLFdBQUcsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDNUQsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztJ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