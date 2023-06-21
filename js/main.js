import { functApp } from './functs.js';

const studentsList = [
  {
    name: 'Антон',
    surename: 'Чехов',
    lastname: 'Павлович',
    birthDate: new Date(1990, 2, 5),
    studyStart: 2019,
    faculty: 'Филологический',
    get fio() {
      return (
        this.surename + ' ' + this.name + ' ' + this.lastname
      )
    },
    get birthDay() {
      return functApp.getBirthDate(this) + ' (' + functApp.getAge(this) + ')'
    },
    get studyStartString() {
      return functApp.getStudyStart(this)
    }
  },
  {
    name: 'Егор',
    surename: 'Краснов',
    lastname: 'Максимович',
    birthDate: new Date(1995, 4, 25),
    studyStart: 2016,
    faculty: 'Философский',
    get fio() {
      return (
        this.surename + ' ' + this.name + ' ' + this.lastname
      )
    },
    get birthDay() {
      return functApp.getBirthDate(this) + ' (' + functApp.getAge(this) + ')'
    },
    get studyStartString() {
      return functApp.getStudyStart(this)
    }
  },
  {
    name: 'Ольга',
    surename: 'Кузьмина',
    lastname: 'Анатольевна',
    birthDate: new Date(1992, 8, 10),
    studyStart: 2014,
    faculty: 'Исторический',
    get fio() {
      return (
        this.surename + ' ' + this.name + ' ' + this.lastname
      )
    },
    get birthDay() {
      return functApp.getBirthDate(this) + ' (' + functApp.getAge(this) + ')'
    },
    get studyStartString() {
      return functApp.getStudyStart(this)
    }
  },
  {
    name: 'Татьяна',
    surename: 'Лима',
    lastname: 'Петровна',
    birthDate: new Date(1989, 1, 23),
    studyStart: 2008,
    faculty: 'Международных Отношений',
    get fio() {
      return (
        this.surename + ' ' + this.name + ' ' + this.lastname
      )
    },
    get birthDay() {
      return functApp.getBirthDate(this) + ' (' + functApp.getAge(this) + ')'
    },
    get studyStartString() {
      return functApp.getStudyStart(this)
    }
  },
  {
    name: 'Даяна',
    surename: 'Ильина',
    lastname: 'Георгиевна',
    birthDate: new Date(2000, 10, 18),
    studyStart: 2018,
    faculty: 'Психологии',
    get fio() {
      return (
        this.surename + ' ' + this.name + ' ' + this.lastname
      )
    },
    get birthDay() {
      return functApp.getBirthDate(this) + ' (' + functApp.getAge(this) + ')'
    },
    get studyStartString() {
      return functApp.getStudyStart(this)
    }
  }
]

const $studentList = document.getElementById('list__students'),
      $studentListSortAll = document.querySelectorAll('.students__table th'),
      $studentListFilter = document.querySelectorAll('.form__filter')

let column = 'fio',
    columnDir = true,
    filterData = '',
    filterValue = '';

function newStudent (studentList) {
  const $student = document.createElement('tr'),
    $fio = document.createElement('td'),
    $birthDate = document.createElement('td'),
    $studyStart = document.createElement('td'),
    $faculty = document.createElement('td')

  $fio.textContent = studentList.fio
  $birthDate.textContent = functApp.getBirthDate(studentList) + ' (' + functApp.getAge(studentList) + ')'
  $studyStart.textContent = functApp.getStudyStart(studentList)
  $faculty.textContent = studentList.faculty

  $student.append($fio)
  $student.append($faculty)
  $student.append($birthDate)
  $student.append($studyStart)

  return $student
}

function render () {
  let studentsCopy = [...studentsList]

  studentsCopy = functApp.sortStudents(studentsList, column, columnDir);

  studentsCopy = functApp.filter(studentsCopy, filterData, filterValue)

  $studentList.innerHTML = ''

  for (const student of studentsCopy) {
    $studentList.append(newStudent(student))
  }
}

$studentListSortAll.forEach(element => {
  element.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir;
    let arrowSort = ''
    console.log(element.innerHTML)
    if (columnDir == true) {
      arrowSort = this.dataset.sort + ' &#9650';
    } else {
      arrowSort = this.dataset.sort + ' &#9660'
    }
    
    element.innerHTML = arrowSort

    render();
  })
})

$studentListFilter.forEach(element => {
  element.addEventListener('input', function () {
    filterData = this.dataset.filter;
    filterValue = document.getElementById(element.id).value;

    render();
  })
})

document.getElementById('add__students').addEventListener('submit', function (event) {
    event.preventDefault()
    let nameVal = document.getElementById('name').value,
        surenameVal = document.getElementById('surename').value,
        lastnameVal = document.getElementById('lastname').value,
        studyStartVal = Number(document.getElementById('studyStart').value),
        facultyVal = document.getElementById('faculty').value

    if (functApp.validation(this) == true) {
      studentsList.push({
        name: nameVal.trim(),
        surename: surenameVal.trim(),
        lastname: lastnameVal.trim(),
        birthDate: new Date(document.getElementById('birthDate').value),
        studyStart: studyStartVal,
        faculty: facultyVal.trim(),
        get fio() {
          return (
            this.surename + ' ' + this.name + ' ' + this.lastname
          )
        },
        get birthDay() {
          return functApp.getBirthDate(this) + ' (' + functApp.getAge(this) + ')'
        },
        get studyStartString() {
          return functApp.getStudyStart(this)
        }
      })
      document.querySelectorAll('#add__students input').forEach(element => {
        element.value = '';
      });
      document.querySelector('.modal').classList.remove('open')
    }

    render()
  })

document.getElementById('callModal').addEventListener('click', function () {
  document.querySelector('.modal').classList.add('open')
})

document.getElementById('close').addEventListener('click', function () {
  document.querySelector('.modal').classList.remove('open')
})

render()

