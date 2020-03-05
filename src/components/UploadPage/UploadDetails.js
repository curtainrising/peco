import React, { useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import Table from '../common/Table';
import Form from '../common/Form';
import { uploadClassRequest } from '../../redux/actionCreators';
import { setupUploadData, createName } from '../../helpers/utils';
import res from '../../res';


const ClassListOuter = styled.div`
  width: 70%;
  float: right;
  overflow: scroll;
`;

const ClassListHeader = styled.div`
  padding-bottom: 32px
`;
const ButtonRight = styled.button`
  padding-right: 20px;
  float: right;
`
const PullLeft = styled.div`
  float: left;
`
//
// class UploadDetails extends Component{
//   nameRef = null;
//   constructor(props) {
//     super(props);
//     const students = this.setupStudentList()
//     let fileNameArr = this.props.fileName.split('.');
//     fileNameArr.pop();
//     this.state = {
//       saveable: false,
//       students,
//       fileName: fileNameArr.join('.')
//     }
//   }
//   setupStudentList = () => {
//     const csvList = this.props.fileText.split("\n");
//     let titles = {};
//     csvList.shift().split(',').map((titleData, index) => {
//       titles[titleData.trim()] = index;
//     })
//     while(!csvList[csvList.length -1 ]) {
//       csvList.pop();
//     }
//     let studentValues = Object.values(this.props.students);
//     let studentKeys = Object.keys(this.props.students);
//     let teacherValues = Object.values(this.props.teachers);
//     let teacherKeys = Object.keys(this.props.teachers);
//     let currentTeacherKeys = {};
//     let students = csvList.map((studentStr, index) => {
//       if (!studentStr) return null;
//       let student = studentStr.split(",");
//       let teacherEmail = student[titles["Teacher Email"]]
//       let studentData = {
//         firstName: student[titles["First Name"]],
//         lastName: student[titles["Last Name"]],
//         parentEmail: student[titles["Parent Email"]],
//         teacherEmail
//       }
//       if (teacherEmail && !currentTeacherKeys[teacherEmail]) {
//         let teacher = teacherValues.forEach((teacher, index) => {
//           if (teacher.email == teacherEmail) {
//               currentTeacherKeys[teacherEmail] = teacherKeys[index];
//           }
//         });
//       }
//       if (currentTeacherKeys[teacherEmail]) {
//         studentData.teacherId = currentTeacherKeys[teacherEmail];
//         studentData.teacherName = this.props.teachers[currentTeacherKeys[teacherEmail]].firstName + this.props.teachers[currentTeacherKeys[teacherEmail]].lastName
//       }
//       let matchedStudent;
//       studentValues.forEach((currentStudent, currentStudentIndex) => {
//         if (matchedStudent) return;
//         if (currentStudent.firstName.trim() === studentData.firstName.trim() &&
//             currentStudent.lastName.trim() === studentData.lastName.trim() &&
//             currentStudent.parentEmail.trim() == studentData.parentEmail.trim())
//             matchedStudent = studentKeys[currentStudentIndex];
//             studentData.chosen = false;
//       })
//       studentData.key = matchedStudent;
//       return studentData;
//     })
//     console.log('students',students);
//     return students;
//   }
//   componentDidUpdate () {
//     this.state.students.find(student => {
//       console.log('student', student);
//       console.log('chosen', student.chosen);
//       return student.chosen === false
//     })
//     console.log('find', this.state.students.find(student => student.key && student.chosen === false));
//     if(!this.state.saveable && !this.state.students.find(student => student.key && student.chosen === false)) {
//       this.setState({saveable: true})
//     }
//   }
//   onChooseOld = (studentId, index) => () => {
//     let studentData = this.state.students;
//     studentData[index].chosen = true;
//     studentData[index].key = studentId;
//     this.setState({students:studentData})
//     console.log('onChooseOld', studentId, index)
//   }
//   onChooseNew = (index) => () => {
//     let studentData = this.state.students;
//     studentData[index].chosen = true;
//     studentData[index].key = null;
//     this.setState({students:studentData})
//     console.log('onChoseNew', index)
//   }
//   onSaveChanges = () => {
//     let payload = {
//       className: this.state.fileName,
//       students: this.state.students
//     };
//     this.props.handleSave(payload);
//   }
//   render(){
//     const mappedClass = this.state.students.map((student, index) => {
//       console.log('student', student);
//       return {
//         data: [
//           {type: 'text', text: student.firstName + ' ' + student.lastName},
//           {type: 'text', text: student.teacherName},
//           !student.chosen && student.key ? {type: 'button', text: 'current', action: this.onChooseOld(student.key, index)} : {},
//           !student.chosen && student.key ? {type: 'button', text: 'new', action: this.onChooseNew(index)} : {},
//         ],
//         key: student.key,
//       }
//     })
//     console.log(mappedClass);
//     const columns = [
//       'Student Name',
//       'Teacher Name',
//       'Current Student',
//       'New Student'
//     ];
//     const options = {
//       type: 'list-row'
//     }
//     return (
//       <ClassListOuter>
//         <ClassListHeader>
//           <PullLeft>
//             <FormInput
//               label={"Class Name"}
//               value={this.state.fileName}
//               onChanged={() => {}}
//               ref={ref => this.nameRef = ref}
//             />
//           </PullLeft>
//           {
//             this.state.saveable &&
//             <ButtonRight onClick={this.onSaveChanges}>Save</ButtonRight>
//           }
//         </ClassListHeader>
//         {/*<List
//           dataList={this.state.students}
//           type={"student3"}
//           buttonChoice1Text1={"new"}
//           buttonChoice1={this.onChooseNew}
//           buttonChoice1Text2={"current"}
//           buttonChoice2={this.onChooseOld}
//         />*/}
//         <Table
//           columns={columns}
//           dataList={mappedClass}
//           options={options}
//           selected={this.state.classId}
//         />
//       </ClassListOuter>
//     )
//   }
// }
// const mapStateToProps = (state) => {
//   return state.school;
// };
// export default connect(mapStateToProps)(UploadDetails)

const UploadDetails = (props) => {
  const dispatch = useDispatch();
  const { teachers, students, classes, school } = useSelector(state => state.school);
  const [ uploadData, setUploadData ] = useState(setupUploadData({...props, students, teachers, school}))
  const onTeacherBlur = (index) => (variable, val) => {
    console.log('onTeacherBlur');
    console.log('variable', variable);
    console.log('index', index);
    console.log('val', val);
    let tempTeacherData = [...uploadData.teachers];
    tempTeacherData[index][variable] = val;
    setUploadData({...uploadData, teachers: tempTeacherData})
  }
  const onStudentBlur = (index) => (variable, val) => {
    console.log('onStudentBlur');
    console.log('variable', variable);
    console.log('index', index);
    console.log('val', val);
    let tempStudentData = [...uploadData.students];
    tempStudentData[index].checked = val;
    setUploadData({...uploadData, students: tempStudentData})
  }
  const onStudentCheckbox = (index) => (e) => {
    console.log(e.target.checked);
    let tempStudentData = [...uploadData.students];
    tempStudentData[index].checked = e.target.checked;
    setUploadData({...uploadData, students: tempStudentData})
  }
  const onClassSave = (data, moreData) => {
    // console.log('data', data);
    // console.log('uploadData', uploadData);
    const teacherData = uploadData.teachers.filter(item => item.newTeacher);
    const studentData = uploadData.students.filter(item => !item.checked || !item.studentId).map((item, index) => ({
      firstName: item.firstName,
      lastName: item.lastName,
      parentEmail: item.parentEmail,
      studentId: item.studentId || '',
      teacherId: uploadData.teachers[item.teacherIndex].teacherId + '',
      classId: '',
      schoolId: school.schoolId
    }));
    const classData = {
      className: data[0].value,
      schoolId: school.schoolId
    };
    dispatch(uploadClassRequest({teachers: teacherData, students: studentData, class: classData}));
  }
  const classNameFormInput = [
    {type: 'input', variable: 'className', value: props.fileName},
    {
      type: 'button',
      onClick: onClassSave,
      description: res.save
    }
  ];

  const studentColumns = [
    'First Name',
    'Last Name',
    'Parent Email',
    'Previous Teacher',
    'New Teacher',
    'Previous Class',
    'Student'
  ];
  const studentMappedData = uploadData.students.map((data, index) => {
    let teacherData = uploadData.teachers[data.teacherIndex] || {};
    console.log('data', data);
    return {
      data: [
        ...(data.studentId ? [
          {type: 'text', text: data.firstName},
          {type: 'text', text: data.lastName},
          {type: 'text', text: data.parentEmail},
        ] : [
          {type: 'input', variable: 'firstName', value: data.firstName, onBlur: onStudentBlur(index)},
          {type: 'input', variable: 'lastName', value: data.lastName, onBlur: onStudentBlur(index)},
          {type: 'input', variable: 'parentEmail', value: data.parentEmail, onBlur: onStudentBlur(index)},
        ]),
        {type: 'text', text: teachers[data.existingTeacherId] && createName(teachers[data.existingTeacherId])},
        {type: 'text', text: createName(teacherData)},
        {type: 'text', text: classes[data.existingClassId] && classes[data.existingClassId].className },
        data.studentId ?
          {type: 'checkbox', checked: data.checked, onClick: onStudentCheckbox(index), label: res.currentStudentCheckbox} :
          {type: 'text', text: 'New Student'}
      ],
      key: data.parentEmail
    }
  });

  const teacherColumns = [
    'First Name',
    'Last Name',
    'Email',
    'Exists',
  ];
  const teacherMappedData = uploadData.teachers.map((data, index) => {
    return {
      data: [
        ...( data.newTeacher ? [
            {type: 'input', variable: 'firstName', value: data.firstName || '', onBlur: onTeacherBlur(index)},
            {type: 'input', variable: 'lastName', value: data.lastName || '', onBlur: onTeacherBlur(index)},
          ] : [
            {type: 'text', text: data.firstName},
            {type: 'text', text: data.lastName},
          ]
        ),
        {type: 'text', text: data.email},
        {type: 'text', text: !data.teacherId ? 'New Teacher': ''},
      ],
      key: data.parentEmail
    }
  });
  const options = {
    type: 'list-row'
  }
  return (
    <div>
      <h2>New Class Info</h2>
      <Form
        inputs={classNameFormInput}
      />
      <h2>Teachers</h2>
      <Table
        columns={teacherColumns}
        dataList={teacherMappedData}
        options={options}
      />
      <h2>Classes</h2>
      <Table
        columns={studentColumns}
        dataList={studentMappedData}
        options={options}
      />
    </div>
  )
}

export default UploadDetails
