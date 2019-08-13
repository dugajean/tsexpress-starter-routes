import path from 'path';
import { HttpError } from '@tsexpress-starter/errors';
import { log, stripSlashes } from '@tsexpress-starter/utils';

export interface Route {
  path: string;
  handler: Function;
  middlewares?: Function[];
}

function addRoute(
  verb: string,
  route: string,
  middlewares: Function[],
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const currentHandler: Function = descriptor.value;
  const adaptedHandler: Function = async (req: any, res: any, next: any) => {
    try {
      const controller = (await import(module.parent.filename)).default;
      const data = await currentHandler.call(new controller(), req);
      res.json({ data });
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

  const baseRoute: string = path.basename(path.dirname(module.parent.filename));
  const routePart: string = stripSlashes(route);
  const fullRoute: string = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;

  log(`Detected route: [${verb.toUpperCase()}] ${fullRoute}`);
  globalThis.expressApp[verb](fullRoute, ...[...(middlewares ? middlewares : []), adaptedHandler]);

  return descriptor;
}

export function Get(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('get', route, middlwares, descriptor);
  };
}

export function Post(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('post', route, middlwares, descriptor);
  };
}

export function Patch(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('patch', route, middlwares, descriptor);
  };
}

export function Put(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('put', route, middlwares, descriptor);
  };
}

export function Delete(route: string = '', ...middlwares: Function[]) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    return addRoute('delete', route, middlwares, descriptor);
  };
}
