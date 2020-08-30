const chai = require('chai')
const chaiHttp = require('chai-http')
const { app, server } = require('../server')

chai.use(chaiHttp)
chai.should()

describe('Server tests:', () => {
	describe('GET /api/warehouses', () => {
		it('Should fetch all warehouses in database', (done) => {
			// console.log(chai.request(app))
			chai
				.request(app)
				.get('/api/warehouses')
				.end((err, res) => {
					res.should.have.status(200)
				})
				.end()
		})
	})
})
