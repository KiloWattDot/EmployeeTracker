// Program Start 
console.log('Welcome to the Employee Tracker!')
console.log('Please follow the prompts')


// import packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2')

console.log(``)




const dbConnect = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'dorothy',
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
  );


function init() {
    pickAction()
    
}


function pickAction() {
    inquirer.prompt([
     {    
        type: "list",
        name: "action",
        message: "Would like to :",
        choices: 
        [
            "View Department", 
            "View Role",
            "View Employee",
            "Add Department", 
            "Add Role",
            "Add Employee",
            // "Update Employee"
        ]

      }

    ])
    // Matching the choice to the correct function to add, view, update, etc.
    .then((results) => { 
        switch(results.action) {
            case "View Department": addRole();
                break;
            case "View Role": console.log('Viewing Role');
                break; 
            case "View Employee": console.log('Viewing Employee');
                break;
            case "Add Department": addDept();
                break;
            case "Add Role": addRole();
                break;
            case "Add Employee": addEmployee();
               break
            default:
                console.log('Please select one of the options.');
        }


        
        // updateEmployee()// }

    })
}



function addDept() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the Department?",
        }
    ])   
    .then ((answers) => { console.log('Answers:', answers)      
        const query = `INSERT INTO departments (name) VALUES (?)` 
        dbConnect.query(query, [answers.name], (err, res) => {
            if(err) {
                console.error(err)
            }
            console.table("Result", res)
            console.table("Here", answers);
        })
      
        }
    )
        
        
}


function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the title?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for the role?",
        }
        
    

    ])
        .then ((answers) => { console.log('Answers:', answers)      
            const query = `INSERT INTO roles (id, title, salary) VALUES (?, ?)` 
            dbConnect.query(query, [answers.title, answers.salary], (err, res) => {
                if(err) {
                    console.error(err)
                }
                console.table("Result", res)
                console.table("Here", answers);
                addDept();
    

         
            
            })
        
            }
        )
        

  
}

function addEmployee() {
    let newEmployee = '';
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the employee?",
        },
        {
            type: "input",
            name: "manager",
            message: "What is the department for the role?",
        },
        {
            type: "list",
            name: "role",
            message: "What is the role of the Employee?",
            // choices: [from db]
        },

    ])
    .then(({firstName, lastName, manager, role}) => {
        if(role) {
            getdept(role)
            
        }

        newEmployee = new Employee(firstName, lastName, manager, role, deptName, salary)
        listOfEmployees.push(newEmployee)

    })   



  
}


init();


// Program End