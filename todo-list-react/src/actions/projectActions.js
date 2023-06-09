import { GET_ERRORS } from "./types";
import axios from "axios";
export const createTask = (task, history) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:2222/task", task);
  } catch (err) {
    console.log(err);
  }
};
