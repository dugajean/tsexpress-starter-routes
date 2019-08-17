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
require("reflect-metadata");
const callsites_1 = __importDefault(require("callsites"));
const errors_1 = require("@tsexpress-starter/errors");
const utils_1 = require("@tsexpress-starter/utils");
function addRoute(verb, route, middlewares, descriptor) {
    const controllerPath = callsites_1.default()
        .find(f => f.getFileName().includes('controller'))
        .getFileName();
    const currentHandler = descriptor.value;
    const adaptedHandler = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const baseRoute = path_1.default.basename(path_1.default.dirname(controllerPath));
    const routePart = utils_1.stripSlashes(route);
    const fullRoute = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;
    utils_1.log(`Detected route: [${verb.toUpperCase()}] ${fullRoute}`);
    globalThis.expressApp[verb](fullRoute, ...[...(middlewares || []), adaptedHandler]);
    return descriptor;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmVyYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsNEJBQTBCO0FBQzFCLDBEQUFrQztBQUNsQyxzREFBc0Q7QUFDdEQsb0RBQTZEO0FBUTdELFNBQVMsUUFBUSxDQUNmLElBQVksRUFDWixLQUFhLEVBQ2IsV0FBdUIsRUFDdkIsVUFBOEI7SUFFOUIsTUFBTSxjQUFjLEdBQVcsbUJBQVMsRUFBRTtTQUN2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2pELFdBQVcsRUFBRSxDQUFDO0lBRWpCLE1BQU0sY0FBYyxHQUFhLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDbEQsTUFBTSxjQUFjLEdBQWEsQ0FBTyxHQUFRLEVBQUUsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFFO1FBQ3ZFLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxDQUFDLHdEQUFhLGNBQWMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzlELE1BQU0sU0FBUyxHQUFHLE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDakUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNoRTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxLQUFLLFlBQVksa0JBQVMsRUFBRTtnQkFD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