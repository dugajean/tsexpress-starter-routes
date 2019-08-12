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
        res.send(actionReturn);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmVyYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNEQUFzRDtBQVF0RCxTQUFTLFFBQVEsQ0FDZixJQUFZLEVBQ1osS0FBYSxFQUNiLFdBQXVCLEVBQ3ZCLE1BQVcsRUFDWCxVQUE4QjtJQUU5QixNQUFNLGFBQWEsR0FBWSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUUsTUFBTSxjQUFjLEdBQWEsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUVsRCxNQUFNLGNBQWMsR0FBYSxDQUFPLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBUyxFQUFFLEVBQUU7UUFDdkUsSUFBSSxZQUFZLENBQUM7UUFDakIsSUFBSTtZQUNGLFlBQVksR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxLQUFLLFlBQVksa0JBQVMsRUFBRTtnQkFDOUIsT0FBTyxLQUFLLENBQUMsWUFBWTtvQkFDdkIsQ0FBQyxDQUFDLEdBQUc7eUJBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7eUJBQ3hCLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7b0JBQy9FLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN0QztZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFckIsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUEsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFVO1FBQ3RCLElBQUksRUFBRSxLQUFLO1FBQ1gsT0FBTyxFQUFFLGNBQWM7UUFDdkIsV0FBVztLQUNaLENBQUM7SUFFRixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUU7UUFDdkMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQy9DLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUUsR0FBRyxVQUFzQjtJQUMvRCxPQUFPLENBQUMsTUFBYyxFQUFFLEdBQW9CLEVBQUUsVUFBOEIsRUFBRSxFQUFFO1FBQzlFLE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsa0JBSUM7QUFFRCxTQUFnQixJQUFJLENBQUMsUUFBZ0IsRUFBRSxFQUFFLEdBQUcsVUFBc0I7SUFDaEUsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM5RSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELG9CQUlDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxHQUFHLFVBQXNCO0lBQ2pFLE9BQU8sQ0FBQyxNQUFjLEVBQUUsR0FBb0IsRUFBRSxVQUE4QixFQUFFLEVBQUU7UUFDOUUsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFKRCxzQkFJQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUUsR0FBRyxVQUFzQjtJQUMvRCxPQUFPLENBQUMsTUFBYyxFQUFFLEdBQW9CLEVBQUUsVUFBOEIsRUFBRSxFQUFFO1FBQzlFLE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsa0JBSUM7QUFFRCxTQUFnQixNQUFNLENBQUMsUUFBZ0IsRUFBRSxFQUFFLEdBQUcsVUFBc0I7SUFDbEUsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM5RSxPQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELHdCQUlDIn0=