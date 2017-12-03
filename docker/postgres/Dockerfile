FROM library/postgres
MAINTAINER dan budris <dbudris@bu.edu>

CMD mkdir /opt/data/fec

ADD data /opt/data/fec

ADD init.sql /docker-entrypoint-initdb.d/
