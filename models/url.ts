export interface Url {
  _id?: { $oid: string };
  slug: string;
  longUrl: string;
  shortUrl: string;
  isoTimestamp: string;
}
