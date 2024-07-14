'use client';

import { SignUpProvider, useSignUpContext } from './provider';
import { StageProgressBar } from './stage-progress-bar';

type SignUpProps = {
  info: React.ReactNode;
  password: React.ReactNode;
  questions: React.ReactNode;
  verifyAccount: React.ReactNode;
};

const SignUp = ({ info, password, questions, verifyAccount }: SignUpProps) => {
  function SelectRenderPage() {
    const { stage } = useSignUpContext();
    return (
      <>
        {stage === 'info' && info}
        {stage === 'password' && password}
        {stage === 'security-questions' && questions}
        {stage === 'verify-account' && verifyAccount}
      </>
    );
  }

  return (
    <div className="max-w-[580px] w-full mx-auto h-full relative pt-[96px] flex justify-center">
      <SignUpProvider>
        <div className="space-y-16">
          <div className="px-[52px]">
            <StageProgressBar />
          </div>
          <SelectRenderPage />
        </div>
      </SignUpProvider>
    </div>
  );
};

export default SignUp;
