/* ==================================================== */
/* IMPORTS */
/* ==================================================== */
require('dotenv').config()
const { Sequelize } = require('sequelize')
let wareHouse = require('../models/warehouse')
let warehouseDescription = require('../models/warehouse_description')

/* ==================================================== */
/* DATABASE CONNECTION */
/* ==================================================== */
sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.PASSWD, {
	host: process.env.HOST,
	port: process.env.DBPORT,
	dialect: 'mysql',
	logging: false
})

sequelize
	.sync({ alter: true })
	.then(() =>
		console.log('\x1b[36m%s\x1b[0m', 'Connection has been established successfully.', '\x1b[0m')
	)
	.catch((err) => console.error('Unable to connect to the database:\n', err))

wareHouse = wareHouse(sequelize)
warehouseDescription = warehouseDescription(sequelize)

wareHouse.hasMany(warehouseDescription, {
	as: 'description',
	foreignKey: 'warehouse_id'
})

/* ==================================================== */
/* CRUD OPERATIONS */
/* ==================================================== */
exports.all = async (req, res) => {
	let data = {}
	await wareHouse
		.findAll({
			include: [{ model: warehouseDescription, as: 'description' }]
		})
		.then((instances) => {
			data.warehouses = instances
		})
		.catch((err) => {
			res.status(500).send({
				status: 'Error while retrieving information from database',
				error: err.message
			})
			res.end()
		})

	await wareHouse.count().then((total) => (data.total = total))

	res.status(200).send({
		status: `${data.total} warehouses fetched`,
		warehouses: data.warehouses
	})
	res.end()
}

exports.new = async (req, res) => {
	let newWarehouse = {
		name: req.body.name,
		headquarters_number: req.body.headquartersNumber,
		description: req.body.description
	}
	await wareHouse
		.create(newWarehouse, {
			include: [{ model: warehouseDescription, as: 'description' }]
		})
		.then((instance) => {
			res.status(201).send({
				status: 'new warehouse created',
				warehouse: instance.dataValues
			})
		})
		.catch((err) => {
			res.status(400).send({
				status: 'Error while saving information in the database',
				error: err.message
			})
		})
	res.end()
}

exports.one = async (req, res) => {
	await wareHouse
		.findOne({
			include: [{ model: warehouseDescription, as: 'description' }],
			where: { id: req.params.warehouse_id }
		})
		.then((instance) => {
			if (!instance) throw new Error('Instance not found')
			res.status(200).send({
				status: `warehouse #${instance.dataValues.id} fetched`,
				warehouse: instance.dataValues
			})
		})
		.catch((err) => {
			res.status(400).send({
				status: 'Error while retrieving information from database',
				error: err.message
			})
		})
	res.end()
}

exports.update = async (req, res) => {
	await wareHouse
		.findOne({
			include: [{ model: warehouseDescription, as: 'description' }],
			where: { id: req.params.warehouse_id }
		})
		.then((instance) => {
			if (!instance) throw new Error('Instance not found')

			const newValues = {
				name: req.body.name ? req.body.name : instance.name,
				headquarters_number: req.body.headquartersNumber
					? req.body.headquartersNumber
					: instance.headquarters_number,
				description: req.body.description ? req.body.description : instance.description
			}

			instance
				.update(newValues)
				.then((instanceUpdated) => {
					res.status(201).send({
						status: `Instance #${instanceUpdated.dataValues.id} updated`,
						warehouse: instanceUpdated.dataValues
					})
					res.end()
				})
				.catch((err) => console.log(err))
		})
		.catch((err) => {
			res.status(400).send({
				status: 'Error while retrieving information from database',
				error: err.message
			})
			res.end()
		})
}

exports.delete = async (req, res) => {
	await wareHouse
		.destroy({
			where: { id: req.params.warehouse_id }
		})
		.then((status) => {
			if (status == 0) throw new Error('Instance does not exists')
			else if (status == 1) res.status(200).send({ status: `Total deleted instances: 1` })
		})
		.catch((err) => {
			res.status(400).send({ status: 'Could not delete instance', error: err.message })
		})

	res.end()
}
