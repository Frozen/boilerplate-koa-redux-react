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
    get('/community/:id/:type/:subtype', common).
    get('/rest/community/:id', rest_community).
    get('/rest/community/:id/content', rest_community_content).
    get('/rest/community/:id/user', rest_community_users);

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
    url: '/community/' + id,
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


var contentId = 0;

function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
}

function * rest_community_content() {

  const communityId = this.params.id;
  console.log(this.query);

  sleep(500);



  contentId++;

  this.body = {results:
  [{
    id: contentId,
    title: "title " + contentId,
    editor_title: "editor title " + contentId,
    text: "content text bla bla " + contentId,
    type: this.query.type || 'article',

    rating: {
      rating: 5,
      votes_for: 15,
      votes_against: 10
    },

    user: {
      fio_or_username_or_id: "user fio or username",
      id: 265,
      avatar: {
        '50x50': 'http://new.maxpark.com/static/u/photo/4295209629/s.jpg'
      },
      is_online: contentId % 2 == 1
    }

  }]};


}


function *rest_community_users() {

  sleep(500);

  this.body = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": 3,
        "community": 4,
        "user": {
          "id": 1,
          "url": "/user/yaru",
          "fio_or_username_or_id": "yaru",
          "avatar": {
            "50x50": "http://127.0.0.1/static/u/photo/1/s.jpg",
            "30x30": "http://127.0.0.1/static/u/photo/1/m.jpg",
            "180x180": "http://127.0.0.1/static/u/photo/1/b.jpg"
          },
          "is_online": false
        },
        "group_id": 1
      },
      {
        "id": 8,
        "community": 4,
        "user": {
          "id": 2,
          "url": "/user/2",
          "fio_or_username_or_id": " Потапов",
          "avatar": {
            "50x50": "http://127.0.0.1/static/u/photo/2/s.jpg",
            "30x30": "http://127.0.0.1/static/u/photo/2/m.jpg",
            "180x180": "http://127.0.0.1/static/u/photo/2/b.jpg"
          },
          "is_online": true
        },
        "group_id": 3
      }
    ]
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