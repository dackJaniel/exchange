import { MetadataRoute } from "next";
import { getMultilingualNextjsSitemap } from "@/lib/seo/multilingual-sitemap-builder";

export default function sitemap(): MetadataRoute.Sitemap {
  return getMultilingualNextjsSitemap();
}
