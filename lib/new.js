var fs = require('fs');
var filePath = global.postsPath;
exports.mknew = function(fileName){
    // first check if filepath exist
    console.log(filePath);
    if (filePath) {
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        let tmpPostPath = filePath + fileName + '.md';
        let tmpDate = getDateTime();
        let template =
`---
title: ${fileName}
date: ${tmpDate.year}/${tmpDate.month}/${tmpDate.day} ${tmpDate.hour}:${tmpDate.min}:${tmpDate.sec}
tags: 
---`;
        if (!fs.existsSync(tmpPostPath)) {
            fs.writeFile(tmpPostPath, template, (err, fd) => {
                console.log('Info: Done');
            });
        } else {
            console.log('err: there has had a past named: ' + fileName);
        }
    }
}

function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return {
        'year': year,
        'month': month,
        'day': day,
        'hour': hour,
        'min': min,
        'sec': sec
    };
}