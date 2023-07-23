import { z } from 'zod';
import { PropertyType } from '../../entities';

export const findAllPropertiesDto = z
  .object({
    page: z.coerce.number().positive().default(1).nullish(),
    limit: z.coerce.number().positive().default(20).nullish(),
    address: z.string().nullish(),
    type: z.nativeEnum(PropertyType).nullish(),
    bedrooms: z.coerce.number().positive().nullish(),
    bathrooms: z.coerce.number().positive().nullish(),
    priceGte: z.coerce.number().positive().nullish(),
    priceLte: z.coerce.number().positive().nullish(),
  })
  .nullish();

export type FindAllPropertiesDto = z.infer<typeof findAllPropertiesDto>;
