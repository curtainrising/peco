class User {
  constructor(userData, self) {
    return {
      userName: userData.userName
    }
  }
  static setupUserFromData(userData, students, classes, teachers) {
    let classKeys = Object.keys(classes);
    let studentKeys = Object.keys(students);
    classKeys.forEach(classId => {
      if (!classes[classId].students) {
        classes[classId].students = [];
      }
      classes[classId].students.forEach(studentId => {
        students[studentId].classId = classId;
        students[studentId].teacherId = classes[classId].teacherId;
      })
    })
    let usersData = {
      user: new User(userData),
      school: {
        students,
        classes,
        teachers
      }
    }
    return usersData;
  }
}
exports.User = User;
