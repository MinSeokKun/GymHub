import { prismaCore } from "@/lib/prisma-core";
import { createTenantDB } from "@/lib/tenants/createTenant";

export async function POST(req: Request) {
  const { name, ownerId } = await req.json();

  const dbName = await createTenantDB(name);

  const newGym = await prismaCore.gym.create({
    data: {
      name,
      dbName,
      ownerId
    },
  });

  return Response.json(newGym);
}
