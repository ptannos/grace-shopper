import axios from "axios";
const TOKEN = 'token';

//action type
const GET_SINGLE_USER = "GET_SINGLE_USER";
const UPDATE_SINGLE_USER = "UPDATE_SINGLE_USER";

//action creator
const getSingleUser = (user) => ({
  type: GET_SINGLE_USER,
  user,
});

const updateSingleUser = (user) => ({
  type: UPDATE_SINGLE_USER,
  user,
});

//thunk
export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.get(`/api/users/${id}`, {
          headers: {
            authorization: token
          }
        });
        dispatch(getSingleUser(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: updated } = await axios.put(
          `/api/users/${user.id}`,
          user, {
            headers: {
              authorization: token
            }
          }
        );
        dispatch(updateSingleUser(updated));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user;
    case UPDATE_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
