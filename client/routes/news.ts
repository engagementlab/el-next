import type { Request, Response } from 'express';
import type { Context } from '.keystone/types';

export async function getNews(req: Request, res: Response) {
  // This was added by the context middleware in ../keystone.ts
  const { context } = req as typeof req & { context: Context };

  if (!req.params.key) {
    const news = await context.query.NewsItem.findMany({
      query: `
          title
          key
          publishDate
          externalLink
      `,
      where: { enabled: { equals: true } },
      orderBy: {
        publishDate: 'desc',
      },
    });
    // And return the result as JSON
    res.json(news);
  } else {
    const newsItem = await context.query.NewsItem.findOne({
      query: `
      title
      bodyHTML
      publishDate
  `,
      where: { key: req.params.key },
    });
    // And return the result as JSON
    res.json(newsItem);
  }
}
