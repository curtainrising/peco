export const formToPayload = (formData) => {
  let data = {};
  formData.forEach(item => {
    if (item.type === 'input') {
      data[item.variable] = item.value;
    }
    if (item.type === 'dropdown') {
      data[item.variable] = item.value;
    }
  })
  return data;
}

export const createArrList = (checkArr, type) => {
  let obj = {};
  checkArr.forEach(item => {
    if (item[type]) {
      if (obj[item[type]]) {
        obj[item[type]].push(item)
      } else {
        obj[item[type]] = [item];
      }
    }
  })
  return obj;
}

export const setupClassPageTable = (classes, students) => {
  const classStudentList = createArrList(Object.values(students), 'classId');
  const classKeys = Object.keys(classes);
  const classValues = Object.values(classes);
  const columns = [
    'Name',
    'Count'
  ];
  const mappedClasses = classValues.map((data, index) => {
    return {
      data: [
        {type: 'text', text: data.className},
        {type: 'text', text: classStudentList[data.classId] && classStudentList[data.classId].length || 0},
      ],
      key: classKeys[index]
    }
  })
  const options = {
    type: 'list-row-selectable'
  }
  return {
    mappedClasses,
    columns,
    options
  }
}


export const setupTeacherPageTable = (teachers, students) => {
  const teacherStudentList = createArrList(Object.values(students), 'teacherId');
  const teacherKeys = Object.keys(teachers);
  const teacherValues = Object.values(teachers);
  const columns = [
    'First Name',
    'Last Name',
    'Count'
  ];
  console.log('teacherStudentList', teacherStudentList)
  const mappedTeachers = teacherValues.map((data, index) => {
    return {
      data: [
        {type: 'text', text: data.firstName},
        {type: 'text', text: data.lastName},
        {type: 'text', text: teacherStudentList[data.teacherId] && teacherStudentList[data.teacherId].length || 0},
      ],
      key: teacherKeys[index]
    }
  })
  const options = {
    type: 'list-row-selectable'
  }
  return {
    mappedTeachers,
    columns,
    options
  }
}

export const setupStudentPageTable = (students, teachers, classes) => {
  const studentKeys = Object.keys(students);
  const studentValues = Object.values(students);
  const columns = [
    'First Name',
    'Last Name',
    'Class',
    'Teacher'
  ];
  const mappedStudents = studentValues.map((student, index) => {
    return {
      data: [
        {type: 'text', text: student.firstName},
        {type: 'text', text: student.lastName},
        {type: 'text', text: classes[student.classId] && classes[student.classId].className || ''},
        {type: 'text', text: teachers[student.teacherId] && teachers[student.teacherId].firstName + ' ' + teachers[student.teacherId].lastName || ''},
      ],
      key: studentKeys[index]
    }
  })
  console.log('mappedStudents', mappedStudents);
  const options = {
    type: 'list-row-selectable'
  }
  return {
    mappedStudents,
    columns,
    options
  }
}

export const schoolPayloadToSate = (schoolPayload) => {
  const students = {};
  const teachers = {};
  const classes = {};
  schoolPayload.students.forEach(item => students[item.studentId] = item);
  schoolPayload.teachers.forEach(item => teachers[item.teacherId] = item);
  schoolPayload.classes.forEach(item => classes[item.classId] = item);
  const data = {
    school: {
      schoolName: schoolPayload.school.schoolName,
      schoolId: schoolPayload.school.schoolId,
    },
    students,
    teachers,
    classes
  }
  return data;
}

const createStudentData = (student, key) => ({
  firstName: student.firstName,
  lastName: student.lastName,
  studentId: student.studentId,
  key,
})

export const getStudentList = (students, id, dataType) => {
  const studentsKeys = Object.keys(students);
  const studentsValues = Object.values(students);
  const mappedStudentsInList = []
  studentsValues.map((data, index) => {
    if (data[dataType] === id) {
      mappedStudentsInList.push(createStudentData(data, studentsKeys[index]));
    }
  })
  const mappedStudentsNotInList = [];
  studentsValues.map((data, index) => {
    if (!data[dataType]) {
      mappedStudentsNotInList.push(createStudentData(data, studentsKeys[index]));
    }
  })
  return {mappedStudentsInList, mappedStudentsNotInList}
}

export const addStudentToList = (students, index) => {
  console.log('addStudentToClass', students)
  const mappedStudentsInList = [...students.mappedStudentsInList];
  const mappedStudentsNotInList = [...students.mappedStudentsNotInList];
  mappedStudentsInList.push(mappedStudentsNotInList.splice(index, 1)[0]);
  console.log('mappedStudentsInList', mappedStudentsInList);
  return {mappedStudentsInList, mappedStudentsNotInList}
}

export const removeStudentFromList = (students, index) => {
  const mappedStudentsInList = [...students.mappedStudentsInList];
  const mappedStudentsNotInList = [...students.mappedStudentsNotInList];
  mappedStudentsNotInList.push(mappedStudentsInList.splice(index, 1)[0]);
  console.log('mappedStudentsNotInList', mappedStudentsNotInList);
  return {mappedStudentsInList, mappedStudentsNotInList}
}

export const setupUploadData = ({fileName, fileText, teachers, students, school}) => {
  const csvList = fileText.split("\n");
  console.log('csvList', csvList);
  const teacherValues = Object.values(teachers);
  let studentValues = Object.values(students);
  let studentKeys = Object.keys(students);
  let titles = {};
  csvList.shift().split(',').map((titleData, index) => {
    titles[titleData.trim()] = index;
  });

  let teacherEmailToId = {};
  teacherValues.forEach(item => teacherEmailToId[item.email] = item.teacherId);

  let studentsArr = [];
  let teachersArr = [];
  let teacherEmailToArrInd = {}
  csvList.forEach((studentStr, index) => {
    if (!studentStr) return null;
    let student = studentStr.split(",");
    let teacherEmail = student[titles["Teacher Email"]].trim()
    let teacherId = teacherEmailToId[teacherEmail];
    if (typeof teacherEmailToArrInd[teacherEmail] !== 'number') {
      if (teacherId) {
        teachersArr.push(teachers[teacherId]);
        teacherEmailToArrInd[teacherEmail] = teachersArr.length - 1;
      } else {
        teachersArr.push({
          email: teacherEmail,
          teacherId: teachersArr.length,
          schoolId: school.schoolId,
          newTeacher: true
        });
        teacherEmailToArrInd[teacherEmail] = teachersArr.length - 1;
      }
    }
    let existingStudent = studentValues.find(item =>
      item.firstName.trim() === student[titles["First Name"]].trim() &&
      item.lastName.trim() === student[titles["Last Name"]].trim() &&
      item.parentEmail.trim() === student[titles["Parent Email"]].trim()
    )

    console.log('existingStudent', existingStudent);
    let studentData = {
      firstName: student[titles["First Name"]].trim(),
      lastName: student[titles["Last Name"]].trim(),
      parentEmail: student[titles["Parent Email"]].trim(),
      teacherIndex: teacherEmailToArrInd[teacherEmail],
      existingTeacherId: existingStudent && existingStudent.teacherId,
      existingClassId: existingStudent && existingStudent.classId,
      studentId: existingStudent && existingStudent.studentId || '',
      schoolId: school.schoolId
    }
    studentsArr.push(studentData);
  });
  console.log('studentsArr',studentsArr);
  console.log('teachersArr',teachersArr);
  console.log('teacherEmailToArrInd',teacherEmailToArrInd);
  return {students: studentsArr, teachers: teachersArr};
}

export const createName = (data = {}) => {
  return `${data.firstName || ''} ${data.lastName || ''}`;
}
