# Running Governet V2
To run the application, you'll need to download the source, build the containers with docker compose, and then restore the database.

- Clone the repository and cd to v2
- Execute the command `docker-compose up --build`.  This will build and start the frontend, backend and database containers.
- Restore the database and build the indexes:  `docker exec -it v2_mongodb_1 mongorestore /opt/dump/governet && mongo governet --eval "db.cm.createIndex({CMTE_ID: 1, CAND_ID: 1})" && mongo governet --eval "db.cn.createIndex({CAND_ID: 1})" && mongo governet --eval "db.pas2.createIndex({CAND_ID: 1, CMTE_ID: 1})"`
- Connect to the app on port 5000

The app consists of 3 containers, one which serves the React frontend, one which runs the node/express API and data parser, and the mongo database.  The database container is instantiated with a data dump on it, but it must be restored with the above command for the applicaiton to function.  See `docker-compose.yml` and each individual `Dockerfile` for more information.

Once the above steps are completed, you can view the frontend of the application on localhost port 5000.  Check out the 2016 MA Democract House candidates for some good examples (MA 2016 DEM H), such as Joseph Kennedy.

You can query the API on locahost 8080, try `http://127.0.0.1:8080/candidate?party=DEM&state=MA&year=2016&candOffice=H` for an example.

Note that all of the available data is not loaded in this deployment -- it would be expensive to host all of that data on s3 to provide the local data dumps on each build.  Once this is actually deployed it'll be a different story.  

Dan
dbudris@bu.edu
d.c.budris@gmail.com