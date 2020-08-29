import { Router, Status } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import {
  validate,
  required,
  isString,
  firstMessages,
  maxLength,
  notNull,
} from 'https://deno.land/x/validasaur@v0.14.0/mod.ts';
import { isUrl, isDisallowed, uniqueSlug } from '../helpers/validators.ts';
import { getShortUrl } from '../controllers/index.ts';
import { getAllUrls, addUrl, deleteUrl } from '../controllers/urls.ts';

const router = new Router();

// urls
router
  .get('/api/urls', getAllUrls)
  .post(
    '/api/urls',
    async (ctx, next) => {
      const body = await ctx.request.body().value;

      const [success, errors] = await validate(
        body,
        {
          longUrl: [required, isString, isUrl, isDisallowed],
          slug: [isString, notNull, maxLength(10), uniqueSlug],
        },
        {
          messages: {
            'longUrl.required': 'URL is required',
            'longUrl.isString': 'URL must be a string',
            'longUrl.isUrl': 'URL must be a valid URL',
            'longUrl.isDisallowed': 'Links to this domain are not allowed',
            'slug.isString': 'Slug must be a string',
            'slug.maxLength': 'Slug is too long',
            'slug.uniqueSlug': 'Slug is already taken',
          },
        }
      );

      if (!success) {
        const message = Object.values(firstMessages(errors))[0];

        ctx.response.status = Status.UnprocessableEntity;
        ctx.response.body = {
          success,
          message: message,
        };
        return;
      }

      await next();
    },
    addUrl
  )
  .delete('/api/urls/:slug', deleteUrl);

// index
router.get('/:slug', getShortUrl);

export default router;
