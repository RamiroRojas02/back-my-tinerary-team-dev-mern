const app = require("../app");
const chai = require("chai");
const assert = chai.assert;
const request = require("supertest");

describe("Get api/hotels/", function () {
  it("Has be a 404 error when the filt not match", function (done) {
    const queries = "erzx";

    request(app)
      .get("api/hotels/?name=" + queries)
      .expect(404, done());
  });
});

describe("Post api/hotels/", function () {
  it("Has to be type Number capacity", function (done) {
    const body = {
        capacity: "200",
        cityId: "63744ba6b943babf4b70d5dd",
        description: "hotel donde vivio pepito 6 mama que hay pepitos",
        name: "pepito 6",
        photo: [
          "https://content.r9cdn.net/himg/62/c0/84/ice-85676218-68620422_3XL-430714.jpg",
        ],
        userId: "6372494878cf1c151a1a4f67",
      };

    request(app)
      .post("api/hotels/")
      .expect(body.capacity, "number")
        done()
      })
  });
  it("Has to be a 201 when hotel is created", function (done) {
    const body = {
      capacity: "200",
      cityId: "63744ba6b943babf4b70d5dd",
      description: "hotel donde vivio pepito 6 mama que hay pepitos",
      name: "pepito 6",
      photo: [
        "https://content.r9cdn.net/himg/62/c0/84/ice-85676218-68620422_3XL-430714.jpg",
      ],
      userId: "6372494878cf1c151a1a4f67",
    };

    request(app).post("api/hotels/").expect(201, done());
  });



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
 