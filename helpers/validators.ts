import {
  invalid,
  Validity,
  Rule,
} from 'https://deno.land/x/validasaur@v0.14.0/mod.ts';
import { DbClient } from '../config/db_client.ts';

const localhost = new RegExp(/^(https?:\/\/)?localhost:.*/);

export function isDisallowed(value: string): Validity {
  if (localhost.test(value)) {
    return invalid('isDisallowed', { value });
  }
}

export function isUrl(value: string): Validity {
  try {
    new URL(value);
  } catch (_) {
    return invalid('isUrl', { value });
  }
}

export async function uniqueSlug(value: string): Promise<Validity> {
  const data = await DbClient.urls().findOne({
    slug: value,
  });

  if (data) {
    return invalid('uniqueSlug', { value });
  }
}
