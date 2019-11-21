import { ACTION_TYPES } from "../constants/action-types";

const initialState = {
	articles :[],
	requests: [],
	appHeaderWidgets: [
		{key:"staffing_req",value:80,text:"New staffing requests"},
		{key:"staffed_candidates",value:165,text:"Staffed candidates"},
		{key:"resource_gap",value:27,text:"Resource gap"},
		{key:"vendor_score",value:79,text:"Vendor score"},
		{key:"vendor_score",value:79,text:"Vendor score"}
	],
	todolistOpen: true
}
 function rootReducer(state = initialState, action) {
	const actionType = action.type;
	switch(actionType) {
		case ACTION_TYPES.SET_ROLE : 
			return Object.assign({},state,{role: action.payload});
		case ACTION_TYPES.OPEN_TAB :
			return Object.assign({},state,{tabName: action.payload});
		case ACTION_TYPES.SET_REQ :
			if (Array.isArray(action.payload)) {
				return Object.assign({},state,{requests: action.payload});
			} else {
				let requests = state.requests.map( request => {
					if( request.$loki === action.payload.$loki ) {
						return action.payload;
					} else {
						return request;
					}
				} );
				return Object.assign({},state,{requests});
			}
		case ACTION_TYPES.TOGGLETODO :
			return Object.assign({},state,{todolistOpen: !state.todolistOpen});	
		default :
			return state;
	}
}

export default rootReducer;
