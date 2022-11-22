const app = require('../app')
const chai = require('chai')
const assert = chai.assert
const request = require('supertest')


describe('Get api/hotels/', function(){
    it('Has be a 404 error when the filt not match', function(done){
        const queries = 'erzx'

        request(app).get('api/hotels/?name='+ queries).expect(404,done())
    })
})