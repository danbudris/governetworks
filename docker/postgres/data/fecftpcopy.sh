#!/usr/bin/env bash
# script to download the FEC data from their FTP servers

YEAR="2018"

# committee master file
wget ftp://ftp.fec.gov/FEC/$YEAR/cm18.zip

# candidate master file
wget ftp://ftp.fec.gov/FEC/$YEAR/cn18.zip

# candidate committee linkage file
wget ftp://ftp.fec.gov/FEC/$YEAR/ccl18.zip

# contributions from committees to candidates
wget ftp://ftp.fec.gov/FEC/$YEAR/pas218.zip

# contributions by individuals
wget ftp://ftp.fec.gov/FEC/$YEAR/indiv18.zip

# Operating Expenditures
wget ftp://ftp.fec.gov/FEC/$YEAR/oppexp18.zip

# unzip the downloaded files
unzip "*.zip"

# remove the zip files
rm ./*.zip
