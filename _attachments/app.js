var Router,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.routes = {
    "login": "login",
    "logout": "logout",
    "design": "design",
    "select": "select",
    "show/results/:question_id": "showResults",
    "new/result/:question_id": "newResult",
    "edit/result/:result_id": "editResult",
    "delete/result/:result_id": "deleteResult",
    "delete/result/:result_id/:confirmed": "deleteResult",
    "edit/resultSummary/:question_id": "editResultSummary",
    "analyze/:form_id": "analyze",
    "delete/:question_id": "deleteQuestion",
    "edit/:question_id": "editQuestion",
    "manage": "manage",
    "sync": "sync",
    "sync/send": "syncSend",
    "sync/get": "syncGet",
    "configure": "configure",
    "map": "map",
    "reports": "reports",
    "reports/*options": "reports",
    "alerts": "alerts",
    "show/case/:caseID": "showCase",
    "users": "users",
    "messaging": "messaging",
    "help": "help",
    "displayUserScanner": "displayUserScanner",
    "displayAdminScanner": "displayAdminScanner",
    "registration": "registration",
    "userRegistration": "userRegistration",
    "postUserRegistrationMenu": "postUserRegistrationMenu",
    "postAdminRegistrationMenu": "postAdminRegistrationMenu",
    "displayReportMenu": "displayReportMenu",
    "userScan": "userScan",
    "scanRetry": "scanRetry",
    "scanRetry/:user": "scanRetry",
    "users": "users",
    "displayClientRecords": "displayClientRecords",
    "displayAllRecords": "displayAllRecords",
    "loadTestClient": "loadTestClient",
    "enroll": "enroll",
    "enroll/:user": "enroll",
    "patient/:patientId": "showPatient",
    "search/:keyword": "searchPatients",
    "": "displayAllRecords"
  };

  Router.prototype.route = function(route, name, callback) {
    var router;
    Backbone.history || (Backbone.history = new Backbone.History);
    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) {
      callback = this[name];
    }
    router = this;
    return Backbone.history.route(route, (function(_this) {
      return function(fragment) {
        var args;
        args = router._extractParameters(route, fragment);
        callback && callback.apply(router, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
        return _this.trigger.apply(_this, ['route:' + name].concat(args));
      };
    })(this), this);
  };

  Router.prototype.help = function() {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.helpView == null) {
          Coconut.helpView = new HelpView();
        }
        return Coconut.helpView.render();
      }
    });
  };

  Router.prototype.displayScanVerifyView = function() {
    return this.userLoggedIn({
      success: function() {
        var staticView;
        staticView = new VerifyView({
          template: JST["_attachments/templates/ScanVerifyView.handlebars"]()
        });
        return Coconut.mainRegion.show(staticView);
      }
    });
  };

  Router.prototype.displayUserScanner = function() {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.displayUserScanner();
      }
    });
  };

  Router.prototype.displayAdminScanner = function() {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.displayAdminScanner();
      }
    });
  };

  Router.prototype.registration = function(user) {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.displayRegistration(user);
      }
    });
  };

  Router.prototype.userRegistration = function() {
    return this.userLoggedIn({
      success: function() {
        console.log("displayRegistration.");
        return Coconut.Controller.displayRegistration("user");
      }
    });
  };

  Router.prototype.postUserRegistrationMenu = function() {
    return this.userLoggedIn({
      success: function() {
        console.log("postUserRegistrationMenu.");
        return Coconut.Controller.postUserRegistrationMenu();
      }
    });
  };

  Router.prototype.postAdminRegistrationMenu = function() {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.postAdminRegistrationMenu();
      }
    });
  };

  Router.prototype.enroll = function(user) {
    this.userLoggedIn({
      success: function() {
        if (user === 'user') {
          return Coconut.Controller.enrollUser();
        } else {
          return Coconut.Controller.enrollAdmin();
        }
      }
    });
  };

  Router.prototype.displayReportMenu = function() {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.displayReportMenu();
      }
    });
  };

  Router.prototype.userScan = function(user) {
    this.userLoggedIn({
      success: function() {
        return Coconut.Controller.displayUserScanner;
      }
    });
  };

  Router.prototype.scanRetry = function(user) {
    this.userLoggedIn({
      success: function() {
        return Coconut.Controller.scanRetry(user);
      }
    });
  };

  Router.prototype.users = function() {
    return this.adminLoggedIn({
      success: function() {
        if (Coconut.usersView == null) {
          Coconut.usersView = new UsersView();
        }
        return Coconut.usersView.render();
      }
    });
  };

  Router.prototype.messaging = function() {
    return this.adminLoggedIn({
      success: function() {
        if (Coconut.messagingView == null) {
          Coconut.messagingView = new MessagingView();
        }
        return Coconut.messagingView.render();
      }
    });
  };

  Router.prototype.login = function() {
    Coconut.loginView.callback = {
      success: function() {
        return Coconut.router.navigate("", true);
      }
    };
    return Coconut.loginView.render();
  };

  Router.prototype.userLoggedIn = function(callback) {
    var user;
    console.log("test");
    user = new User({
      _id: "user.admin",
      langChoice: "en"
    });
    Coconut.currentAdmin = user;
    return callback.success(user);
  };

  Router.prototype.adminLoggedIn = function(callback) {
    return this.userLoggedIn({
      success: function(user) {
        if (user.isAdmin()) {
          return callback.success(user);
        }
      },
      error: function() {
        return $("#content").html("<h2>Must be an admin user</h2>");
      }
    });
  };

  Router.prototype.logout = function() {
    User.logout();
    return Coconut.router.navigate("", true);
  };

  Router.prototype["default"] = function() {
    return Coconut.Controller.displayAdminScanner;
  };

  Router.prototype.displayClientRecords = function() {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.displayClientRecords();
      }
    });
  };

  Router.prototype.displayAllRecords = function() {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.displayPatientRecords();
      }
    });
  };

  Router.prototype.searchPatients = function(keywords) {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.displayPatientRecords(keywords);
      }
    });
  };

  Router.prototype.loadTestClient = function() {
    return this.userLoggedIn({
      success: function() {
        return Coconut.Controller.loadTestClient();
      }
    });
  };

  Router.prototype.alerts = function() {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.config.local.mode === "mobile") {
          return $("#content").html("Alerts not available in mobile mode.");
        } else {
          return $("#content").html("<h1>Alerts</h1> <ul> <li> <b>Localised Epidemic</b>: More than 10 cases per square kilometer in KATI district near BAMBI shehia (map <a href='#reports/location'>Map</a>). Recommend active case detection in shehia. </li> <li> <b>Abnormal Data Detected</b>: Only 1 case reported in MAGHARIBI district for June 2012. Expected amount: 25. Recommend checking that malaria test kits are available at all health facilities in MAGHARIBI. </li> </ul>");
        }
      }
    });
  };

  Router.prototype.reports = function(options) {
    return this.userLoggedIn({
      success: function() {
        var reportViewOptions;
        if (Coconut.config.local.mode === "mobile") {
          return $("#content").html("Reports not available in mobile mode.");
        } else {
          options = options != null ? options.split(/\//) : void 0;
          reportViewOptions = {};
          _.each(options, function(option, index) {
            if (!(index % 2)) {
              return reportViewOptions[option] = options[index + 1];
            }
          });
          if (Coconut.reportView == null) {
            Coconut.reportView = new ReportView();
          }
          return Coconut.reportView.render(reportViewOptions);
        }
      }
    });
  };

  Router.prototype.showCase = function(caseID) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.caseView == null) {
          Coconut.caseView = new CaseView();
        }
        Coconut.caseView["case"] = new Result({
          caseID: caseID,
          _id: caseID
        });
        return Coconut.caseView["case"].fetch({
          success: function() {
            return Coconut.caseView.render();
          }
        });
      }
    });
  };

  Router.prototype.showPatient = function(patientId) {
    return this.userLoggedIn({
      success: function() {
        Coconut.currentClient = new Result({
          _id: patientId
        });
        return Coconut.currentClient.fetch({
          success: function() {
            Coconut.router.navigate("displayClientRecords");
            return Coconut.Controller.displayClientRecords();
          }
        });
      }
    });
  };

  Router.prototype.configure = function() {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.localConfigView == null) {
          Coconut.localConfigView = new LocalConfigView();
        }
        return Coconut.localConfigView.render();
      }
    });
  };

  Router.prototype.editResultSummary = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.resultSummaryEditor == null) {
          Coconut.resultSummaryEditor = new ResultSummaryEditorView();
        }
        Coconut.resultSummaryEditor.question = new Question({
          id: unescape(question_id)
        });
        return Coconut.resultSummaryEditor.question.fetch({
          success: function() {
            return Coconut.resultSummaryEditor.render();
          }
        });
      }
    });
  };

  Router.prototype.editQuestion = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.designView == null) {
          Coconut.designView = new DesignView();
        }
        Coconut.designView.render();
        return Coconut.designView.loadQuestion(unescape(question_id));
      }
    });
  };

  Router.prototype.deleteQuestion = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        return Coconut.questions.get(unescape(question_id)).destroy({
          success: function() {
            Coconut.menuView.render();
            return Coconut.router.navigate("manage", true);
          }
        });
      }
    });
  };

  Router.prototype.sync = function(action) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.syncView == null) {
          Coconut.syncView = new SettingsView();
        }
        return Coconut.syncView.render();
      }
    });
  };

  Router.prototype.syncSend = function(action) {
    Coconut.router.navigate("sync", false);
    return this.userLoggedIn({
      success: function() {
        Coconut.syncView.sync.replicateToServer({
          success: function() {
            return Coconut.syncView.refreshLog();
          }
        });
        return Coconut.syncView.sync.replicateFromServer({
          success: function() {
            return Coconut.syncView.refreshLog();
          }
        });
      }
    });
  };

  Router.prototype.syncGet = function(action) {
    Coconut.router.navigate("", false);
    return this.userLoggedIn({
      success: function() {
        if (Coconut.syncView == null) {
          Coconut.syncView = new SettingsView();
        }
        return Coconut.syncView.sync.getFromCloud();
      }
    });
  };

  Router.prototype.manage = function() {
    return this.adminLoggedIn({
      success: function() {
        if (Coconut.manageView == null) {
          Coconut.manageView = new ManageView();
        }
        return Coconut.manageView.render();
      }
    });
  };

  Router.prototype.newResult = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.questionView == null) {
          Coconut.questionView = new QuestionView();
        }
        Coconut.questionView.result = new Result({
          question: unescape(question_id)
        });
        Coconut.questionView.model = new Question({
          id: unescape(question_id)
        });
        return Coconut.questionView.model.fetch({
          success: function() {
            return Coconut.questionView.render();
          },
          error: function(error) {
            return console.log("Unable to fetch model: " + JSON.stringify(error));
          }
        });
      }
    });
  };

  Router.prototype.editResult = function(result_id) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.questionView == null) {
          Coconut.questionView = new QuestionView();
        }
        Coconut.questionView.readonly = false;
        Coconut.questionView.result = new Result({
          _id: result_id
        });
        return Coconut.questionView.result.fetch({
          success: function() {
            Coconut.questionView.model = new Question({
              id: Coconut.questionView.result.question()
            });
            return Coconut.questionView.model.fetch({
              success: function() {
                return Coconut.questionView.render();
              }
            });
          }
        });
      }
    });
  };

  Router.prototype.deleteResult = function(result_id, confirmed) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.questionView == null) {
          Coconut.questionView = new QuestionView();
        }
        Coconut.questionView.readonly = true;
        Coconut.questionView.result = new Result({
          _id: result_id
        });
        return Coconut.questionView.result.fetch({
          success: function() {
            if (confirmed === "confirmed") {
              return Coconut.questionView.result.destroy({
                success: function() {
                  Coconut.menuView.update();
                  return Coconut.router.navigate("show/results/" + (escape(Coconut.questionView.result.question())), true);
                }
              });
            } else {
              Coconut.questionView.model = new Question({
                id: Coconut.questionView.result.question()
              });
              return Coconut.questionView.model.fetch({
                success: function() {
                  Coconut.questionView.render();
                  $("#content").prepend("<h2>Are you sure you want to delete this result?</h2> <div id='confirm'> <a href='#delete/result/" + result_id + "/confirmed'>Yes</a> <a href='#show/results/" + (escape(Coconut.questionView.result.question())) + "'>Cancel</a> </div>");
                  $("#confirm a").button();
                  $("#content form").css({
                    "background-color": "#333",
                    "margin": "50px",
                    "padding": "10px"
                  });
                  return $("#content form label").css({
                    "color": "white"
                  });
                }
              });
            }
          }
        });
      }
    });
  };

  Router.prototype.design = function() {
    return this.userLoggedIn({
      success: function() {
        $("#content").empty();
        if (Coconut.designView == null) {
          Coconut.designView = new DesignView();
        }
        return Coconut.designView.render();
      }
    });
  };

  Router.prototype.showResults = function(question_id) {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.resultsView == null) {
          Coconut.resultsView = new ResultsView();
        }
        Coconut.resultsView.question = new Question({
          id: unescape(question_id)
        });
        return Coconut.resultsView.question.fetch({
          success: function() {
            return Coconut.resultsView.render();
          }
        });
      }
    });
  };

  Router.prototype.map = function() {
    return this.userLoggedIn({
      success: function() {
        if (Coconut.mapView == null) {
          Coconut.mapView = new MapView();
        }
        return Coconut.mapView.render();
      }
    });
  };

  Router.prototype.bootstrapApp = function() {
    Controller.displaySiteNav();
    Coconut.config = new Config();
    return Coconut.config.fetch({
      success: function() {
        return Coconut.router.fetchUserAndStartAppUI();
      },
      error: function() {
        if (Coconut.localConfigView == null) {
          Coconut.localConfigView = new LocalConfigView();
        }
        return Coconut.localConfigView.render();
      }
    });
  };

  Router.prototype.fetchUserAndStartAppUI = function() {
    var user;
    user = new User({
      _id: "user.admin"
    });
    return user.fetch({
      success: function() {
        var deferred, langChoice;
        langChoice = user.get('langChoice');
        console.log("langChoice from doc: " + user.get('langChoice'));
        if (!langChoice) {
          langChoice = 'en';
          user.set('langChoice', langChoice);
          return user.save(null, {
            success: function() {
              var deferred;
              console.log("langChoice saved: " + langChoice);
              deferred = CoconutUtils.fetchTranslation(langChoice);
              return deferred.done(function() {
                console.log("Got translation. Starting app");
                return Coconut.router.startAppUI();
              });
            },
            error: function(json, msg) {
              return console.log("Error saving langChoice  " + msg);
            }
          });
        } else {
          deferred = CoconutUtils.fetchTranslation(langChoice);
          return deferred.done(function() {
            console.log("Got translation. Starting app");
            return Coconut.router.startAppUI();
          });
        }
      },
      error: function() {
        return console.log("Error: user.admin should be in the local db.");
      }
    });
  };

  Router.prototype.startAppUI = function() {
    $('#application-title').html(Coconut.config.title());
    Controller.displaySiteNav();
    Coconut.loginView = new LoginView();
    Coconut.questions = new QuestionCollection();
    Coconut.questionView = new QuestionView();
    Coconut.menuView = new MenuView();
    Coconut.syncView = new SettingsView();
    Coconut.syncView.sync.replicateToServer();
    Coconut.syncView.sync.replicateFromServer();
    Backbone.history.start();
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      return CoconutUtils.checkVersion();
    }
  };

  return Router;

})(Backbone.Router);

