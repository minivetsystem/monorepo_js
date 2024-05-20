import { filter } from "lodash";
export const transferlist = {
  state: {
    stateData: []
  },
  reducers: {
    addToDataList:(state:any, payload:any) => {
      if (payload.length > 0) {
        return {
          ...state,
          stateData: payload
        };
      }

      return state;
    },
  },
  effects: (dispatch: any) => ({
    reset() {
      dispatch.app.transferlist([]);
    },
  }),

  }
