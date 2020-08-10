import { RouterContext } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts';

import { DbClient } from '../config/db_client.ts';
import { Url } from '../models/url.ts';

const uid = new ShortUniqueId();

const getAllUrls = async (ctx: RouterContext) => {
  try {
    const data = await DbClient.getUrls().find();

    const urls = data.map((item) => {
      return {
        ...item,
        _id: item._id.$oid,
      };
    });

    ctx.response.body = {
      success: true,
      urls: urls ?? [],
    };
  } catch (_) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

const addUrl = async (ctx: RouterContext) => {
  try {
    const data = await ctx.request.body().value;

    // Check if valid Url
    try {
      new URL(data.long);
    } catch (e) {
      ctx.response.status = 422;
      ctx.response.body = {
        success: false,
        message: e.message,
      };
      return;
    }

    // Check if url already exists
    const existingUrl: any = await DbClient.getUrls().findOne({
      longUrl: data.long,
    });

    let url: Url;

    if (existingUrl) {
      url = {
        code: existingUrl.code,
        longUrl: existingUrl.longUrl,
        shortUrl: existingUrl.shortUrl,
        isoTimestamp: existingUrl.isoTimestamp,
      };
    } else {
      const code = uid(6);
      const host = Deno.env.get('HOST');

      if (!host) {
        console.error('HOST not defined');
        throw new Error();
      }

      url = {
        code,
        shortUrl: `${host}/${code}`,
        longUrl: data.long,
        isoTimestamp: new Date().toISOString(),
      };

      await DbClient.getUrls().insertOne(url);
    }

    ctx.response.body = {
      success: true,
      url,
    };
  } catch (_) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

const deleteUrl = async (ctx: RouterContext) => {
  try {
    const count: number = await DbClient.getUrls().deleteOne({
      code: ctx.params.code,
    });

    ctx.response.body = {
      success: true,
      count,
    };
  } catch (_) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

export { getAllUrls, addUrl, deleteUrl };
