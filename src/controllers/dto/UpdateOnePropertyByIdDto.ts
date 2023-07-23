import { z } from 'zod';
import { PropertyType } from '../../entities';

export const updateOnePropertyByIdDto = z.object({
  address: z.string(),
  price: z.number().nonnegative(),
  bedrooms: z.number().nonnegative(),
  bathrooms: z.number().nonnegative(),
  type: z.nativeEnum(PropertyType).nullable(),
});

export type UpdateOnePropertyByIdDto = z.infer<typeof updateOnePropertyByIdDto>;
