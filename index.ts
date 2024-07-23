import { PrismaClient } from "@prisma/client";
import * as util from "util";
const prismaService = new PrismaClient();

async function main() {
  const user = await prismaService.user.create({
    data: { projectList: { createMany: { data: [{}, {}] } } },
  });

  const userSelectWithTrue = await prismaService.user.findUniqueOrThrow({
    where: { id: user.id },
    select: { id: true, propA: true, propB: true, projectList: true },
  });

  const userSelectWithUndefined1 = await prismaService.user.findUniqueOrThrow({
    where: { id: user.id },
    select: { id: true },
  });

  const userSelectWithUndefined2 = await prismaService.user.findUniqueOrThrow({
    where: { id: user.id },
    select: {
      id: true,
      propA: undefined,
      propB: undefined,
      projectList: undefined,
    },
  });

  const userSelectWithFalse = await prismaService.user.findUniqueOrThrow({
    where: { id: user.id },
    select: { id: true, propA: false, propB: false, projectList: false },
  });

  console.log(
    util.inspect(
      {
        userSelectWithTrue,
        userSelectWithUndefined1,
        userSelectWithUndefined2,
        userSelectWithFalse,
      },
      { showHidden: false, depth: null, colors: true }
    )
  );
}

main();
