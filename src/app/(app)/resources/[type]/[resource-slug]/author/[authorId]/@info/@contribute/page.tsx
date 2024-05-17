import { BookCard } from '@/components/book-card';
import { courseSamples } from '@/lib/fake/courses';

const ContributionsPage = () => {
  const courses = courseSamples.slice(0, 5);
  return (
    <div className="space-y-6 pb-[168px]">
      {courses.map((course) => (
        <BookCard book={course} key={course.id} />
      ))}
    </div>
  );
};

export default ContributionsPage;
