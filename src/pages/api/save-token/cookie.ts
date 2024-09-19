import { NextApiRequest, NextApiResponse } from 'next';

const krOffset = 32400000;
const expireOffeset = 7200000;

const saveTokenInCookie = async (req: NextApiRequest, res: NextApiResponse) => {
  const expireTime = new Date(Date.now() + krOffset + expireOffeset);

  if (req.method === 'POST') {
    const accessToken = req.body.accessToken;
    if (accessToken !== req.cookies.accessToken) {
      res.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; expires=true ${expireTime.toUTCString()}; path=/; httponly=1; sameSite=lax;`,
      ]);
      res.status(200).json({ message: '쿠키 저장 성공' });
    }
    res.status(304).json({ message: '이미 저장된 쿠키입니다.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default saveTokenInCookie;
