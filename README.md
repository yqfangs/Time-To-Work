 # team39
This website is optimizing the process of scheduling work shifts.
<br>
Notice that the pages are implemented separately but all depending on the mock data provided by MockData.js. This means that all changes made on one page will not be reflected on the other ones.
<br>
If you want to test out the webpages as a specific person (employee or employer), please head to the bottom of MockData.js and change the current_user attribute to another employee or employer object.
<br>
<ul>
<li><strong>Log In Page:</strong>
for this moment use email = "user" and password = "user" to login as regular user. After clicking log in, it will jump to the dashboard page; and use email = "admin" and password = "admin" to login as admin user and page jump to the admin page; if email and password does not match, it will pop up the alert to indicate Login Fail. If the input of the email or password is empty, it will pop up the alert to remind the user to enter the info. Also, it will check that the email is existing in the employee list and employer list in the MockData.js. After clicking "Register here" it will jump to the signup page. Clicking the "Forget Password" button, it will pop up the window to say that request sent to the email address you entered.</li>

<li><strong>Sign Up Page:</strong>
For any of the inputs that is empty, or not selecting a position, it will pop up an alert box to remaid the user to enter info; if the entered email does not contain "@", pop up window will say that is invalid email address; if the password and confirm password does not match, also pop up window to alert unmatching password; if the company is not on the company list in MockData.js, also pop up alert; if all info is ok, pop up successful sign up and pop up window to show the information you entered and create the new employee class and auto redirect to the log in page.</li>

<li><strong>Sidebar:</strong>
The sidebar has the same template for all views(html), however, the tab links will be available or disabled depends on the current logged in user. If the user is an employee, he does not have the permission to access the Scheduling page, so it is greyed out and disabled. Similarly, for an employer, the Submit Available Time tab is disable.  </li>

<li><strong>Dashboard</strong>
It display an overview of the company's weekly schedule, which will only includes the employees in the current logged in user's company. For employee, there is an working hour summary for the week shown below the schedule. For employer, there will only be an schedule show on the dashboard page.</li>

<li><strong>Profile:</strong>
Enable the user to change his password on the userside. As well, user can modify his profile picture. For phase 1, if upload picture in the same directory will change the profile pic display on the current page. </li>

<li><strong>Admin </strong>
In admin page, you can add companies into the table which contains existing pages. Every company has its name, opening time,closing time and a button which links to the pages showing employers' and employees' info. Admin has the authority to add employers of a company and there are two tables displaying the general information of current employers and employees. Amdmin can change every user's information by clicking on  the button 'modify info'. On the modifying information page, for any of the input is empty, it will pop up the window to remain user to enter the info except the password; if the email not contain "@", pop up window will say that is invalid email address. Also for the password, it is empty. If admin want to change the password, its length should be 6. And at the bottom of the page, we have two buttoms: one is deleter user which would delete the user from the database, another one is save user info into the database. </li>

<li><strong>Submit Availability Page: </strong>
<ul>
<li> Log in as an employee to gain access to this page on the side menu bar. </li>
<li> The currentUser attribute should be the same as other pages. However, we changed it to an employee so that the page can be displayed normally. (currentUser is an employer by default) </li>
<li> Select the day of week you wish to change available work time with the grey button. </li>
<li> Input a valid interval of available work time and submit. </li>
<li> Successful changes can be observed by inspecting the corresponding employee object in console. </li>
</ul>
</li>
<li><strong>Scheduling Page: </strong>
<ul>
<li> Log in as an employer to gain access to this page, which displays the scheduled shifts and availability of all employees in the company of the employer logged in. </li>
<li> Select the day of week you wish to schedule shifts on the upper left. </li>
<li> Click on names of employees in the Daily Schedule table in order to modify their shift time or remove the shift</li>
<li> Click on names of employees in the Availability table in order to view their status and add them to the shift schedule. </li>
<li> Successful changes can be observed by inspecting the corresponding employee object in console. ("myEmployees" attribute) </li>
</ul>
</li>

</ul>
