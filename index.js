global.postsPath = './posts/';
global.templatePath = './templates/layout/';

global.publicPath = './public';



var newFile = require('./lib/new');
var generateFile = require('./lib/generate');
var server = require('./lib/server');

var open = require('open');

// first get the command from terminal argument
const commandArr = process.argv.slice(2);
const command = commandArr[0];



// then switch the command
switch(command){
    case 'new':
        newFile.mknew(commandArr[1]);
    break;
    case 'generate':
        generateFile.generate();
    break;
    case 'serve':
        generateFile.generate(()=>{
            server.start();
            open('http://localhost:8000');
        });
    break;
    case 'deploy':
    break;
}

/*
var mdP = new markdownParser();

var result = mdP.render('# markdown-it rulezz!');

console.log(result);*/
// command new 
// index.js

// step1. get some feed as markdown

// step2. generate directory structure

// 