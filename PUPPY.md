# Monitoring Puppy

Puppy is a website monitoring application.
It was designed and developed by Quentin Verlhac in April 2018.
 
Puppy is able to:
- keep a list of websites
- check them regularly
- compute statistics about these websites (e.g.: availability, response time, response codes)
- send alerts to the client when a website is down or when it goes back online

Table of content:
- Architecture
- Installation
- Usage
- Choices
- Documentation
- Tests
- Improvements




## Architecture

Puppy has a front end Command Line Interface and a back end server.

### Front end

The front end run with **Node.js**. It is based on a few modules such as:
- **Commander** for the CLI
- **Axios** for the HTTP requests
- **Blessed** for the custom terminal interface

The code source can be found in *monitoring-puppy-front/* folder.
More information can be found in its README.

### Back end

The back end uses **Node.js** and the module **Express** for the server and the routes.
The database is in **MongoDB**. **Mongoose** is the ORM used in order to communicate with the database.

The code source can be found in *monitoring-puppy-back/* folder.
More information can be found in its README.




## Installation

To use Puppy, you need to set up the front end and the back end on the same computer.

Begin with the back end:
- Install Docker and Docker Compose, if it is not already done
- Install Node.js, if it is not already done
- Make sure the ports 27017 (for the database) and 8080 (for the server) are available on your computer
- Open a terminal at the back folder *monitoring-puppy-back/*
- Run `npm install` to install dependencies
- Run `docker-compose up` to lauch the back (`docker-compose.exe up` with Docker Toolbox on Windows)

Then you can use the front end:
- Open a terminal at the front end folder *monitoring-puppy-front/*
- Run `npm install` to install dependencies
- Run `node puppy` to display the welcome message from puppy

Now you can run puppy commands using the syntax `node puppy <command>`
For instance, run `node puppy --help` to see the list of available commands

NB: The application is currently only designed for development environment.




## Usage

The global syntax is `node puppy [options] [command]`.
You can get more information using `node puppy --help`.

Here is a small tutorial to get started:
- Run `node puppy --help` to see all available commands
- Run `node puppy test` to add tests websites to the monitoring list
- Run `node puppy add datadog https://www.datadoghq.com 3` to add Datadog website to monitoring list
- Run `node puppy list` to see all monitored websites
- Run `node puppy monitor` to start monitoring the websites of the list

![Screenshot](./screeshot.png)

Here is a list of all the commands of Puppy:

- `add <website> <url> <check_interval>` : Add a website to monitoring
      `<website> [string]` the name of the website
      `<url> [string]` the url of the website
      `<check_interval> [number]` the time interval between each website check (in second)

- `list` : List all monitored websites

- `update [options] <website>` : Update the given fields of the website
      `-n --name [string]` the new name of the website
      `-u --url [string]` the new url of the website
      `-i --interval [number]` the new time interval between website checks (in seconds)

- `remove <website>` : Remove the website given by its name <website>

- `check` : Start the checking of all the websites on the remote server
    **Warning:** the checking will not stop until `stop` command is run, even if this shell is closed

- `stop` : Stop the checking of all websites

- `monitor` : Start the monitoring of websites. End the monitoring by pressing Escape, q or CTRL+C in this shell.

- `history`: Get the history of past alerts

- `test` : Add the alert and the response codes test routes to the website list.




## Choices

### Technical choices

I made the following technical choices:

A front end / back end structure, which allow the monitoring part to run remotely from the client terminal.
It is possible to keep monitoring websites even when the CLI part is shut down.
It can also allow to get statistics and alerts from different devices.

A MongoDB database, for its scalability. It can store data over different servers. It has at least two advantages:
- It allows to scale up storage and performance with the number of logs, users and websites
- It allows to check monitor websites from different locations

Node.js, since I am proficient with it, there is an active community and there are a lot of modules which allowed me to develop the features I wanted, either on front end and back end. Moreover, Node.js works on all major computer OS (Windows, macOS, Linux).

Socket.io, to have a real-time bidirectional event-based communication. It allows the back end to push statistics and alerts to the front end. Therefore the front end is only responsible for the user interface.

### Design choices

I chose to focus on the following use case:
**A single user is monitoring websites from a console interface.**

Therefore, there are several aspects that are explicitely not handled for the moment:
- Multi-users: there is no account to separate data between several users
- Security: there is no credentials required to communicate with the back end
- Graphic interface: statistics and alerts are displayed only as text logs

### Arbitrary choices

I made a few arbitrary choices, notably in the definition of the statistics.

For instance, I chose:
- to only send HTTP GET requests to monitor websites
- to set a timeout of 10 seconds when sending a ping request to a website
- to compute the *Response Time* has the difference between two timestamps: one taken just before sending the request, the other just after receiving it.
- to ignore unanswered request for the computation of *Max Response Time* and *Average Response Time*. Indeed, they virtually have a infinite response time.

These choices can be easily changed if needed.




## Documentation

The documentation is contained in the README of each repository and as comments in the codebase.
There is also the documentation of the back end API generated with ApiDoc. See the README of the back end to generate it.




## Tests

To test the alerts, it would be difficult to write unitary tests because the system works as a whole. The function that generate alerts reads the logs in the database, create Alert objects in the database and sends alerts to the front.

Therefore I chose to write a global test:
The back end exposes a route which simulates a website that periodically breaks and goes back up. 
While monitoring this route, the alert manager will regularly send *down* and *up* alerts to the front end.
It is possible to compare the logs in the front end with the logs displayed by the back end in its console.
It shows that alerts are functional.

There is also a response codes test route. It generates random status codes in the response. The back end will record the number of each codes and send it in the statistics.

To monitor these routes, use the following commands (if not already done):
- `puppy test` to add the tests route 
- `puppy monitor` to start monitoring the websites




## Improvements

This monitoring application is still in version 0.1.0. It works well in the scope defined above, but there is a lot more to do. Here are some improvements that could be done:

Finalise a first version:
- Fix remaining bugs (e.g.: the monitoring console which automatically scrolls down when new statistics are displayed)
- Add alert generation when puppy is monitoring in backgroung (currently, the back just store ping request logs but doesn't store an alert if the website went down while monitoring in background)

Set up a production environment:
- Refactor code to create configuration files
- Get rid of the Docker containers on production servers

Handle several users properly:
- Set up accounts with credentials for security
- Allow several users to monitor the same group of websites, and get the same statistics and alerts computed only once (currently, satistics and alerts for the same website are computed once for each socket connection)

Refactor the user interface:
- Handle different time zones to avoid misunderstanding 
- Set up graphic interface to make the application usable by non-technical people
- Display statistics as graphs, to make more readable the evolution of the data in time
- Add selection options, to scale up to the monitoring of hundreds of websites, everywhere in the world