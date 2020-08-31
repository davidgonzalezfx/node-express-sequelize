/* ==================================================== */
/* IMPORTS */
/* PLEASE RUN SERVER (IN ANOTHER TERMINAL) BEFORE TESTS [npm run dev] */
/* ==================================================== */
const expect = require('chai').expect
const fetch = require('node-fetch')

const SERVER = 'http://192.168.1.57:3000/api'

describe('/api/warehouses requests', function () {
	it('GET /api/warehouses should return all warehouses in database', async () => {
		const response = await fetch(SERVER + '/warehouses')
		expect(response.status).to.be.equal(200)

		const warehouses = await response.json()
		expect(warehouses).to.be.an('Object')
		expect(warehouses.status).to.be.a('String')
		expect(warehouses.warehouses).to.be.a('Array')
	})

	it('POST /api/warehouses should create new warehouse in database', async () => {
		const data = {
			"name": "test_post_method",
			"headquartersNumber": 999,
			"description": [
				{
					"phone": 300000000,
					"city": "Bogota",
					"address": "Cra 1 #1-1"
				}
			]
		}
		const response = await fetch(SERVER + '/warehouses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})


		expect(response.status).to.be.equal(201)

		const newWarehouse = await response.json();
		expect(newWarehouse).to.be.an('Object');
		expect(newWarehouse.status).to.be.equal("new warehouse created");
		expect(newWarehouse.warehouse.name).to.be.equal(data.name);
		expect(newWarehouse.warehouse.headquarters_number).to.be.equal(data.headquartersNumber);
		expect(newWarehouse.warehouse.description.phone).to.be.equal(data.description.phone);
		expect(newWarehouse.warehouse.description.city).to.be.equal(data.description.city);
		expect(newWarehouse.warehouse.description.address).to.be.equal(data.description.address);

	})
})


describe('/api/warehouse/:id requests', function () {
	const data = {
		"name": "test_instance",
		"headquartersNumber": 999,
		"description": [
			{
				"phone": 300000000,
				"city": "Bogota",
				"address": "Cra 1 #1-1"
			}
		]
	}
	let id;

	beforeEach(async () => {
		const createWarehouse = await fetch(SERVER + '/warehouses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		const newWarehouse = await createWarehouse.json();
		id = newWarehouse.warehouse.id
	})

	afterEach(async () => {
		try {
			await fetch(SERVER + `/warehouse/${id}`, {
				method: 'DELETE'
			})
		}
		catch (e) { }
	});

	it('GET /api/warehouse/:id should return warehouse instance ', async () => {

		const response = await fetch(SERVER + `/warehouse/${id}`)
		expect(response.status).to.be.equal(200)

		const instance = await response.json()
		expect(instance).to.be.an('Object');
		expect(instance.status).to.be.equal(`warehouse #${id} fetched`);
		expect(instance.warehouse.name).to.be.equal(data.name);
		expect(instance.warehouse.headquarters_number).to.be.equal(data.headquartersNumber);
		expect(instance.warehouse.description.phone).to.be.equal(data.description.phone);
		expect(instance.warehouse.description.city).to.be.equal(data.description.city);
		expect(instance.warehouse.description.address).to.be.equal(data.description.address);
	})

	it('PUT /api/warehouse/:id should update warehouse instance in database', async () => {
		const response = await fetch(SERVER + `/warehouse/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"name": "instance_updated"
			})
		})
		expect(response.status).to.be.equal(201)

		const instance = await response.json()
		expect(instance).to.be.an('Object');
		expect(instance.status).to.be.equal(`Instance #${id} updated`);
		expect(instance.warehouse.name).to.be.equal("instance_updated");
		expect(instance.warehouse.headquarters_number).to.be.equal(data.headquartersNumber);
		expect(instance.warehouse.description.phone).to.be.equal(data.description.phone);
		expect(instance.warehouse.description.city).to.be.equal(data.description.city);
		expect(instance.warehouse.description.address).to.be.equal(data.description.address);
	})

	it('DELETE /api/warehouse/:id should delete warehouse instance', async () => {
		const responseDelete = await fetch(SERVER + `/warehouse/${id}`, {
			method: 'DELETE'
		})
		expect(responseDelete.status).to.be.equal(200)

		const verify = await responseDelete.json()
		expect(verify).to.be.an('Object');
		expect(verify.status).to.be.equal('Total deleted instances: 1');

		const response = await fetch(SERVER + `/warehouse/${id}`)
		expect(response.status).to.be.equal(400)

		const instance = await response.json()
		expect(instance).to.be.an('Object');
		expect(instance.status).to.be.equal('Error while retrieving information from database');
		expect(instance.error).to.be.equal('Instance not found');
	})
})

describe('/api/warehouse/:id errors', function () {
	it('GET /api/warehouse/:id to instance that does not exists', async () => {
		const response = await fetch(SERVER + `/warehouse/00001`)
		expect(response.status).to.be.equal(400)

		const res = await response.json()
		expect(res).to.be.an('Object');
		expect(res.status).to.be.equal('Error while retrieving information from database');
		expect(res.error).to.be.equal('Instance not found');
	})

	it('PUT /api/warehouse/:id to instance that does not exists', async () => {
		const response = await fetch(SERVER + `/warehouse/00001`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"name": "instance_updated"
			})
		})
		expect(response.status).to.be.equal(400)

		const res = await response.json()
		expect(res).to.be.an('Object');
		expect(res.status).to.be.equal('Error while retrieving information from database');
		expect(res.error).to.be.equal('Instance not found');
	})

	it('DELETE /warehouse/:id to instance that does not exists', async () => {
		const response = await fetch(SERVER + `/warehouse/00001`, {
			method: 'DELETE'
		})
		expect(response.status).to.be.equal(400)

		const res = await response.json()
		expect(res).to.be.an('Object');
		expect(res.status).to.be.equal('Could not delete instance');
		expect(res.error).to.be.equal('Instance does not exists');
	})
})
