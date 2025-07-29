import db from "@/db";
import { usersTable } from "@/db/schema";
import { UserInsert } from "@/types/user.type";
import { eq } from "drizzle-orm";
import createError from "http-errors";

export const createUserService = async (payload: UserInsert) => {
  const [createdUser] = await db.insert(usersTable).values(payload).returning();

  return createdUser;
};

export const findUserByEmailService = async (email: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return user;
};

export const findUserbyIdService = async (
  id: string,
  options?: { throwIfNotFound?: boolean; withReservations?: boolean }
) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.userId, id),
    with: options?.withReservations ? { reservations: true } : undefined,
  });

  if (!user && options?.throwIfNotFound) {
    throw createError(404, "User not found");
  }

  return user;
};
