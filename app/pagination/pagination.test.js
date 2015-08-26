var path = require('path');
var should = require('chai').should();
var Pagination = require(path.join(process.cwd(), './app/pagination/Pagination'));

describe('Pagination', function () {
  var testArray = [{order:2, date: new Date('August 20 2015')},{order: 1, date: new Date()}];

  describe('.sort()', function (){
    it('should sort an array by descending date', function () {
      Pagination.postSorter(testArray).forEach(function(post, i, arr){
        if(i === arr.length - 1){ return; }
        (post.date).should.be.above(arr[i + 1].date);
      });
    });
  });
});

//   it.should('show amaximum of 10 UserTwit posts ', function () {


//   });
//   and.it.should('be sorted with the most recent posts descending from top', function () {

//   });

//   describe('Home Page', function () {

//     and.it.should('show a View older posts button', function () {

//     })
//   });

//   describe('View older posts', function () {
//     it.should('link to posts that are 10 posts older than the current view', function () {

//     });
//   });

//   describe('View newer posts', function () {
//     it.should('link to posts that are 10 posts newer than the current view', function () {

//     });
//   });

// });
