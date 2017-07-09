var fs = require('fs');
var Handlebars = require('handlebars');


var markdownParser = require('markdown-it');
var mdparser = new markdownParser();

var filePath = global.postsPath;

exports.generate = function(callback){
    if (!fs.existsSync(global.publicPath)) {
        fs.mkdirSync(global.publicPath);
    }

    // first generate index html
    fs.readFile(global.templatePath+'/index.hbs', 'utf-8', function(err, content) {
      let templateSource = Handlebars.compile(content);
      let html = templateSource();
      fs.writeFile(global.publicPath+'/index.html',html,(err)=>{
        console.log('generate index.html');
      });
    });

    
    // get all posts
    readFiles(filePath, function(filename, filecontent){
        // parse all posts from markdown to html string
        let tmpContent = mdparser.render(filecontent);
        fs.readFile(global.templatePath+'/post.hbs', 'utf-8', function(err, content) {
            
            let templateSource = Handlebars.compile(content);
            
            // pass to a template engine
            let html = templateSource({
                'content': tmpContent
            })
            
            filename = filename.split('.');
            console.log(filename);


            // write to some place
            fs.writeFile(global.publicPath+'/'+filename[0]+'.html',html,(err)=>{
                console.log(`generate ${filename[0]}.html`);
            });


            // var template = Handlebars.compile(source);
        });
    }, function(err){
    });

    if(callback){
      callback();
    }

}


function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}