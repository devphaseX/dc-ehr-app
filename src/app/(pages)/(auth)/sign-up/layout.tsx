'use client';

import { SignUpProvider, useSignUpContext } from './provider';
import { StageProgressBar } from './stage-progress-bar';

type SignUpProps = {
  info: React.ReactNode;
  password: React.ReactNode;
  questions: React.ReactNode;
  accountCreated: React.ReactNode;
};

const SignUp = ({ info, password, accountCreated, questions }: SignUpProps) => {
  function SelectRenderPage() {
    const { stage } = useSignUpContext();
    return (
      <>
        {stage === 'info' && info}
        {stage === 'password' && password}
        {stage === 'security-questions' && questions}
        {stage === 'account-created' && accountCreated}
      </>
    );
  }

  return (
    <div className="max-w-[580px] w-full mx-auto h-full relative pt-[96px] flex justify-center">
      <SignUpProvider>
        <div className="space-y-16">
          <div className="px-[50px]">
            <StageProgressBar />
          </div>
          <SelectRenderPage />
        </div>
      </SignUpProvider>
    </div>
  );
};

export default SignUp;
