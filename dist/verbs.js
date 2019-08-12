"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@tsexpress-starter/errors");
function addRoute(verb, route, middlewares, target, descriptor) {
    const currentRoutes = target._routes ? target._routes[verb] : [];
    const currentHandler = descriptor.value;
    const adaptedHandler = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let actionReturn;
        try {
            actionReturn = yield currentHandler(req);
        }
        catch (error) {
            if (error instanceof errors_1.HttpError) {
                return error.errorMessage
                    ? res
                        .status(error.statusCode)
                        .json({ error: error.errorMessage.map((error) => error.constraints) })
                    : res.sendStatus(error.statusCode);
            }
            console.error(error);
            return res.sendStatus(500);
        }
        res.json({ data: actionReturn });
    });
    const newRoute = {
        path: route,
        handler: adaptedHandler,
        middlewares
    };
    Object.defineProperty(target, '_routes', {
        value: { [verb]: [...currentRoutes, newRoute] },
        writable: true
    });
    return descriptor;
}
function Get(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('get', route, middlwares, target, descriptor);
    };
}
exports.Get = Get;
function Post(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('post', route, middlwares, target, descriptor);
    };
}
exports.Post = Post;
function Patch(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('patch', route, middlwares, target, descriptor);
    };
}
exports.Patch = Patch;
function Put(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('put', route, middlwares, target, descriptor);
    };
}
exports.Put = Put;
function Delete(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('delete', route, middlwares, target, descriptor);
    };
}
exports.Delete = Delete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmVyYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNEQUFzRDtBQVF0RCxTQUFTLFFBQVEsQ0FDZixJQUFZLEVBQ1osS0FBYSxFQUNiLFdBQXVCLEVBQ3ZCLE1BQVcsRUFDWCxVQUE4QjtJQUU5QixNQUFNLGFBQWEsR0FBWSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUUsTUFBTSxjQUFjLEdBQWEsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUVsRCxNQUFNLGNBQWMsR0FBYSxDQUFPLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBUyxFQUFFLEVBQUU7UUFDdkUsSUFBSSxZQUFZLENBQUM7UUFDakIsSUFBSTtZQUNGLFlBQVksR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxLQUFLLFlBQVksa0JBQVMsRUFBRTtnQkFDOUIsT0FBTyxLQUFLLENBQUMsWUFBWTtvQkFDdkIsQ0FBQyxDQUFDLEdBQUc7eUJBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7eUJBQ3hCLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7b0JBQy9FLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN0QztZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFckIsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQSxDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQVU7UUFDdEIsSUFBSSxFQUFFLEtBQUs7UUFDWCxPQUFPLEVBQUUsY0FBYztRQUN2QixXQUFXO0tBQ1osQ0FBQztJQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRTtRQUN2QyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsUUFBUSxDQUFDLEVBQUU7UUFDL0MsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7SUFFSCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBZ0IsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxHQUFHLFVBQXNCO0lBQy9ELE9BQU8sQ0FBQyxNQUFjLEVBQUUsR0FBb0IsRUFBRSxVQUE4QixFQUFFLEVBQUU7UUFDOUUsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFKRCxrQkFJQztBQUVELFNBQWdCLElBQUksQ0FBQyxRQUFnQixFQUFFLEVBQUUsR0FBRyxVQUFzQjtJQUNoRSxPQUFPLENBQUMsTUFBYyxFQUFFLEdBQW9CLEVBQUUsVUFBOEIsRUFBRSxFQUFFO1FBQzlFLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsb0JBSUM7QUFFRCxTQUFnQixLQUFLLENBQUMsUUFBZ0IsRUFBRSxFQUFFLEdBQUcsVUFBc0I7SUFDakUsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM5RSxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELHNCQUlDO0FBRUQsU0FBZ0IsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxHQUFHLFVBQXNCO0lBQy9ELE9BQU8sQ0FBQyxNQUFjLEVBQUUsR0FBb0IsRUFBRSxVQUE4QixFQUFFLEVBQUU7UUFDOUUsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFKRCxrQkFJQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxRQUFnQixFQUFFLEVBQUUsR0FBRyxVQUFzQjtJQUNsRSxPQUFPLENBQUMsTUFBYyxFQUFFLEdBQW9CLEVBQUUsVUFBOEIsRUFBRSxFQUFFO1FBQzlFLE9BQU8sUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsd0JBSUMifQ==