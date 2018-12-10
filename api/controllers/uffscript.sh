#!/bin/bash
#$(cd uploads)
$(uff optimize_file_browser $1 uploads/profiling.txt)
nombre="$(echo $1 | cut -d '.' -f1)"
full_name="${nombre}-optimized.js"
echo $full_name
ARCHIVOJS=$(cat uploads/app-optimized.js)
$(sed -i "s%uff/%http://18.220.174.82:3000/api/filesuff/%g" "uploads/app-optimized.js")
$(sudo mv uff/* uploads/)
$(sudo rm -r uff/)
#for i in $(find uff/ -type f); do echo $i; done
