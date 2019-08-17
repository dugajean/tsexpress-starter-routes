import path from 'path';
import callsites from 'callsites';
import { HttpError } from '@tsexpress-starter/errors';
import { log, stripSlashes } from '@tsexpress-starter/utils';

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
function addRoute(
  verb: 'get' | 'post' | 'put' | 'patch' | 'delete',
  route: string,
  middlewares: Function[],
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const controllerPath: string = callsites()
    .find(f => f.getFileName().includes('controller'))
    .getFileName();
  const currentHandler: Function = descriptor.value;
  const adaptedHandler: Function = routeHandler(controllerPath, currentHandler);

  const baseRoute: string = path.basename(path.dirname(controllerPath));
  const routePart: string = stripSlashes(route);
  const fullRoute: string = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;

  log(`Detected route: [${verb.toUpperCase()}] ${fullRoute}`);
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
function routeHandler(controllerPath: string, currentHandler: Function): Function {
  return async (req: any, res: any) => {
    try {
      const controller = (await import(controllerPath)).default;
      const data = await currentHandler.call(new controller(), req);
      const resultKey = typeof data !== 'boolean' ? 'data' : 'success';
      res.status(data.statusCode || 200).json({ [resultKey]: data });
    } catch (error) {
      if (error instanceof HttpError) {
        return error.errorMessage
          ? res.status(error.statusCode).json({ error: error.errorMessage.map((e: any) => e.constraints) })
          : res.sendStatus(error.statusCode);
      }

      console.error(error);

      return res.sendStatus(500);
    }
  };
}

export function Get(route: string = '', ...middlwares: Function[]): Function {
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('get', route, middlwares, descriptor);
  };
}

export function Post(route: string = '', ...middlwares: Function[]): Function {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('post', route, middlwares, descriptor);
  };
}

export function Patch(route: string = '', ...middlwares: Function[]): Function {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('patch', route, middlwares, descriptor);
  };
}

export function Put(route: string = '', ...middlwares: Function[]): Function {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('put', route, middlwares, descriptor);
  };
}

export function Delete(route: string = '', ...middlwares: Function[]): Function {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('delete', route, middlwares, descriptor);
  };
}
