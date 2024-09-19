export const API_PATH = {
  auth: {
    signUp: '/auth/sign-up',
    Login: '/auth/sign-in',
    googleSignUp: '/auth/sign-up/google',
    kakaoSignUp: '/auth/sign-up/kakao',
    googleLogin: '/auth/sign-in/google',
    kakaoLogin: '/auth/sign-in/kakao',
  },
  folder: {
    default: '/folders',
    detail(id: string | number) {
      return `/folders/${id}`;
    },
  },
  link: {
    default: '/links',
    detail(id: string | number) {
      return `/links/${id}`;
    },
    category(id: string | number) {
      return `/folders/${id}/links`;
    },
  },
  favorite: {
    default: '/favorites',
  },
  oauth: {
    google: {
      login: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI}&response_type=token&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPE}`,
      signUp: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_SIGNUP_REDIRECT_URI}&response_type=token&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPE}`,
    },
    kakao: {
      login: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI}&response_type=code`,
      signup: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_SIGNUP_REDIRECT_URI}&response_type=code`,
    },
  },
  user: {
    default: '/users',
    emailCheck: '/users/check-email',
  },
};

export const NEXT_API_PATH = {
  token: {
    save: '/api/save-token/cookie',
    delete: '/api/delete-token/cookie',
  },
  userInfo: '/api/get-userInfo/with-cookie',
};
