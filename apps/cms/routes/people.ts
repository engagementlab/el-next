import type { Request, Response } from 'express';
import type { Context } from '.keystone/types';

export async function setPplKeys(req: Request, res: Response) {
  // This was added by the context middleware in ../keystone.ts
  const { context } = req as typeof req & { context: Context };

  const ppl = await context.query.Person.findMany({
    query: `id name
      `,
    where: { enabled: { equals: true } },
  });
  await context.query.Person.updateMany({
    data: ppl.map(({ id, name }) => {
      return {
        where: { id },
        data: {
          key: name
            .toLocaleLowerCase()
            .replaceAll(/[^\w ]/g, '')
            .replaceAll(/[^a-z+A-Z+0-9+]/gi, '-')
            .replace(/-{2,}/g, '-'),
        },
      };
    }),
  }).catch((err) => {
    console.error('Error updateMany', err);
  });
  // And return the result as JSON
  res.json(ppl);
}
