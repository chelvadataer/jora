import HttpError from '@wasp/core/HttpError.js'

export const createCourse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newCourse = await context.entities.Course.create({
    data: {
      title: args.title,
      content: args.content,
      youtubeUrl: args.youtubeUrl,
      userId: context.user.id
    }
  });

  return newCourse;
}

export const registerCourse = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { courseId } = args;

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { courses: true }
  });

  const course = await context.entities.Course.findUnique({
    where: { id: courseId }
  });

  if (!course) { throw new HttpError(404, 'Course not found') }

  // Check if user is already registered for the course
  const isRegistered = user.courses.some(c => c.id === courseId);

  if (isRegistered) {
    throw new HttpError(400, 'User is already registered for this course')
  }

  return context.entities.User.update({
    where: { id: context.user.id },
    data: { courses: { connect: { id: courseId } } },
    include: { courses: true }
  });
}

export const makePayment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { courseId, paymentDetails } = args;

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { courses: true }
  });

  const course = await context.entities.Course.findUnique({
    where: { id: courseId }
  });

  if (!course) { throw new HttpError(404) };

  // Check if the user is already registered for the course
  const isUserAlreadyRegistered = user.courses.some(c => c.id === courseId);
  if (isUserAlreadyRegistered) { throw new HttpError(400, 'User is already registered for this course') };

  // Process the payment and mark the course as paid for the user
  await context.entities.User.update({
    where: { id: user.id },
    data: { courses: { connect: { id: courseId } } }
  });

  return context.entities.User.findUnique({
    where: { id: user.id },
    include: { courses: true }
  });
}