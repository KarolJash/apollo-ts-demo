import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const book1 = await prisma.book.upsert({
    where: {},
    update: {},
    create: {
      title: 'Book1',
      author: 'Someone',
    },
  });

  const book2 = await prisma.book.upsert({
    where: {},
    update: {},
    create: {
      title: 'Book2',
      author: 'Someone',
    },
  });

  console.log({ book1, book2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect;
    process.exit(1);
  });
