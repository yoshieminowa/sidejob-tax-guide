import type { MetadataRoute } from "next";
import { getArticleSummaries, categoryPages } from "@/lib/articles";
import { accountingServices } from "@/lib/accounting-services";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticleSummaries();
  const staticRoutes = ["", "/articles", "/diagnosis", "/services", "/reports", "/free-guide", "/disclaimer", "/rss.xml", "/atom.xml"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date()
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date()
  }));

  const categoryRoutes = categoryPages.map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    lastModified: new Date()
  }));

  const serviceRoutes = accountingServices.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes, ...serviceRoutes];
}
