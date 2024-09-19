import { NextApiRequest, NextApiResponse } from 'next';

const deleteTokenFromCookie = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      'accessToken=deleted; Max-Age=0; path=/; httponly=1; sameSite=lax;',
    ]);
    res.status(200).json({ message: '삭제 성공' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default deleteTokenFromCookie;
