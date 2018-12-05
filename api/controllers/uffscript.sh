#!/bin/bash
$(cd uploads)
$(uff optimize_file_browser $1 profiling.txt)
nombre="$(echo $1 | cut -d '.' -f1)"
full_name="${nombre}-optimized.js"
ARCHIVOJS=$(cat app-optimized.js)
$(sed -i "s%uff/%http://192.168.1.10:3000/api/filesuff/%g" "app-optimized.js")
$(sudo mv uff/* $(pwd))
$(sudo rm -r uff/)
#for i in $(find uff/ -type f); do echo $i; done