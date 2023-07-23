import { z } from 'zod';

const incrementalIdDto = z.coerce.number({ description: 'Id should be a positive number' });

export type IncrementalIdDto = z.infer<typeof incrementalIdDto>;

export const IsIncrementalId = (id: any) => incrementalIdDto.parse(id);
