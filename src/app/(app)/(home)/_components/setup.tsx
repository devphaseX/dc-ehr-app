import { StepCard } from './step-card';

const steps = [
  {
    step: 'Create an account',
    process:
      'Join our vibrant community of educators in seconds. Sign up and gain access to a wealth of resources.',
  },
  {
    step: 'Upload resources',
    process:
      'Join our vibrant community of educators in seconds. Sign up and gain access to a wealth of resources.',
  },
  {
    step: 'Version control access',
    process:
      'Join our vibrant community of educators in seconds. Sign up and gain access to a wealth of resources.',
  },
];

export const AccessSteps = () => {
  return (
    <div className="flex items-center gap-x-8">
      {steps.map((step, index) => (
        <StepCard
          {...step}
          index={index + 1}
          key={index + 1}
          highlight={index + 1 === 1}
        />
      ))}
    </div>
  );
};
