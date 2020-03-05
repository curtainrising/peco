import ApolloClient, { gql } from 'apollo-boost';
import {
  mutation,
  query,
  authenticateFunc,
  addClassFunc,
  updateClassFunc,
  deleteClassFunc,
  uploadClassFunc,
  addTeacherFunc,
  updateTeacherFunc,
  deleteTeacherFunc,
  getSchoolsFunc,
  getRegisterFunc,
  getLoginFunc,
  joinSchoolFunc,
  addStudentFunc,
  updateStudentFunc,
  deleteStudentFunc,
  getUserPayload,
  getAuthPayload,
  getSchoolsPayload,
  getSchoolPayload,
  getClassResponsePayload,
  getTeacherResponsePayload,
  getStudentPayload,
} from './schemas';

const client = new ApolloClient({
  uri: 'http://localhost:8083/graphql',
});

const doGraphql = (graphqlQuery, mutate) => {
  return client[mutate ? 'mutate': 'query']({
    [mutate ? 'mutation': 'query']: gql`${graphqlQuery}`
  })
  .then(result => {
    console.log('finished', result);
    return result;
  })
  .catch(e => {
    console.log('e',e);
    return null;
  })
}

export const login = (loginData) => {
  console.log('loginData', loginData);
  const graphqlQuery = `${mutation(getLoginFunc(loginData), getAuthPayload())}`;
  return doGraphql(graphqlQuery, true);
}

export const register = (registerData) => {
  console.log('userName', registerData.userName);
  const graphqlQuery = `${mutation(getRegisterFunc(registerData), getUserPayload())}`;
  return doGraphql(graphqlQuery, true);
}
export const authenticate = (authData) => {
  console.log('authData', authData);
  const graphqlQuery = `${query(authenticateFunc(authData), getAuthPayload())}`;
  return doGraphql(graphqlQuery, false);
}
export const getSchool = () => {
  return Promise.resolve(true);
}
export const getSchools = (authData) => {
  console.log('authData', authData);
  const graphqlQuery = `${query(getSchoolsFunc(authData), getSchoolsPayload())}`;
  return doGraphql(graphqlQuery, false);
}
export const joinSchool = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(joinSchoolFunc(payload), getAuthPayload())}`;
  return doGraphql(graphqlQuery, true);
}

export const addClass = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(addClassFunc(payload), getClassResponsePayload())}`;
  return doGraphql(graphqlQuery, true);
}

export const updateClass = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(updateClassFunc(payload), getClassResponsePayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}

export const deleteClass = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(deleteClassFunc(payload), getClassResponsePayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}

export const uploadClass = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(uploadClassFunc(payload), getAuthPayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}

export const addTeacher = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(addTeacherFunc(payload), getTeacherResponsePayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}

export const updateTeacher = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(updateTeacherFunc(payload), getTeacherResponsePayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}

export const deleteTeacher = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(deleteTeacherFunc(payload), getTeacherResponsePayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}

export const addStudent = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(addStudentFunc(payload), getStudentPayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}

export const updateStudent = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(updateStudentFunc(payload), getStudentPayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}

export const deleteStudent = (payload) => {
  console.log('payload', payload);
  const graphqlQuery = `${mutation(deleteStudentFunc(payload), getStudentPayload())}`;
  console.log('graphqlQuery', graphqlQuery);
  return doGraphql(graphqlQuery, true);
}
