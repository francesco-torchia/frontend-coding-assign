# Functional requirements:

1. Admins should be able to enable or disable the availability of a course
2. Admins should be able to assign one or more courses to a teacher
3. Students can browse and list all the available courses and see the course
   title and course teacher’s name.
4. Students can enrol in a course. Students should not be able to enrol in a
   course more than once at each time.
5. Teachers can fail or pass a student.
6. Access control for Admins, Teachers and Students: Ensure only the authorised
   access can perform an action. For example, only teachers can pass/fail a
   student.

   Here is a suggested method: In the API, on every request, get the primary
   key of a user as part of the request/input parameters and before performing
   an action, check if the user with the primary key is authorised to perform
   a request.

Instructions to import the college database structure and dummy data:

1. Download the database_dump.zip file and unzip it in a folder.
2. Open MySQL workbench and navigate to “Data import” under the “Server” menu.
