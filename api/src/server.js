const koa = require('koa');
const app = koa();
var route = require('koa-route');
var render = require('koa-swig');
var path = require('path');
app.context.render = render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  //cache: 'memory', // disable, set to false
  cache: false, // disable, set to false
  ext: 'html'
  //locals: locals,
  //filters: filters,
  //tags: tags,
  //extensions: extensions
});


app.use(route.get('/rest/community/:id', rest_community));
app.use(route.get('/community/:id', common));
app.use(route.get('/community/:id/:type', common));


app.use(function *() {
  yield this.render('base');
});




function *rest_community(id) {

  this.body = {
    id: id,
    name: "bla" + id,
    unique_name: "uniq" + id,
    avatar: {
      '180': 'https://new.maxpark.com/static/u/community/avatars/180/63.jpg'
    }
  };
}


function *common(id) {
  //this.body = '<html><head></head><body><div id="Content"></div><script src="http://localhost:8080/bundle.js"></script></body></html>';
  yield this.render('base');
}



app.listen(3000);