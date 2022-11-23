const app = require('../app')
const chai = require('chai')
const assert= chai.assert
const request = require('supertest');
describe("GET /api/cities", function () {
    it("Should return an array", function (done) {
      request(app)
      .get('/api/cities')
      .expect(response=>{
        assert.typeOf(response.body.response,'array','Es un array')
      })
      .end(function(err,res){
        if(err){
            return done(err)
        }
        done();
      })
    });
  });
 