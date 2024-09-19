import Head from 'next/head';

import { AuthHeader, AuthStyle as S, SetNameForm } from '@/components';
import { useRedirectionWithAuth } from '@/lib/hooks';
import { Routes } from '@/lib/route';

const NameSettings = () => {
  useRedirectionWithAuth();
  return (
    <>
      <Head>
        <title>이름 설정 - Linkbrary</title>
      </Head>
      <main className={S.BackGroundStyle}>
        <div className={S.WrapperStyle}>
          <section className={S.AuthorizeSectionStyle}>
            <AuthHeader type="signup" href={Routes.LOGIN} />
            <SetNameForm />
          </section>
        </div>
      </main>
      ;
    </>
  );
};

export default NameSettings;
