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
  const currentRoutes: Route[] = target._routes ? target._routes[verb] : [];
  const currentHandler: Function = descriptor.value;

  const adaptedHandler: Function = async (req: any, res: any, next: any) => {
    let actionReturn;
    try {
      actionReturn = await currentHandler(req);
    } catch (error) {
      if (error instanceof HttpError) {
        return error.errorMessage
          ? res
              .status(error.statusCode)
              .json({ error: error.errorMessage.map((error: any) => error.constraints) })
          : res.sendStatus(error.statusCode);
      }

      console.error(error);

      return res.sendStatus(500);
    }

    res.send(actionReturn);
  };

  const newRoute: Route = {
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
