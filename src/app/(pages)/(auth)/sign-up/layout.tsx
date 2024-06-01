'use client';

import { SignUpProvider, useSignUpContext } from './provider';
import { StageProgressBar } from './stage-progress-bar';

type SignUpProps = {
  info: React.ReactNode;
  password: React.ReactNode;
  questions: React.ReactNode;
};

const SignUp = ({ info, password, questions }: SignUpProps) => {
  function SelectRenderPage() {
    const { stage } = useSignUpContext();
    return (
      <>
        {stage === 'info' && info}
        {stage === 'password' && password}
        {stage === 'security-questions' && questions}
      </>
    );
  }

  return (
    <div className="max-w-[580px] w-full mx-auto pt-14">
      <SignUpProvider>
        <div className="space-y-16">
          <StageProgressBar />
          <SelectRenderPage />
        </div>
      </SignUpProvider>
    </div>
  );
};

export default SignUp;
