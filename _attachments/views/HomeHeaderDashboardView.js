var HomeHeaderDashboardView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HomeHeaderDashboardView = (function(_super) {
  __extends(HomeHeaderDashboardView, _super);

  function HomeHeaderDashboardView() {
    this.searchPatients = __bind(this.searchPatients, this);
    this.displayUserRegistrationForm = __bind(this.displayUserRegistrationForm, this);
    this.render = __bind(this.render, this);
    return HomeHeaderDashboardView.__super__.constructor.apply(this, arguments);
  }

  HomeHeaderDashboardView.prototype.tagName = 'p';

  HomeHeaderDashboardView.prototype.events = {
    "click #newPatient": "displayUserRegistrationForm",
    "click #searchPatients": "searchPatients"
  };

  HomeHeaderDashboardView.prototype.render = function() {
    return this.$el.html('<p><input type="text" id="keyword" placeholder=' + polyglot.t('enterCountryId') + '/>&nbsp;<a data-role="button" id="searchPatients" class="btn btn-primary btn-lg">' + polyglot.t('searchButton') + '</a>&nbsp;<a data-role="button" id="newPatient" class="btn btn-primary btn-lg">' + polyglot.t('newPatient') + '</a></p>');
  };

  HomeHeaderDashboardView.prototype.displayUserRegistrationForm = function() {
    return Coconut.trigger("displayUserRegistrationForm");
  };

  HomeHeaderDashboardView.prototype.searchPatients = function() {
    var keyword;
    keyword = $("#keyword").val();
    return Coconut.Controller.displayPatientRecords(keyword);
  };

  return HomeHeaderDashboardView;

})(Backbone.View);
