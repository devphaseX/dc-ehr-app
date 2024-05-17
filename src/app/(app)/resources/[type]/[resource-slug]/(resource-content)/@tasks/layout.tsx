'use client';

import { useSearchParams } from 'next/navigation';
import { TaskTabs } from './_components/task-tabs';

type TasksLayoutProps = {
  contributors: React.ReactNode;
  resources: React.ReactNode;
  versions: React.ReactNode;
  searchParams: { tab: Tab };
};

type Tab = 'resources' | 'contributes' | 'versions';

const TasksLayout = ({
  contributors,
  resources,
  versions,
}: TasksLayoutProps) => {
  const { tab = 'resources' } = Object.fromEntries(useSearchParams()) as {
    tab: Tab;
  };
  const renderedComponent =
    tab === 'resources'
      ? resources
      : tab === 'contributes'
      ? contributors
      : versions;

  return (
    <div className="space-y-6">
      <TaskTabs
        tabs={[
          { label: 'Resources', tag: 'resources' },
          { label: 'Contributors', tag: 'contributes' },
          { label: 'Version history', tag: 'versions' },
        ]}
        urlSync="tab"
      />

      {renderedComponent}
    </div>
  );
};

export default TasksLayout;
