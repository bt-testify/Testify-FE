export {
  SET_USER,
  setUser,
  ASSIGN_STUDENT_TO_CLASS,
  assginStudentToClass,
  SAVING_TEACHER,
  SAVE_TEACHER_SUCCESS,
  SAVE_TEACHER_FAIL,
  saveTeacher
} from './teacherActions';

export {} from './studentActions';
export {
  addQuestion,
  removeQuestion,
  setTestTaker,
  setTitle,
  setCreator,
  save,
  createNewTest,
  getTest,
  clearFields,
  GETTING_TEST,
  TEST_RECEIVED,
  TEST_NOT_RECEIVED,
  SAVE_SUCCESS,
  SAVING,
  SAVE_FAIL,
  ADD_QUESTION,
  REMOVE_QUESTION,
  SET_TEST_TAKER,
  SET_TITLE,
  SET_CREATOR,
  CREATING_NEW_TEST,
  NEW_TEST_CREATED,
  CREATE_TEST_FAILED,
  CLEAR_FIELDS,
  DELETEING_TEST,
  TEST_DELETED,
  deleteTest,
  CONFIRM_DELETE_TEST
} from './testActions';
export {
  addOption,
  removeOption,
  setType,
  setAnswer,
  ADD_OPTION,
  REMOVE_OPTION,
  SET_TYPE,
  SET_ANSWER
} from './questionActions';
