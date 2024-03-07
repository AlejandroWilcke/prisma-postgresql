import prisma from "./"
import { hashPassword } from "../bcrypt/bcrypt";

prisma.$transaction([
  prisma.review.deleteMany({}),
  prisma.user.deleteMany({}),
  prisma.movie.deleteMany({}),
  prisma.$executeRaw`ALTER SEQUENCE public."User_id_seq" RESTART WITH 1`,
  prisma.$executeRaw`ALTER SEQUENCE public."Movie_id_seq" RESTART WITH 1`,
  prisma.user.createMany({
    data: [
      {
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password: hashPassword('Adminpassword1!'),
      role: 'ADMIN',
    },
    {
      firstName: 'Editor',
      lastName: 'Editor',
      email: 'editor@gmail.com',
      password: hashPassword('Editorpassword1!'),
      role: 'EDITOR',
    },
    {
      firstName: 'Basic',
      lastName: 'Basic',
      email: 'basic@gmail.com',
      password: hashPassword('Basicpassword1!'),
      role: 'BASIC',
    },
    ]
  }),
  prisma.movie.createMany({
    data: [
      {
        title: "Lord of the rings 1",
        year: 2001
      },
      {
        title: "Lord of the rings 2",
        year: 2002
      },
      {
        title: "Lord of the rings 3",
        year: 2003
      }
    ],
  }),
]);