/* eslint-disable @typescript-eslint/naming-convention */

import type {
  IdName
} from '../xandr-types';

export type InventoryAttribute = IdName & {
  last_modified: string;
};