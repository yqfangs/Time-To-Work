 # team39
This website is optimizing the process of scheduling work shifts.
The goal of our web app is to optimize the management of a small business, with focus on arranging work shifts of employees. The app acts as an interface between workers and their manager, as well as between coworker. This is demonstrated by functionalities such as scheduling shifts (as a manager) and trading shifts (with your fellow workers as an employee).
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
<li> Select the day of week you wish to change available work time with the grey button. </li>
<li> Input a valid interval of available work time (within the open hours of your workplace) and click change. </li>
<li> After changing the availability of the week, click "submit all changes" button to submit you new availability to the server via a PATCH request. </li>
<li> A dialog box will pop up to indicate that the submission is either successful or failed. </li>
</ul>
</li>
<li><strong>Scheduling Page: </strong>
<ul>
<li> Log in as an employer to gain access to this page, which displays the scheduled shifts and availability of all employees in the company of the employer logged in. </li>
<li> Select the day of week you wish to schedule shifts on the upper left. </li>
<li> Click on names of employees in the Daily Schedule table in order to modify their shift time or remove the shift</li>
<li> Click on names of employees in the Availability table in order to view their status and add them to the shift schedule. </li>
<li> PATCH requests to server are made upon adding, removing, or modifying a shift of an employee. </li>
<li> A dialog will pop up to show if the change is successfully submitted to the server. </li>
</ul>
</li>
<li><strong>Trade Shifts Page: </strong>
<ul>
<li> Log in as an employee to gain access to this page. </li>
<li> Select your own time slots on the left and the available coworkers for trading shifts will be displayed on the right.</li>
<li> Match up with the coworker you could trade with, press request to review, then press confirm to submit a trade request to the server via a POST request. </li>
</ul>
</ul>
