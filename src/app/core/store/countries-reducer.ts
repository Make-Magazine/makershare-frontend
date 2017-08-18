import { KeyValueObject } from '../models/object/key-value-object';
import { ActionWithPayload } from './action';

export interface CountriesShape {
  countries: KeyValueObject[];
}

// Actions
export const COUNTRIES_SET = 'COUNTRIES_SET';

export function CountriesReducer(
  state: CountriesShape,
  action: ActionWithPayload<KeyValueObject[]>,
) {
  switch (action.type) {
    case COUNTRIES_SET:
      const countries: KeyValueObject[] = action.payload;
      return { ...state, countries };
    default:
      return state;
  }
}
