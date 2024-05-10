export type CategoryTab = {
  label: string;
  tag?: string;
};
export type CategoryTabMap = Map<string, CategoryTab>;

const categoryTabMap: CategoryTabMap = new Map();

categoryTabMap
  .set('_', { label: 'All resources' })
  .set('chemistry', { label: 'Chemistry' })
  .set('physics', { label: 'Physics' })
  .set('maths', { label: 'Math' })
  .set('english', { label: 'English' })
  .set('geography', { label: 'Geography' })
  .set('basic-tech', { label: 'Basic Tech' })
  .set('business-admin', {
    label: 'Business Adminstration',
  });

export { categoryTabMap };
