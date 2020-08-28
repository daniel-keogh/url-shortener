import { green, red, yellow } from 'https://deno.land/std@0.66.0/fmt/colors.ts';
import { Middleware } from 'https://deno.land/x/oak@v6.0.1/mod.ts';

const logger = (): Middleware => {
  return async (ctx, next) => {
    await next();
    const status = getStatusColour(ctx.response.status.toString());
    console.log(`${ctx.request.method} ${ctx.request.url.pathname} ${status}`);
  };
};

const getStatusColour = (status: string): string => {
  switch (status[0]) {
    case '2':
    case '3':
      return green(status);
    case '4':
      return yellow(status);
    case '5':
      return red(status);
    default:
      return status;
  }
};

export { logger };
