var should    = require("chai").should();
var expect    = require("chai").expect;
var supertest = require("supertest")

api           = supertest("http://localhost:3000")


// describe("what am i testing", function(){
describe("Candies", function(done){
  //tests will be written inside this function
  describe("GET /candies", function(){

  //it("description of test", function(){
    it("should return a 200 response", function(){
      api.get("/candies")
      .set("Accept", "application/json")
      .expect(200, done)
    })

    it("should return an array", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body).to.be.an('array');
        done()
      })
    })

    it("should return an object that have a field called 'name'. 'id', 'color' ", function(done){
    api.get("/candies")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('name');
      expect(response.body[0]).to.have.property('color');
      expect(response.body[0]).not.to.have.property('fer');
      done()
      })
    })

    it("should return 4 elements in array", function(done){
    api.get("/candies")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body.length).to.equal(4);
      done()
    })
  })
})

  describe("POST /candies", function(){
    before(function(done){
    api.post("/candies")
    .set("Accept", "application/json")
    .send({
      "id": 5,
      "name": "Lollipop",
      "color": "Red"
    }).end(done)
  })

  it("should add a candy object to the collection candies and return it", function(done){
    api.get("/candies")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body.length).to.equal(5);
      done()
    })
  })


  })
});