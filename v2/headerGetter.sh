#!/bin/bash

## Get all the header files, and replace the commas with tabs
headerfiles=("cm_header_file.csv" "cn_header_file.csv" "ccl_header_file.csv" "oppexp_header_file.csv" "oth_header_file.csv" "pas2_header_file.csv" "indiv_header_file.csv")
years=("2010" "2012" "2016" "2014") # "2014" "2016" "2018")
filetypes=("cm" "cn" "ccl" "oppexp") #"oth" "oppexp" "indiv","pas2")

## Download each header file and replace the comma delimiters with tabs
for i in "${headerfiles[@]}"
do
    filename=`echo $i | cut -d_ -f1`
    echo $filename
    wget -O $filename.header https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/data_dictionaries/$i
    sed -i.bak $'s/,/\t/g' $filename.header
done

# remove the backups
rm ./*.bak

## Get all the data files for the given years

for y in "${years[@]}"
do
    # make a subdirectory for each year
    mkdir $y
    for f in "${filetypes[@]}"
    do
        # download the files, save them in the year folder, replace quotes with single quotes, replace pipe delimiters with tabs, add header and import to mongo
        wget -O $f${y:2}.zip https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/$y/$f${y:2}.zip
        unzip $f${y:2} -d $y
        header=`cat $f.header`
        sed -i.bak s/\"/\'/g ./$y/$f.txt
        sed -i.bak $'s/\|/\t/g' ./$y/$f.txt
        cat $f.header | cat - ./$y/$f.txt > temp && mv temp ./$y/$f.txt
        mongoimport -d governet -c $f --type tsv --file ./$y/$f.txt --headerline
        rm ./$y/*.bak
    done
done

# clean up
rm ./*.zip

