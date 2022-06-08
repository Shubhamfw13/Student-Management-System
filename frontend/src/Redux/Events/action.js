import axios from "axios";
import * as types from "./types";

const getEventDataReq = (payload) => ({ type: types.GET_EVENT_DATA_REQ });
const getEventDataSuccess = (payload) => ({
  type: types.GET_EVENT_DATA_SUCCESS,
  payload,
});
const getEventDataFail = (payload) => ({
  type: types.GET_EVENT_DATA_FAIL,
  payload,
});

const getAssignmentDataReq = (payload) => ({
  type: types.GET_ASSIGNMENT_DATA_REQ,
});
const getAssignmentDataSuccess = (payload) => ({
  type: types.GET_ASSIGNMENT_DATA_SUCCESS,
  payload,
});
const getAssignmentDataFail = (payload) => ({
  type: types.GET_ASSIGNMENT_DATA_FAIL,
  payload,
});

const completeAssignmentReq = (payload) => ({
  type: types.ASSIGNMENT_COMPLETE_REQ,
});
const completeAssignmentSuccess = (payload) => ({
  type: types.ASSIGNMENT_COMPLETE_SUCCESS,
  payload,
});
const completeAssignmentFail = (payload) => ({
  type: types.ASSIGNMENT_COMPLETE_FAIL,
  payload,
});



const GetEventData = () => (dispatch) => {
  dispatch(getEventDataReq("Getting Event Data"));
  try {
    axios
      .get("http://localhost:8001/event")
      .then((res) => {
        dispatch(getEventDataSuccess(res.data));
      })
      
      .catch((err) => {
        dispatch(getEventDataFail(err));
      });
  } catch (error) {
    console.log({ Error: error.message });
  }
};


const GetAssignmentData = () => (dispatch) => {
  dispatch(getAssignmentDataReq("Getting Assignment Data"));
  try {
    axios
      .get("http://localhost:8001/assignment")
      .then((res) => {
        dispatch(getAssignmentDataSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getAssignmentDataFail(err));
      });
  } catch (error) {
    console.log({ Error: error.message });
  }
};

const AssignmentComplete = (student_id,assignmentstatus) =>(dispatch)=>{
  dispatch(completeAssignmentReq("Completing..."))
  try {
    axios.patch(``)
  } catch (error) {
    
  }
}


export { GetEventData, GetAssignmentData };
