import { RouterContext } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { DbClient } from '../config/db_client.ts';

const getShortUrl = async (ctx: RouterContext) => {
  try {
    const url = await DbClient.getUrls().findOne({
      code: ctx.params.code,
    });

    if (!url) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: 'Url Not Found',
      };
    } else {
      ctx.response.body = {
        success: true,
        url: {
          ...url,
          _id: url._id.$oid,
        },
      };
    }
  } catch (_) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

export { getShortUrl };
