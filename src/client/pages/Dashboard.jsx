import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserCourses from '@wasp/queries/getUserCourses';

export function DashboardPage() {
  const { data: courses, isLoading, error } = useQuery(getUserCourses);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {courses.map((course) => (
        <div
          key={course.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{course.title}</div>
          <div>{course.content}</div>
          <div>
            <Link
              to={`/course/${course.id}`}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}