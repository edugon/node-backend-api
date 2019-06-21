# backend-api
This document describes the deployment, functioning and testing of this backend API.
> This is a migrated repository, the currently maintained version is located [here](https://gitlab.com/edugon/node-backend-api).

### Directory listing
1. **`/backend-api/`** -> Sources folder.
2.  **`/backend-api-swagger.yml`** -> Swagger definition.
3. **`/docker-compose.yml`** -> Deployment using docker-compose.
4. **`/mongo/`** -> MongoDB configuration (the volume data will be persisted here).
5. **`/README.md`** -> This README file :)

### About
The temporary recruitment agency called **XXX** wants to optimize the way they assign their workers to the different shifts of the jobs they work with. In order to help them with this mission, this API endpoint will return the best pairing options for matching shifts and workers.

Also, it provides CRUD operations for each entity.

### Prerequisites
- **Unix based distribution** (tested with [Debian 9.5.0](https://cdimage.debian.org/debian-cd/9.5.0/)).
- **[Docker Engine](https://docs.docker.com/engine/)** and **[Docker Compose](https://docs.docker.com/compose/)** (tested with v18.06.1-ce and v1.22.0).
- **[Git](https://git-scm.com/downloads)** version-control system.

> **Note**: In case you want to deploy using **Docker Toolbox**, please consider upgrading to **Docker for Windows/Mac** or change IP pointers from `localhost` to your **Docker Toolbox VM** (`$ docker-machine ip`).

### Deployment
1. Clone this respository into your workspace: ``$ git clone https://gitlab.com/EduGon/tenejob-backend.git``.
3. Build Docker images: ``$ docker-compose build``.
4. Run Docker containers: ``$ docker-compose up``.
5. Once everything is up and running, the API will be listening at ``http://localhost:3000/``.
6. Enjoy! :)

### Testing
First of all, just to check that everything is OK, open a web browser and go to: ``http://localhost:3000/``. The following message should be displayed:
``` bash
backend-api is listening at http://localhost:3000/api/
```
If you see that, we are going fine. Now you can use your favourite REST client to test everything you want (please refer to **Resources naming** section).

> **Note:** Mongo collections are created at container runtime with sample data.

### Resources naming
This repository includes a [Swagger](https://swagger.io) file named **`/backend-api-swagger.yml`**, please refer to [Swagger Editor](https://editor.swagger.io/) for a more detailed description of resources and requests specifications :)

#### Workers API
| Method | URL              | Description                 |
|--------|------------------|-----------------------------|
| GET    | /api/workers     | Get a list with all workers |
| GET    | /api/workers/:id | Get a specific worker       |
| POST   | /api/workers     | Add a new worker            |
| PUT    | /api/workers/:id | Update a specific worker    |
| DELETE | /api/workers/:id | Delete a specific worker    |
#### Shifts API
| Method | URL              | Description                |
|--------|------------------|----------------------------|
| GET    | /api/shifts      | Get a list with all shifts |
| GET    | /api/shifts/:id  | Get a specific shift       |
| POST   | /api/shifts      | Add a new shift            |
| PUT    | /api/shifts/:id  | Update a specific shift    |
| DELETE | /api/shifts/:id  | Delete a specific shift    |
#### Matching API
| Method | URL              | Description                                            |
|--------|------------------|--------------------------------------------------------|
| GET    | /api/matching    | Get a list with results of matching workers and shifts |
