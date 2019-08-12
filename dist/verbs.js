"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("@tsexpress-starter/errors");
function addRoute(verb, route, middlewares, target, descriptor) {
    const currentRoutes = target._routes && target._routes[verb] ? target._routes[verb] : [];
    const currentHandler = descriptor.value;
    const adaptedHandler = (req, res, next) => {
        currentHandler
            .call(target, req)
            .then((data) => res.json({ data }))
            .catch((error) => {
            if (error instanceof errors_1.HttpError) {
                return error.errorMessage
                    ? res.status(error.statusCode).json({ error: error.errorMessage.map((e) => e.constraints) })
                    : res.sendStatus(error.statusCode);
            }
            console.error(error);
            return res.sendStatus(500);
        });
    };
    const newRoute = {
        path: route,
        handler: adaptedHandler,
        middlewares
    };
    const routeBlock = { [verb]: [...currentRoutes, newRoute] };
    if (!target.hasOwnProperty('_routes')) {
        Object.defineProperty(target, '_routes', {
            value: routeBlock,
            writable: true
        });
    }
    else {
        target._routes = Object.assign({}, target._routes, routeBlock);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmVyYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBc0Q7QUFRdEQsU0FBUyxRQUFRLENBQ2YsSUFBWSxFQUNaLEtBQWEsRUFDYixXQUF1QixFQUN2QixNQUFXLEVBQ1gsVUFBOEI7SUFFOUIsTUFBTSxhQUFhLEdBQVksTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEcsTUFBTSxjQUFjLEdBQWEsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUVsRCxNQUFNLGNBQWMsR0FBYSxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBUyxFQUFFLEVBQUU7UUFDakUsY0FBYzthQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2FBQ2pCLElBQUksQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdkMsS0FBSyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxLQUFLLFlBQVksa0JBQVMsRUFBRTtnQkFDOUIsT0FBTyxLQUFLLENBQUMsWUFBWTtvQkFDdkIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7b0JBQ2pHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN0QztZQUVELE9B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