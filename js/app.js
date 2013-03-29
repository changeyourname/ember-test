App = Ember.Application.create({});

App.Store = DS.Store.extend({
  revision: 12,
  // adapter: 'DS.FixtureAdapter',
  adapter: DS.RESTAdapter.extend({
    url: 'rest'
  })
});

App.Router.map(function() {
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' })
  });
  this.resource('about');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  },
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,
  doneEditing: function() {
    this.set('isEditing', false);
    this.get('store').commit(); // !!! This isn't going to work because
                    //we arent using a real REST service in this example.
  },
  edit: function() {
    this.set('isEditing', true);
  },
});

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  intro: DS.attr('string'),
  extended: DS.attr('string'),
  publishedAt: DS.attr('date'),
});

// App.Post.FIXTURES = [{
//   id: 1,
//   title: 'Lorem Ipsum',
//   author: 'John Cobra',
//   intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam est, rutrum vel euismod',
//   extended: '###This is markdown\n [hello](hello) **bold** Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam est, rutrum vel euismod in, interdum ut enim. Ut nec justo arcu. Nam dapibus gravida enim, nec iaculis nibh dapibus eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur neque odio, laoreet sit amet tempor ut, sodales et ante. In pulvinar tortor quis urna tincidunt nec interdum nunc ultricies. Donec non placerat leo. Proin imperdiet tempus bibendum. Cras et augue justo.',
//   publishedAt: new Date('12-12-2012'),
// },
// {
//   id: 2,
//   title: 'Another post',
//   author: 'Peter Morgan',
//   intro: 'Nullam magna nibh, sollicitudin id commodo non, sollicitudin non turpis. Proin augue sapien, feugiat',
//   extended: '#Nullam magna nibh, sollicitudin id commodo non, \n##sollicitudin non \n**turpis**. Proin augue sapien, feugiat a ornare quis, rutrum sit amet lacus. Nunc pretium congue enim eget porta. Integer ac felis elit. Morbi blandit metus vitae risus sodales eget pulvinar risus pretium. Sed auctor, urna sit amet scelerisque cursus, felis felis egestas velit, sed accumsan urna nibh et nibh. Suspendisse potenti.',
//   publishedAt: new Date('12-22-2012'),
// }];

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).fromNow();
});

var showdown = new Showdown.converter();
Ember.Handlebars.registerBoundHelper('md', function(input) {
  return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});
