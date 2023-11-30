import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getCourse from '@wasp/queries/getCourse';
import registerCourse from '@wasp/actions/registerCourse';
import makePayment from '@wasp/actions/makePayment';

export function CoursePage() {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useQuery(getCourse, { courseId });
  const registerCourseFn = useAction(registerCourse);
  const makePaymentFn = useAction(makePayment);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleRegisterCourse = () => {
    registerCourseFn({ courseId });
  };

  const handleMakePayment = () => {
    makePaymentFn({ courseId, paymentDetails: 'UPI Payment' });
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>{course.title}</h2>
      <p>{course.content}</p>
      <div className='flex justify-between mt-4'>
        <button
          onClick={handleRegisterCourse}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Register
        </button>
        <button
          onClick={handleMakePayment}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Pay
        </button>
      </div>
    </div>
  );
}