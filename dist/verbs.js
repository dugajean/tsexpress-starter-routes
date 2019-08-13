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
const errors_1 = require("@tsexpress-starter/errors");
const utils_1 = require("@tsexpress-starter/utils");
function addRoute(verb, route, middlewares, descriptor) {
    const currentHandler = descriptor.value;
    const adaptedHandler = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const controller = (yield Promise.resolve().then(() => __importStar(require(module.parent.filename)))).default;
            const data = yield currentHandler.call(new controller(), req);
            res.json({ data });
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
    const baseRoute = path_1.default.basename(path_1.default.dirname(module.parent.filename));
    const routePart = utils_1.stripSlashes(route);
    const fullRoute = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;
    utils_1.log(`Detected route: [${verb.toUpperCase()}] ${fullRoute}`);
    globalThis.expressApp[verb](fullRoute, ...[...(middlewares ? middlewares : []), adaptedHandler]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmVyYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsc0RBQXNEO0FBQ3RELG9EQUE2RDtBQVE3RCxTQUFTLFFBQVEsQ0FDZixJQUFZLEVBQ1osS0FBYSxFQUNiLFdBQXVCLEVBQ3ZCLFVBQThCO0lBRTlCLE1BQU0sY0FBYyxHQUFhLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDbEQsTUFBTSxjQUFjLEdBQWEsQ0FBTyxHQUFRLEVBQUUsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFFO1FBQ3ZFLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxDQUFDLHdEQUFhLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDcEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksS0FBSyxZQUFZLGtCQUFTLEVBQUU7Z0JBQzlCLE9BQU8sS0FBSyxDQUFDLFlBQVk7b0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO29CQUNqRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdEM7WUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FB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