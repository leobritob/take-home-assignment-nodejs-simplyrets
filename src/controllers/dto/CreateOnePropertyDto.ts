import { z } from 'zod';
import { PropertyType } from '../../entities';

export const createOnePropertyDto = z.object({
  address: z.string(),
  price: z.number().nonnegative(),
  bedrooms: z.number().nonnegative(),
  bathrooms: z.number().nonnegative(),
  type: z.nativeEnum(PropertyType).nullable(),
});

export type CreateOnePropertyDto = z.infer<typeof createOnePropertyDto>;
