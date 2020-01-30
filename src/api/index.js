import axios from 'axios';
export const loadAll = async (loginData) => {
  try {
    const response = await axios.post("http://localhost:8081/login", {userName:'test',password:'test'})
    return response;
  } catch (e) {
    console.log(e);
    // dispatch({
    //   type: actions.LOGIN_ERROR,
    //   payload: e
    // })
  }
}
