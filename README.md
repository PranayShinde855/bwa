Frontend Architecture (Angular 19)

User an create blogs and edits of their own where as the admin can create blog and perform CRUD on it.
There are only two modules blogs and user. Except that the user can change password as per thire need.

The Angular frontend is modular, leveraging lazy loading for performance optimization across the two main modules: Blogs and Users.
•	Authentication & Authorization: JWT is stored securely, and Guards protect routes based on user roles. 
•	Interceptors: Handle JWT injection in HTTP headers and response errors globally.
•	Services: Encapsulate API logic for blogs and users, promoting reusability. 
•	Pipes & Directives: Used for data formatting and DOM manipulation. 
•	Lazy Loading: Modules are loaded on demand to improve initial load time.
Role-Based Access Control
•	Admin:
o	Full CRUD access to all blogs.
o	Can manage users (view, edit, delete).
•	User:
o	Can create and edit only their own blogs.
o	Can change their password.
o	Can view all blogs. 
Access to components and API endpoints is restricted using role checks on both frontend (Angular Guards) and backend (Authorization attributes). 
