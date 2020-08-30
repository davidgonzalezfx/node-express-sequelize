const router = require('express').Router()
const controller = require('../controllers/warehouse.controller')

router.get('/', (req, res) => {
	res.json({
		status: 'API Its Working',
		message: 'List of favorite websites'
	})
})

router.route('/warehouses').get(controller.all).post(controller.new)

router
	.route('/warehouse/:warehouse_id')
	.get(controller.one)
	.put(controller.update)
	.delete(controller.delete)

module.exports = router
