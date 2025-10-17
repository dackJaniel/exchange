import { MetadataRoute } from "next";
import { getNextjsSitemap } from "@/lib/seo/sitemap-builder";

export default function sitemap(): MetadataRoute.Sitemap {
  return getNextjsSitemap();
}
