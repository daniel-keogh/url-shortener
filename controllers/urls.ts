import { RouterContext, Status } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts';

import { DbClient } from '../config/db_client.ts';
import { Url } from '../models/url.ts';

const uid = new ShortUniqueId();

const getAllUrls = async (ctx: RouterContext) => {
  try {
    const data = await DbClient.urls().find();

    const urls = data.map((item) => {
      return {
        ...item,
        _id: item._id?.$oid,
      };
    });

    ctx.response.body = {
      success: true,
      urls: urls ?? [],
    };
  } catch (_) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

const addUrl = async (ctx: RouterContext) => {
  try {
    const body = await ctx.request.body().value;

    // Check if url already exists
    const existingUrl: any = await DbClient.urls().findOne({
      longUrl: body.longUrl,
      slug: body.slug,
    });

    if (existingUrl) {
      // Send the existing url
      ctx.response.body = {
        success: true,
        url: {
          ...existingUrl,
          _id: existingUrl._id.$oid,
        },
      };
    } else {
      const slug = body.slug || uid(6);
      const host = Deno.env.get('HOST');

      if (!host) {
        console.error('HOST not defined');
        throw new Error();
      }

      const url: Url = {
        slug,
        shortUrl: `${host}/${slug}`,
        longUrl: body.longUrl,
        isoTimestamp: new Date().toISOString(),
      };

      const _id = await DbClient.urls().insertOne(url);

      ctx.response.status = Status.Created;
      ctx.response.body = {
        success: true,
        url: {
          ...url,
          _id: _id.$oid,
        },
      };
    }
  } catch (_) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

const deleteUrl = async (ctx: RouterContext) => {
  try {
    const count: number = await DbClient.urls().deleteOne({
      slug: ctx.params.slug,
    });

    ctx.response.body = {
      success: true,
      count,
    };
  } catch (_) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      success: false,
      message: 'Internal Server Error',
    };
  }
};

export { getAllUrls, addUrl, deleteUrl };
