import HttpError from '@wasp/core/HttpError.js'

export const getCourse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const course = await context.entities.Course.findUnique({
    where: { id: args.courseId }
  });

  if (!course) { throw new HttpError(404, `No course with id ${args.courseId}`) }

  return course;
}


export const getUserCourses = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Course.findMany({
    where: {
      userId: context.user.id
    }
  });
}