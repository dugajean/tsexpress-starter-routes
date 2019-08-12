import { HttpError } from '@tsexpress-starter/errors';

export interface Route {
  path: string;
  handler: Function;
  middlewares?: Function[];
}

function addRoute(
  verb: string,
  route: string,
  middlewares: Function[],
  target: any,
  descriptor: PropertyDescriptor
) {
  const currentRoutes: Route[] = target._routes && target._routes[verb] ? target._routes[verb] : [];
  const currentHandler: Function = descriptor.value;

  const adaptedHandler: Function = (req: any, res: any, next: any) => {
    currentHandler
      .call(target, req)
      .then((data: any) => res.json({ data }))
      .catch((error: any) => {
        if (error instanceof HttpError) {
          return error.errorMessage
            ? res.status(error.statusCode).json({ error: error.errorMessage.map((e: any) => e.constraints) })
            : res.sendStatus(error.statusCode);
        }

        console.error(error);
        return res.sendStatus(500);
      });
  };

  const newRoute: Route = {
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
  } else {
    target._routes = { ...target._routes, ...routeBlock };
  }

  return descriptor;
}

export function Get(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('get', route, middlwares, target, descriptor);
  };
}

export function Post(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('post', route, middlwares, target, descriptor);
  };
}

export function Patch(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('patch', route, middlwares, target, descriptor);
  };
}

export function Put(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('put', route, middlwares, target, descriptor);
  };
}

export function Delete(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('delete', route, middlwares, target, descriptor);
  };
}
