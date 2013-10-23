'use strict';
$(function () {
  var viewModel = {
    // flat observables:
    titles: new ko.observableArray([]),
    details: new ko.observable(false),

    // view helpers:
    // View a list of academy award nominations:
    getAcademyAwards: function () {
      var awards = _.filter(viewModel.details().Awards, function (item) {
        return item.AwardCompany === "Academy Award";
      });
      if (awards.length === 0) { return undefined; }
      return awards;
    },
    // Actors, Directors, Producers:
    getParticipentsBy: function (type) {
      return _.filter(viewModel.details().Participants, function (item) {
        return item.RoleType === type;
      });
    },
    // Links to IMDB
    imdbLink: function () {
      var imdb = _.find(viewModel.details().ExternalSources, function (item) {
        return item.Name === "IMDB";
      });
      if (imdb) {
        return "http://imdb.com/title/" + imdb.Key;
      }
      return undefined;
    },

    // search event:
    search: function () {
      var query = $('.search-query').val();
      $.getJSON("/titles?name=" + query, function (data) {
        viewModel.titles(data);
      });
    },

    // fetches and draws the details for a specific title
    setDetails: function (title) {
      var name = title.TitleName;
      $.getJSON("/titles/" + name, function (data) {
        viewModel.details(data);
      });
    }
  };
  ko.applyBindings(viewModel);

  // DOM event stuff
  $("form").on("submit", function (e) {
    e.preventDefault();
  });

  // some defaults to populate the page on load
  viewModel.search();
  viewModel.setDetails({TitleName: "2 Fast 2 Furious"});
});
