Meteor.subscribe('userList');

Meteor.startup(function () {
  _.extend(Notifications.defaultOptions, {
      timeout: 1500
  });
});

// mizzao:user-status used for determning login status
Meteor.users.find({ 'status.online': true }).observe({
  //login action
  added: function(id) {
    console.log(id.emails[0].address, 'logged in!');
    Router.go('/cards');
    $('.nav-item').removeClass('selected');
    $(event.target).addClass('selected');
    stopMonitor: true;
  },
  //logout action
  removed: function(id) {
    console.log(id.emails[0].address, 'logged out!');
    $('.nav-item').removeClass('selected');
    Router.go('/');
  }
});

Template.cardItem.events({
  'click div.topic': function() {
    var cardId = this._id;
    var cardTopic = this.topic;
    Session.set('selectedCard', cardId);
    Session.set('selectedTopic', cardTopic);

    var selectedCard = Session.get('selectedCard');
    var selectedTopic = Session.get('selectedTopic');
    console.log(selectedCard);
    console.log(selectedTopic);
  }
});

Template.intro.events({
  
  'click #startBtn': function(event) {
    if (!Meteor.user()) {
      if (Meteor.loggingIn()) {
        console.log('logging in...');
        Router.go('/cards');
      }
      else{
        Session.set('sAlert', {condition: 'red', effect: 'jelly', message: 'Oops! Please Login First', position: 'right-top', timeout: 3000});
      }
    }
  },

});


