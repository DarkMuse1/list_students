export const functApp = {
  getAge: function (studentList) {
    const today = new Date()
    let age = today.getFullYear() - studentList.birthDate.getFullYear()
    var m = today.getMonth() - studentList.birthDate.getMonth()
    if (
      m < 0 ||
      (m === 0 && today.getDate() < studentList.birthDate.getDate())
    ) {
      age--
    }

    return age + ' ' + this.getAgeString(age)
  },

  getAgeString: function (age) {
    let count = age % 100

    if (count >= 10 && count <= 20) {
      return 'лет'
    } else {
      count = age % 10
      if (count === 1) {
        return 'год'
      } else if (count >= 2 && count <= 4) {
        return 'года'
      } else {
        return 'лет'
      }
    }
  },

  getBirthDate: function (studentList) {
    const yyyy = studentList.birthDate.getFullYear()
    let mm = studentList.birthDate.getMonth() + 1
    let dd = studentList.birthDate.getDate()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    return dd + '.' + mm + '.' + yyyy
  },

  getStudyStart: function (studentList) {
    const currentTime = new Date()
    let endStudyYear = studentList.studyStart + 4
    let studyYearText = ''

    if (endStudyYear < currentTime.getFullYear()) {
      studyYearText = 'закончил'
    } else if (endStudyYear >= currentTime.getFullYear()) {
      studyYearText =
        currentTime.getFullYear() - studentList.studyStart + ' курс'
    } else {
      studyYearText = endStudyYear - studentList.studyStart + ' курс'
    }
    return (
      studentList.studyStart + '-' + endStudyYear + ' (' + studyYearText + ')'
    )
  },

  sortStudents: function (arr, prop, dir) {
    const studentsCopy = [...arr]
    return studentsCopy.sort(function (studentA, studentB) {
      if (
        !dir == false
          ? studentA[prop] < studentB[prop]
          : studentA[prop] > studentB[prop]
      )
        return -1
    })
  },

  filter: function (arr, prop, value) {
    let result = [],
      copy = [...arr]

    for (const item of copy) {
      if (String(item[prop]).includes(value)) {
        result.push(item)
      }
    }

    return result
  },

  validation: function (form) {
    let result = true

    function removeError (input) {
      const parent = input.parentNode

      if (parent.classList.contains('error')) {
        parent.querySelector('.error-label').remove()
        parent.classList.remove('error')
        input.classList.add('mb-3')
      }
    }

    function createError (input, text) {
      const parent = input.parentNode
      const errorLabel = document.createElement('label')
      errorLabel.classList.add('error-label')
      errorLabel.textContent = text

      input.classList.remove('mb-3')
      parent.append(errorLabel)
      parent.classList.add('error')
    }

    form.querySelectorAll('input').forEach(input => {
      removeError(input)

      if (input.dataset.minBirth) {
        if (input.value < input.dataset.minBirth) {
          removeError(input)
          createError(input, `Минимальная дата рождения 01.01.1900`)
        }
      }

      if (input.dataset.minStart) {
        if (input.value < input.dataset.minStart) {
          removeError(input)
          createError(
            input,
            `Минимальный год обучения ${input.dataset.minStart}`
          )
        }
      }
      if (input.dataset.minLength) {
        if (input.value.length < input.dataset.minLength) {
          removeError(input)
          createError(
            input,
            `Минимальное кол-во символов ${input.dataset.minLength}`
          )
        }
      }
      if (input.value.trim() == '') {
        removeError(input)
        createError(input, 'Поле обязательно к заполнению')
        result = false
      }
    })

    return result
  }
}
