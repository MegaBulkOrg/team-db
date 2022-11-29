(function(){
    document.addEventListener('DOMContentLoaded', _ => {
        const list = document.querySelector('.employee-list'),
                     today = new Date(),        
                     modal = document.querySelector('.modal'),
                     addForm = document.querySelector('.add-form'),
                     addFormSurnameFormField = addForm.querySelector('input[name="surname"]'),
                     addFormNameFormField = addForm.querySelector('input[name="name"]'),
                     addFormPatronymicFormField = addForm.querySelector('input[name="patronymic"]'),
                     addFormdeptFormField = addForm.querySelector('input[name="dept"]'),
                     addFormBirthDateFormField = addForm.querySelector('input[name="birth-date"]'),
                     addFormstartworkingFormField = addForm.querySelector('input[name="star-working"]'),
                     filtersForm = document.querySelector('.filters-form'),
                     filtersFormNameFormField = filtersForm.querySelector('input[name="name"]'),
                     filtersFormdeptFormField = filtersForm.querySelector('input[name="dept"]'),
                     filtersFormstartworkingFormField = filtersForm.querySelector('input[name="star-working"]'),
                     filtersFormEndingworkingFormField = filtersForm.querySelector('input[name="ending-working"]');
        let employeesArray = [ 
            {
                surname: 'Иванова',
                name: 'Алла',
                patronymic: 'Евгеньевна',
                dept: 'Back-end разработка',
                birthDate: new Date (1976, 5, 26),
                startworking: '2019',
            },
            {
                surname: 'Павлов',
                name: 'Владимир',
                patronymic: 'Петрович',
                dept: 'Дизайн',
                birthDate: new Date (1985, 5, 21),
                startworking: '2020',
            },
            {
                surname: 'Смирнов',
                name: 'Дмитрий',
                patronymic: 'Александрович',
                dept: 'Back-end разработка',
                birthDate: new Date(1985, 4, 15),
                startworking: '2017',
            },
            {
                surname: 'Иванов',
                name: 'Иван',
                patronymic: 'Иванович',
                dept: 'Копирайт',
                birthDate: new Date (1985, 3, 21),
                startworking: '2020',
            },
            {
                surname: 'Чжоу',
                name: 'Ван',
                patronymic: '',
                dept: 'Front-end разработка',
                birthDate: new Date(1985, 1, 8),
                startworking: '2018',
            },
            {
                surname: 'Васильев',
                name: 'Сергей',
                patronymic: 'Константинович',
                dept: 'Front-end разработка',
                birthDate: new Date(1995, 7, 20),
                startworking: '2015',
            },
        ],
            tempemployeesArray = [];
        tempemployeesArray = Array.from(employeesArray);    
        function addemployee(employeeInfo) {
            employeesArray.push(employeeInfo)
        }
        function addCell(cellContent, row){
            let cell = document.createElement('td');
                cell.textContent = cellContent;
                row.append(cell);
        }
        function showResult(employeesList) {
            list.innerHTML = '';
            for (let employee of employeesList) {
                let tableRow = document.createElement('tr'),  
                empName = `${employee.surname} ${employee.name} ${employee.patronymic}`;
                addCell(empName, tableRow);
                let empdept = employee.dept;
                addCell(empdept, tableRow);
                let empAge = '';
                if (employee.birthDate.getDate() < 10) {
                    empAge = `0${employee.birthDate.getDate()}.`;
                } else {
                    empAge = `${employee.birthDate.getDate()}.`;
                }
                if (employee.birthDate.getMonth()+1 < 10) {
                    empAge += `0${employee.birthDate.getMonth()+1}.`;
                } else {
                    empAge += `${employee.birthDate.getMonth()+1}.`;
                }
                empAge += employee.birthDate.getFullYear();
                if (employee.birthDate.getMonth() > today.getMonth()) {
                    empAge += ` (${today.getFullYear() - employee.birthDate.getFullYear() - 1} лет)`
                } else if (employee.birthDate.getMonth() < today.getMonth()) {
                    empAge += ` (${today.getFullYear() - employee.birthDate.getFullYear()} лет)`
                } else if (employee.birthDate.getMonth() === today.getMonth()) {
                    if (employee.birthDate.getDate() > today.getDate()) {
                        empAge += ` (${today.getFullYear() - employee.birthDate.getFullYear() - 1} лет)`
                    } else {
                        empAge += ` (${today.getFullYear() - employee.birthDate.getFullYear()} лет)`
                    }
                }
                addCell(empAge, tableRow);
                let workingTime = '';
                workingTime = `${parseInt(employee.startworking)} - ${parseInt(employee.startworking) + 4}`;
                if (parseInt(employee.startworking) + 4 < today.getFullYear()) {
                    workingTime += ` (закончил)`
                } else if (parseInt(employee.startworking) + 4 === today.getFullYear()) {
                    if (today.getMonth() > 8) {
                        workingTime += ` (закончил)`
                    } else {
                        workingTime += ` (${today.getFullYear() - parseInt(employee.startworking)}-й год)`
                    }                
                } else if (parseInt(employee.startworking) === today.getFullYear()) {
                    workingTime += ` (1-й год)`;    
                } else {
                    workingTime += ` (${today.getFullYear() - parseInt(employee.startworking)}-й год)`
                }
                addCell(workingTime, tableRow);
                list.append(tableRow);
            }
        }
        function addFioFieldToemployeesList(list) {
            for (employee of list) {
                employee.fio = `${employee.surname}${employee.name}${employee.patronymic}`.toLowerCase()
            }
        }
        function sortemployee(list, sortBy, dir) {
            let dirCond = null
            let result = list.sort((a,b) => {
                if (dir === 'asc') {
                    dirCond = a[sortBy] < b[sortBy] 
                } else if (dir === 'decs') {
                    dirCond = a[sortBy] > b[sortBy]
                }
                if (dirCond) return -1
            })
            return result
        }
        document.querySelectorAll('.sort').forEach(sort => {
            sort.addEventListener('click', function(event) {
                event.preventDefault();
                document.querySelectorAll('.badge').forEach(bage => {
                    bage.innerHTML = '';
                })                
                if (!this.dataset.sortDir) {
                    document.querySelector('[data-sort-dir]') != null ? document.querySelector('[data-sort-dir]').removeAttribute('data-sort-dir') : null
                    this.dataset.sortDir = 'asc'
                } else {
                    this.dataset.sortDir === 'asc' ? this.dataset.sortDir = 'decs' : this.dataset.sortDir = 'asc'
                }
                this.dataset.sortDir === 'asc' ? this.querySelector('.badge').innerHTML = '&#9650;' : this.querySelector('.badge').innerHTML = '&#9660;'
                this.dataset.sortName === 'fio' ? addFioFieldToemployeesList(tempemployeesArray) : null
                sortemployee(tempemployeesArray, this.dataset.sortName, this.dataset.sortDir);
                showResult(tempemployeesArray);
            })
        })
        function filteremployee(list, filterValues) {
            let result = list.filter(employee => {                
                return !filterValues.name ? true : employee.fio.includes(filterValues.name)
            });
            result = result.filter(employee => {                
                return !filterValues.dept ? true : employee.dept.toLowerCase().includes(filterValues.dept)
            });
            result = result.filter(employee => {                
                return !filterValues.startworking ? true : employee.startworking === filterValues.startworking
            });
            result = result.filter(employee => {                
                return !filterValues.endingworking ? true : parseInt(employee.startworking) + 4 === parseInt(filterValues.endingworking)
            });
            return result;
        }
        filtersForm.addEventListener('submit', form => {
            form.preventDefault();            
            tempemployeesArray = Array.from(employeesArray);           
            if (document.querySelector('[data-sort-dir]') != null) {
                tempemployeesArray = sortemployee(tempemployeesArray, document.querySelector(`.sort[data-sort-dir]`).dataset.sortName, document.querySelector(`.sort[data-sort-dir]`).dataset.sortDir)
            }
            addFioFieldToemployeesList(tempemployeesArray)
            tempemployeesArray = filteremployee(tempemployeesArray, {
                name:filtersFormNameFormField.value.trim().toLowerCase(),
                dept:filtersFormdeptFormField.value.trim().toLowerCase(),
                startworking:filtersFormstartworkingFormField.value.trim(),
                endingworking:filtersFormEndingworkingFormField.value.trim()
            });
            showResult(tempemployeesArray);
        })
        function validate(value, options) {
            if (options.required != null && options.required) {      
                if (!value) {
                    return {valid: false, errorText: 'Это поле обязательно для заполнения'}
                } 
            }
            if (options.dateOfBirthControl != null && options.dateOfBirthControl) {  
                if (value > today) {
                    return {valid: false, errorText: 'Нельзя добавить человека, который еще не родился'} 
                } 
            }
            if (options.educationStart != null) {
                if (value < options.educationStart || value > today.getFullYear()) {
                    return {valid: false, errorText: `Год начала контракта должен находится в диапазоне от ${options.educationStart} до текущего года`}    
                }     
            }
            return {valid: true}   
        } 
        addForm.querySelectorAll('input').forEach((input, index) => {
            input.addEventListener('input', function() {
                this.closest('.form-group').querySelector('.error-msg').textContent = '';
				this.closest('.form-group').classList.add('add-form-field-group')
            })
        })
        addForm.addEventListener('submit', form => {
            form.preventDefault();            
            let surnameValidationStatus = validate(addFormSurnameFormField.value.trim(), {
                required: true
            });
            let nameValidationStatus = validate(addFormNameFormField.value.trim(), {
                required: true
            });
            let patronymicValidationStatus = validate(addFormPatronymicFormField.value.trim(), {
                required: true
            });         
            let deptValidationStatus = validate(addFormdeptFormField.value.trim(), {
                required: true
            }); 
            let birthDateValidationStatus = validate(addFormBirthDateFormField.valueAsDate, {
                required: true,
                dateOfBirthControl: true
            });
            let startworkingValidationStatus = validate(addFormstartworkingFormField.value.trim(), {
                required: true,
                educationStart: 2000
            });
            if (surnameValidationStatus.valid && nameValidationStatus.valid && patronymicValidationStatus.valid && deptValidationStatus.valid && birthDateValidationStatus.valid && startworkingValidationStatus.valid) {
                addemployee({
                    surname:addFormSurnameFormField.value.trim(),
                    name:addFormNameFormField.value.trim(),
                    patronymic:addFormPatronymicFormField.value.trim(),
                    fio: `${addFormSurnameFormField.value.trim()}${addFormNameFormField.value.trim()}${addFormPatronymicFormField.value.trim()}`.toLowerCase(),
                    dept:addFormdeptFormField.value.trim(),
                    birthDate:addFormBirthDateFormField.valueAsDate,
                    startworking:addFormstartworkingFormField.value,
                });
                filtersForm.querySelectorAll('input').forEach(input => input.value = '');
                document.querySelectorAll('.sort').forEach(sort => {
                    if (sort.dataset.sortDir) {
                        sort.removeAttribute('data-sort-dir');
                        sort.querySelector('.badge').innerHTML = '';
                    }     
                })
                addForm.querySelectorAll('input').forEach(input => input.value = '');
                modal.querySelector('.btn-close').click();                
                tempemployeesArray = Array.from(employeesArray);
                showResult(tempemployeesArray);
            } else {
                addFormSurnameFormField.closest('.form-group').querySelector('.error-msg').textContent = surnameValidationStatus.errorText;
                addFormNameFormField.closest('.form-group').querySelector('.error-msg').textContent = nameValidationStatus.errorText;
                addFormPatronymicFormField.closest('.form-group').querySelector('.error-msg').textContent = patronymicValidationStatus.errorText;
                addFormdeptFormField.closest('.form-group').querySelector('.error-msg').textContent = deptValidationStatus.errorText;
                addFormBirthDateFormField.closest('.form-group').querySelector('.error-msg').textContent = birthDateValidationStatus.errorText;
                addFormstartworkingFormField.closest('.form-group').querySelector('.error-msg').textContent = startworkingValidationStatus.errorText;
            }
            [addFormSurnameFormField, addFormNameFormField, addFormPatronymicFormField, addFormdeptFormField, addFormBirthDateFormField, addFormstartworkingFormField].forEach(field => {
	            if (field.closest('.form-group').querySelector('.error-msg').textContent != '') field.closest('.form-group').classList.remove('add-form-field-group')
            })
        })
        showResult(tempemployeesArray);
    })
})();