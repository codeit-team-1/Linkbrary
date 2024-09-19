import Head from 'next/head';

import { AuthHeader, LoginForm, SNSAuth, AuthStyle as S } from '@/components';
import { useRedirectionWithAuth } from '@/lib/hooks';
import { Routes } from '@/lib/route';

const Login = () => {
  useRedirectionWithAuth();
  return (
    <>
      <Head>
        <title>로그인 - Linkbrary</title>
      </Head>
      <main className={S.BackGroundStyle}>
        <div className={S.WrapperStyle}>
          <section className={S.AuthorizeSectionStyle}>
            <AuthHeader type="login" href={Routes.SIGNUP} />
            <LoginForm />
          </section>
          <SNSAuth type="login" />
        </div>
      </main>
    </>
  );
};

export default Login;
