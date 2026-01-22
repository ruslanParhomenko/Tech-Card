"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { redis } from "@/lib/redis";

const USERS_KEY = "users";

export async function getEmployees() {
  const cached = await redis.get(USERS_KEY);
  if (cached) return cached;

  const snapshot = await dbAdmin.collection(USERS_KEY).get();
  const employees = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  await redis.set(USERS_KEY, employees);

  return employees;
}
