import {
  RouterContext,
  Status,
  send,
} from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { getQuery } from 'https://deno.land/x/oak@v6.0.1/helpers.ts';
import { DbClient } from '../config/db_client.ts';

const getShortUrl = async (ctx: RouterContext) => {
  try {
    const url = await DbClient.urls().findOne({
      code: ctx.params.code,
    });

    if (!url) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = {
        success: false,
        message: 'URL Not Found',
      };
    } else {
      const query = getQuery(ctx, {
        mergeParams: true,
      });

      // Determine whether to redirect or return JSON data
      const noRedirect = query['no_redirect']?.toLowerCase() === 'true';

      if (noRedirect) {
        ctx.response.body = {
          success: true,
          url: {
            ...url,
            _id: url._id.$oid,
          },
        };
      } else {
        ctx.response.redirect(url.longUrl);
      }
    }
  } catch (_) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

const getFavicon = async (ctx: RouterContext) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/client/dist`,
    index: 'favicon.ico',
  });
};

export { getShortUrl, getFavicon };
