FROM mongo:latest
MAINTAINER dan budris <dbudris@bu.edu>

WORKDIR /opt
RUN mkdir dump
COPY dump ./dump
RUN ls
RUN mongod --fork --syslog && mongorestore ./dump

EXPOSE 27012
