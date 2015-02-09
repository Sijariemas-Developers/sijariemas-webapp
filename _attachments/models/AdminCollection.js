var AdminCollection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AdminCollection = (function(_super) {
  __extends(AdminCollection, _super);

  function AdminCollection() {
    return AdminCollection.__super__.constructor.apply(this, arguments);
  }

  AdminCollection.prototype.model = Result;

  AdminCollection.prototype.url = '/result';

  AdminCollection.prototype.parse = function(result) {
    var docs;
    docs = _.pluck(result.rows, 'doc');
    return docs;
  };

  return AdminCollection;

})(Backbone.Collection);
