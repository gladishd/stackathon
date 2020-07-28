import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_DATA = 'GET_DATA'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const getData = data => ({type: GET_DATA, data})

/**
 * THUNK CREATORS
 */
export const fetchData = () => async dispatch => {
  try {
    const res = await axios.get('/api/rainfall')
    dispatch(getData(res.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      console.log(action)
      return action.data
    default:
      return state
  }
}
