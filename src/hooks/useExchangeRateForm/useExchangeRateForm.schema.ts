import { number, object, string } from "zod";

export const SCHEMA = object({
  amount: number(),
  base: string(),
  target: string(),
});

export type FormType = typeof SCHEMA._type;
