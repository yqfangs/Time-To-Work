'use strict'

const allEmployees = []
const allEmployers = []
const allCompanies = []
const dayId = ['MondayTime', 'TuesdayTime','WednesdayTime', 'ThursdayTime', 'FridayTime', 'SaturdayTime', 'SundayTime'];

// -------------- setting up mock info ----------------

// company1 employees: Alice, Bob, Caitlyn, Darius

const alice = new Employee('Alice', '123', 'alice@mail.com', 'waitress', '121345678', 'company1');
allEmployees.push(alice);
const bob = new Employee('Bob', '123', 'bob@mail.com', 'cook', '123456798', 'company2');
allEmployees.push(bob);
const caitlyn = new Employee('Caitlyn', '123', 'caitlyn@mail.com', 'cook', '1236879089', 'company1');
allEmployees.push(caitlyn);
const darius = new Employee('Darius', '123', 'darius@mail.com', 'supervisor', '7896751673', 'company1');
allEmployees.push(darius);

const employer1 = new Employer('employer1', '123', 'employer1@mail.com', '123567989', 'company1');
allEmployers.push(employer1);

const user = new Employee('user', 'user', 'user', 'user', '6477777777', 'company2');
allEmployees.push(user);


allCompanies.push(new Company('company1', new TimeInterval(8, 24)))
allCompanies.push(new Company('company2', new TimeInterval(9, 22)))






alice.getCompany().employees.push(alice);
bob.getCompany().employees.push(bob);
caitlyn.getCompany().employees.push(caitlyn);
darius.getCompany().employees.push(darius);

employer1.getCompany().employers.push(employer1);



for (let i = 0; i < 7; i++) {
  // allEmployees[0].availability.push(new TimeInterval(8, 15))
  // allEmployees[1].availability.push(new TimeInterval(9, 16))
  // allEmployees[2].availability.push(new TimeInterval(8, 15))
  // allEmployees[3].availability.push(new TimeInterval(9, 16))
  alice.availability.push(new TimeInterval(8, 15))
  bob.availability.push(new TimeInterval(9, 16))
  caitlyn.availability.push(new TimeInterval(8, 15))
  darius.availability.push(new TimeInterval(9, 16))
  alice.shifts.push(null)
  bob.shifts.push(null)
  caitlyn.shifts.push(null)
  darius.shifts.push(null)
}

alice.shifts[0] = new TimeInterval(8, 15)
alice.shifts[2] = new TimeInterval(12, 20)
alice.shifts[3] = new TimeInterval(9, 17)
alice.shifts[6] = new TimeInterval(16, 24)
bob.shifts[1] = new TimeInterval(9, 16) //Alice and Bob has scheduled work shifts

const current_user = employer1; //store the currently logged in user
// other predefined employee substitutes for employer1: alice, bob, caitlyn, darius
// i.e. can log in as any of the four employees above. E.g.

//const current_user = alice;
