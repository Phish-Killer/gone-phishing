import { prisma } from "@project/db";

export async function findOrCreateUser(username: string) {
  let user = await prisma.user.findFirst({
    where: { userName: username },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { userName: username },
    });
  }

  return user;
}