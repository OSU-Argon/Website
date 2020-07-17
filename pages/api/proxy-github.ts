import { NextApiRequest, NextApiResponse } from 'next';
import { apiProxy } from 'next-tinacms-github';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  apiProxy(process.env.SIGNING_KEY);
	res.status(200).end();
};
