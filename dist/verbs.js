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
    const baseRoute = path_1.default.basename(path_1.default.dirname(module.parent.filename));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmVyYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsc0RBQXNEO0FBQ3RELG9EQUE2RDtBQVE3RCxTQUFTLFFBQVEsQ0FDZixJQUFZLEVBQ1osS0FBYSxFQUNiLFdBQXVCLEVBQ3ZCLFVBQThCO0lBRTlCLE1BQU0sY0FBYyxHQUFhLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDbEQsTUFBTSxjQUFjLEdBQWEsQ0FBTyxHQUFRLEVBQUUsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFFO1FBQ3ZFLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxDQUFDLHdEQUFhLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUQsTUFBTSxTQUFTLEdBQUcsT0FBTyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNqRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLEtBQUssWUFBWSxrQkFBUyxFQUFFO2dCQUM5QixPQUFPLEtBQUssQ0FBQyxZQUFZO29CQUN2QixDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMs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