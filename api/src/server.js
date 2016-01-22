const koa = require('koa');

var route = require('koa-route');
var router = require('koa-router')();
var render = require('koa-swig');
var path = require('path');
var bodyParser = require('koa-body-parser');



const app = koa();

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




//app.use(router(app));
//app.use(bodyParser());
//
//app.post('/login', function *() {
//  this.response.body = this.request.body;
//});

//app.use(bodyParser());


router
    .post('/rest/community/:id/settings', function *(id) {
      console.log(this.request.body)
    })
    .get('/rest/community/:id/settings', function* (id) {
      if (community_settings[id]) {
        this.body = community_settings[id];
      } else {
        this.body = {};
      }
    }).
    get('/community/:id', common).
    get('/community/:id/:type', common).
    get('/rest/community/:id', rest_community);

//app.use(route.get('/rest/community/:id', rest_community));
//app.use(route.get('/community/:id', common));
//app.use(route.get('/community/:id/:type', common));
//app.use(route.get('/rest/community/:id/settings', restCommunitySettingsGet));
//app.use(route.post('/rest/community/:id/settings', restCommunitySettingsPost));

app
    .use(router.routes())
    .use(router.allowedMethods());


//
//app.use(function *() {
//  yield this.render('base');
//});


community_settings = {};




function *rest_community(next) {

  //console.log(id);
  //console.log(this.request);
  const id = this.params.id;

  this.body = {
    id: id,
    name: "bla" + id,
    unique_name: "uniq" + id,
    avatar: {
      '180': 'https://new.maxpark.com/static/u/community/avatars/180/63.jpg'
    },
    description: "community escription bla bla " + id,
    rules: "community " + id + " rules",
    categories: [
      {id: 1, name: "Первая категория "+ id},
      {id: 3, name: "Третья категория" + id}
    ]
  };
}


function *common(id) {
  //this.body = '<html><head></head><body><div id="Content"></div><script src="http://localhost:8080/bundle.js"></script></body></html>';
  yield this.render('base');
}

function *restCommunitySettingsGet(id) {

  console.log(this.request);

  if (community_settings[id]) {
    this.body = community_settings[id];
  } else {
    this.body = {};
  }

}
//
//app.post("/rest/community/:id/settings", function *(id) {
//
//  //community_settings[id]
//  console.log(this.request)
//
//});



app.listen(3000);