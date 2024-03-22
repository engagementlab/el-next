import type { Request, Response } from 'express';
import type { Context } from '.keystone/types';

export async function getStudios(
  req: Request,
  res: Response,
  context: Context
) {
  // This was added by the context middleware in ../keystone.ts
  //   const { context } = req as typeof req & { context: Context };

  const result = await context.query.Studio.findMany({
    query: `
        name
        key
        initiatives
        shortDescription 
        thumbnail { 
        publicId
        }
      `,
  });
  // And return the result as JSON
  res.json(result);
}
