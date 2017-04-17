var path = require('path');
var should = require('chai').should();
var Animal = require(path.join(process.cwd(), '/lib/Pagination'));

describe('Pagination', function () {
  it.should('show amaximum of 10 UserTwit posts ', function () {

  });
  and.it.should('be sorted with the most recent posts descending from top', function () {

  });

  describe('Home Page', function () {

    and.it.should('show a View older posts button', function () {

    })
  });

  describe('View older posts', function () {
    it.should('link to posts that are 10 posts older than the current view', function () {

    });
  });

  describe('View newer posts', function () {
    it.should('link to posts that are 10 posts newer than the current view', function () {

    });
  });

});