$((function(_this) {
  return function() {
    var onDeviceReady, onOffline, onOnline;
    onOffline = function() {
      var message;
      message = 'Device is offline.';
      console.log(message);
      Coconut.connectionStatus = "offline";
      return $("#statusIcons").html('<img src="images/connection-down.png"/>');
    };
    onOnline = function() {
      var message;
      message = 'Device is online.';
      console.log(message);
      Coconut.connectionStatus = "online";
      return $("#statusIcons").html('<img src="images/connection-up.png"/>');
    };
    onDeviceReady = function() {
      var matchResults;
      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        console.log("Disabled Init Secugen: this wheel is on fire, but not scanning.");
      }
      window.Coconut = new Marionette.Application();
      matchResults = document.location.pathname.match(/^\/(.*)\/_design\/(.*?)\//);
      if (matchResults === null) {
        console.log('Configuring for Pouchdb');
        Coconut.db_name = 'coconut';
        Coconut.ddoc_name = 'coconut';
      } else {
        Coconut.db_name = matchResults[1];
        Coconut.ddoc_name = matchResults[2];
      }
      Coconut.Controller = Controller;
      Coconut.API = API;
      Coconut.router = new Router();
      Coconut.currentClient = null;
      Coconut.currentAdmin = null;
      Coconut.currentPosition = null;
      Coconut.currentPositionError = null;
      Coconut.addRegions({
        siteNav: "#siteNav"
      });
      Coconut.addRegions({
        mainRegion: "#content"
      });
      Coconut.addRegions({
        dashboardRegion: "#dashboard"
      });
      Coconut.on("displayReportMenu", function() {
        Coconut.router.navigate("displayReportMenu");
        return Coconut.Controller.displayReportMenu();
      });
      Coconut.on("displayAdminScanner", function() {
        Coconut.router.navigate("displayAdminScanner");
        return Coconut.Controller.displayAdminScanner();
      });
      Coconut.on("displayUserScanner", function() {
        Coconut.router.navigate("displayUserScanner");
        return Coconut.Controller.displayUserScanner();
      });
      Coconut.on("displayAdminRegistrationForm", function() {
        Coconut.router.navigate("displayRegistration");
        return Coconut.Controller.displayRegistration();
      });
      Coconut.on("displayUserRegistrationForm", function() {
        Coconut.router.navigate("displayRegistration");
        return Coconut.Controller.displayRegistration("user");
      });
      Coconut.on("displayEnrollUser", function() {
        Coconut.router.navigate("enroll/user");
        return Coconut.Controller.enrollUser();
      });
      Coconut.on("displayEnrollAdmin", function() {
        Coconut.router.navigate("enroll/admin");
        return Coconut.Controller.enrollAdmin();
      });
      Coconut.on("displayClientRecords", function() {
        Coconut.router.navigate("displayClientRecords");
        return Coconut.Controller.displayClientRecords();
      });
      Coconut.on("displayAllRecords", function() {
        console.log("displayAllRecords triggered");
        Coconut.router.navigate("displayAllRecords");
        return Coconut.Controller.displayPatientRecords();
      });
      Coconut.on("displaySync", function() {
        Coconut.router.navigate("sync");
        return Coconut.Controller.displaySync();
      });
      Coconut.router.bootstrapApp();
      return Coconut.debug = function(string) {
        console.log(string);
        if (Coconut.replicationLog == null) {
          Coconut.replicationLog = "";
        }
        Coconut.replicationLog += "<br/>";
        return Coconut.replicationLog += string;
      };
    };
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      console.log("listening for deviceready event.");
      document.addEventListener("deviceready", onDeviceReady, false);
      document.addEventListener("offline", onOffline, false);
      return document.addEventListener("online", onOnline, false);
    } else {
      return onDeviceReady();
    }
  };
})(this));
