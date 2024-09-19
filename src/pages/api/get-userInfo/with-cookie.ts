import { getUserInfo } from '@/lib/api';

import { NextApiRequest, NextApiResponse } from 'next';

const getUserInfoWithCookie = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      try {
        const data = await getUserInfo({ accessToken });
        res.status(200).json(data.data);
      } catch (error) {
        res.status(400).json(error);
      }
    }
    res.status(400).json({ message: 'No Token' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default getUserInfoWithCookie;
