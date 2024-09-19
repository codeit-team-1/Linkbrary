import { NextApiRequest, NextApiResponse } from 'next';

const getTokenFromCookie = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken);
    if (accessToken) {
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: '로그인이 필요한 서비스 입니다.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
  res.status(500).json({ message: '알 수 없는 에러' });
};

export default getTokenFromCookie;
