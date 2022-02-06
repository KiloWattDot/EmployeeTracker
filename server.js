// Program Start
console.log("Welcome to the Employee Tracker!");
console.log("Please follow the prompts");

// import packages
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

console.log(``);

const dbConnect = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "dorothy",
    database: "business_db",
  },
  console.log(`Connected to the business_db database.`)
);

function init() {
  pickAction();
}

function pickAction() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Would like to :",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          // "Update Employee"
        ],
      },
    ])
    // Matching the choice to the correct function to add, view, update, etc.
    .then((results) => {
      switch (results.action) {
        case "View Departments":
          viewDepts();
          break;
        case "View Roles":
            viewRoles()
          break;
        case "View Employees":
            viewEmployees()
          break;
        case "Add Department":
          addDept();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          fetchRoles();
          break;
        default:
          console.log("Please select one of the options.");
      }

      // updateEmployee()// }
    });
}


// ========================================================= View Functions ==============================================================

function viewDepts() {
    const query = `SELECT * FROM departments`;
    dbConnect.query(query, (err, depts) => {
        if (err) { 
            console.log(err)
        
        }
        console.table("All Departments:", depts)
       
    })
    return setTimeout(() => {
        console.log("Back to Main menu...")
        pickAction()
    }, 5000)
    
   
}


function viewRoles() {
    const query = `SELECT * FROM roles`;
    dbConnect.query(query, (err, roles) => {
        if (err) { 
            console.log(err)
        
        }
        console.table("All Roles:", roles)

    })
    return setTimeout(() => {
        console.log("Back to Main menu...")
        pickAction()
    }, 3000)
    
}


function viewEmployees() {
    const query = `SELECT * FROM employees`;
    dbConnect.query(query, (err, employees) => {
        if (err) { 
            console.log(err)
        
        }
        console.table("All Employees:", employees)

    })
    return setTimeout(() => {
        console.log("Back to Main menu...")
        pickAction()
    }, 3000)
    
   
}






// ========================================================= ADD Functions ==============================================================
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the Department?",
      },
    ])
    .then((answers) => {
      console.log("Answers:", answers);
      const query = `INSERT INTO departments (name) VALUES (?)`;
      dbConnect.query(query, [answers.name], (err, res) => {
        if (err) {
          console.error(err);
        }
        console.table("Result", res);
        console.table("Here", answers);
      });
    }).then(() => {
        setTimeout(() => {
        console.log("Back to Main menu...")
        pickAction()

        }, 3000)
    })


    
}

function addRole() {
  // Changed the "id" to be named "value" for inquirer
  const query = `SELECT id AS value, name FROM departments`;
  dbConnect.query(query, (err, depts) => {
    if (err) {
      console.error(err);
    }
    console.table("Result", depts);
    // console.log(dept.department_id)

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the title?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Select which department this role belongs to.",
          choices: depts,
        },
      ])
      .then((answers) => {
        console.log("Answers:", answers);
        const query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        dbConnect.query(
          query,
          [answers.title, answers.salary, answers.department_id],
          (err, res) => {
            if (err) {
              console.error(err);
            }
            console.table("Result", res);
            console.table("Here", answers);
          }
        );
      }).then(() => {
        setTimeout(() => {
        console.log("Back to Main menu...")
        pickAction()

            }, 3000)
         
        })
    })



}

function fetchRoles() {
  const query = `SELECT title FROM roles`;
  const newRoles = [];
  dbConnect.query(query, (err, roles) => {
      
    roles.forEach((role, i) => {
        const {title} = role;
        newRoles.push(title +' '+ (i + 1));
    });
    if (err) {
      console.error(err);
    }
    // console.table("Result", roles); 
   
    // console.log("Roles Listed:", newRoles);
    // console.log("title:", newRoles)
  });

  return setTimeout(() => {
    addEmployee(newRoles)
    // console.log(newRoles)
}, 2000)
}   


function addEmployee(employeeRoles) {
    
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the role of the Employee?",
        choices: employeeRoles,
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the id of the manager for this employee?",
      },
    ])
    .then((answers) => {
      const roleID = answers.role_id.charAt(answers.role_id.length - 1)
      const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      dbConnect.query(
        query,
        [
          answers.first_name,
          answers.last_name,
          +roleID,
          answers.manager_id,
        ],
        (err, res) => {
          if (err) {
            console.error(err);
          }
          console.table("Result", res);
          console.table("Here", answers);
        }
      );
    }).then(() => {
        setTimeout(() => {
        console.log("Back to Main menu...")
        pickAction()

         }, 3000)
         

    })


   
    
}

init();

// Program End
