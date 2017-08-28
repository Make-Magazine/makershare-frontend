import { ActionWithPayload } from './action';

export interface CurrentUserShape {
  profile: any;
  orgId: number;
}

// Actions
export const ORG_SET = 'ORG_SET';

export function CurrentUserReducer(
  state: CurrentUserShape,
  action: ActionWithPayload<CurrentUserShape>,
): CurrentUserShape {
  switch (action.type) {
    case ORG_SET:
      const orgId: number = action.payload.orgId;
      return { ...state, orgId };
    default:
      return state;
  }
}
