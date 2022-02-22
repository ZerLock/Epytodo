Epytodo
=======

## Description
Epytodo is a first year project at Epitech in which we have to create our own web API. This API aims to manage a database to store users and tasks that they can create, modify and delete. This method of tasks is very common in the professional world in order to organise on a solo or team project.

Here is the recommended repository's structure used for this project (without bonuses) :

![Repository's Structure](./assets/repository_structure.png)

## Install and Run the project
### Requirements
> - NodeJS
> - MySQL or MariaDB
> - PhpMyAdmin (optional, if you want to view your database)

---

As a bonus, we have made a Docker image (in ``bonus`` directory) so that you do not have to install all the dependencies that are useful for this project. The creation of the database is not included in the Docker image. We will guide you step by step to create it on **your** machine.

- First, run the following commands in a terminal to create the Docker image on **your** machine
```bash
$ docker build -t epytodo .
```

- Then, run this command to create the database
```bash
$ cat epytodo.sql | mysql -u root -p
```

- Now, your can run the project using
```bash
$ docker run -p 8080:8080 epytodo
```

Enjoy !


## Epytodo instructions routes
In order to take full advantage of this project. It is important to know each of the routes and their use within the API.

|Route              |Method|Protected|Description|
|:------------------|:-----|:--------|:----------|
|/register          |POST  |NO       |Register a new user|
|/login             |POST  |NO       |Connect a user|
|/user              |GET   |YES      |View all user information|
|/user/todos        |GET   |YES      |View all user tasks|
|/user/:id or :email|GET   |YES      |View user information|
|/user/:id          |PUT   |YES      |Update user information|
|/user/:id          |DELETE|YES      |Delete user|
|/todo              |GET   |YES      |View all the todo|
|/todo/:id          |GET   |YES      |View the todo|
|/todo              |POST  |YES      |Create a todo|
|/todo/:id          |PUT   |YES      |Update a todo|
|/todo/:id          |DELETE|YES      |Delete a todo|
\* To access the protected routes, you need a token that can be retrieved via the ``/register`` and ``/login`` routes.<br>
\** todo = task

---

## Mainteners
- [Léo Dubosclard](https://www.github.com/ZerLock)
