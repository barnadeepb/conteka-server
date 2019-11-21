import { ACTION_TYPES } from "../constants/action-types";
// import { USER_ROLES } from "../constants/user-roles";

export function createAction(ACTION_TYPE, payload) {
	return { type: ACTION_TYPES[ACTION_TYPE], payload: payload};
};

// export function setRoleMiddleware({ dispatch }) {
// 	return function(next) {
// 	  return function(action) {
// 		if (action.type === ACTION_TYPES[SET_ROLE]) {
// 		  if (!USER_ROLES.hasOwnProperty(USER_ROLES.HIRING_MANAGER) && !USER_ROLES.hasOwnProperty(USER_ROLES.VENDOR_MANAGER)) {
// 			return dispatch({ type: ACTION_ERROR });
// 		  }
// 		}
// 		return next(action);
// 	  };
// 	};
// };
