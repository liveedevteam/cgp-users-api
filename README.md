# CGP-USERS-API

## TECH STACK
1. NodeJS V18.16.0(LTS) 
2. POSTGRESQL V.15.3
3. Container & Docker Compose

## Project Structure (Pros & Cons)
- db
- - init.sql = initial database schema and table
- docker
- - api
- - - Dockerfile = docker file of api
- - db
- - - Dockerfile = docker file of db
- src
- - apps = store services or feature of backend automation base route for service
- - libs = store common modules
- - tests = store test file
- index.js = index of express js split of server to add the next server such as realtime (socket.io)
- server.js = express configuration and middlewares
- docker-compose.yamal
### Pros
1. Modularity: The clear separation of concerns, with different directories for different parts of the application, helps maintain modularity. It will make your application easier to understand, maintain, and extend.
2. Docker Integration: With Docker files included in the structure, it's easy to containerize your application. This can simplify deployment, scaling, and testing, and ensure that the application works consistently across different environments.
3. Testability: A separate folder for tests encourages a strong testing culture. It's easy to locate and add tests, which should help maintain high code quality.
4. Database Setup: By including an init.sql file, you ensure that any developer or environment that sets up your application will have the correct database schema. This could reduce bugs and setup time.
5. Scalability: Separating the index.js (which can handle additional servers like real-time communication) and server.js (handling Express configuration and middleware) provides a good basis for scaling your application later on.
6. Split to migrate to microservice: Separating the service in apps when service in apps growth the features and code.It's easy to prepare to split to independent service.
### Cons
1. Complexity: This structure may be overkill for a small, simple application. New developers or contributors may find it confusing if they're not used to such a detailed structure.
2. Database Limitation: An init.sql file suggests you're using SQL. While SQL databases are very common, this may not suit all projects. Also, managing database schema changes over time (database migrations) might require additional tooling.
3. Potential Overhead: Docker adds complexity and can have performance implications. For smaller projects or those with less experienced developers, it might be easier to work without Docker.
4. DevOps Knowledge Required: To take advantage of the Docker and docker-compose setup, developers need to be familiar with these technologies. Without this knowledge, they might struggle with setup, debugging, and deployment.

### Trade-offs
1. Complexity vs Scalability: This setup is complex and could potentially be more than a small-scale application requires. However, for a larger or rapidly growing application, this setup could provide the scalability needed without much alteration.
2. Learning Curve vs Consistency: Docker and docker-compose, while adding consistency in deployments and testing across different environments, come with a learning curve for developers unfamiliar with containerized applications.
3. Structure Overhead vs Code Maintainability: The division of code into various directories and files increases the overhead in managing the structure, but it also enhances code maintainability by enforcing modularity and separation of concerns.

## How to run application by container for test
### Prerequisite
1. Docker
2. NodeJS V18.16.0(LTS)

### Run backend process
1. Clone sourcecode from github
```bash
https://github.com/liveedevteam/cgp-users-api.git
```
2. Install node_modules
```bash
npm i
```
3. Create .env file and copy environment variable to .env
```bash
PORT=3001
X_API_KEY=5afe6297b58713980ce8fa595fe4c9905362ea1317f6b34db69a2f8fdc9d02d1
JWT_SECRET_KEY=|ainM1w}t4+tk$2nHtOxqjWrf]oSMP`DY|Z>fz#CvctE5N6<r,,6|dkGBxzGL.mxqwet
DB_HOST=db
DB_USER=postAdmUsr2023
DB_PASS=p@ssWordPostG2ade
DB_PORT=5432
DB_NAME=postgres
```
4. Build artifact 
```bash
npm run build
```
5. Start api & db containers
```bash
docker compose up
```
### Run test
1. Clone sourcecode from github
```bash
https://github.com/liveedevteam/cgp-users-api.git
```
2. Install node_modules
```bash
npm i
```
3. Create .env file and copy environment variable to .env
```bash
PORT=3001
X_API_KEY=5afe6297b58713980ce8fa595fe4c9905362ea1317f6b34db69a2f8fdc9d02d1
JWT_SECRET_KEY=|ainM1w}t4+tk$2nHtOxqjWrf]oSMP`DY|Z>fz#CvctE5N6<r,,6|dkGBxzGL.mxqwet
DB_HOST=db
DB_USER=postAdmUsr2023
DB_PASS=p@ssWordPostG2ade
DB_PORT=5432
DB_NAME=postgres
```
4. Run test script
```bash
npm run test
```