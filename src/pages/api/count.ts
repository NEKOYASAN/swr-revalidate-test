// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
export type CountResponse = {
  count: number;
};
let accessCount = 0;

export const incrementAccessCount = () => {
  accessCount += 1;
};
export default function handler(req: NextApiRequest, res: NextApiResponse<CountResponse>) {
  if (req.method === 'GET') {
    res.status(200).json({ count: accessCount });
  } else {
    res.status(405).end();
  }
}
