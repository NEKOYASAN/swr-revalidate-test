// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { incrementAccessCount } from '~/pages/api/count';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    incrementAccessCount();
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}
