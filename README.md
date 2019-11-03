# team39
This website is optimizing the process of scheduling work shifts.

<ul>
<li><strong>Log In Page:</strong>
for this moment use email = "user" and password = "user" to login as regular user after click log in it will jump to regular dashboard; and use email = "admin" and password = "admin" to login as admin user and page jump to the admin page; if email and password did not match these, it will pop up the alert to say Login Fail. If the input of the email or password is empty, it will pop up the alert to remain the user to enter the info. Also, it will check that the email is existing in the employee list and employer list in the MockData.js. After clicking "Register here" it will jump to the signup page. After clicking "Forget Password", it will pop up the window to say that request sent to the email address you entered.</li>
<li><strong>Sign Up Page:</strong>
for any of the input is empty, or not select position, it will pop up the window to remain user to enter the info; if the email not contain "@", pop up window will say that is invalid email address; if the password and confirm password not match, also pop up window to alert unmatch password; if the company is not on the company list in MockData.js, also pop up alert; if all info is ok, pop up successful sign up and pop up window to show the information you entered and create the new employee class and auto return to the log in page.</li>
<li><strong>Sidebar:</strong>
The sidebar has the same template for all views(html), however, the tab links will be available or disabled depends on the current logged in user. If the user is an employee, he does not have the permission to access the Scheduling page, so it is greyed out and disabled. Similarly, for an employer, the Submit Available Time tab is disable.  </li>
<li><strong>Dashboard</strong>
It display an overview of the company's weekly schedule, which will only includes the employees in the current logged in user's company. </li>
<li><strong>Profile:</strong>
Enable the user to change his password on the userside. As well, user can modify his profile picture. For phase 1, if upload picture in the same directory will change the profile pic display on the current page. </li>

<li><strong>Admin e</strong>
In admin page, you can add companies into the table which contains existing pages. Every company has its name, opening time,closing time and a button which links to the pages showing employers' and employees' info. Admin has the authority to add employers of a company and there are two tables displaying the general information of current employers and employees. Amdmin can change every user's information by clicking on  the button 'modify info'. On the modifying information page, for any of the input is empty, it will pop up the window to remain user to enter the info; if the email not contain "@", pop up window will say that is invalid email address. And at the bottom of the page, we have two buttoms: one is deleter user, another one is save user info.