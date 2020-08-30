const { Sequelize, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define(
		'warehouse_description',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER(10).UNSIGNED,
				allowNull: false,
				primaryKey: true
			},
			warehouse_id: {
				type: DataTypes.INTEGER(10).UNSIGNED,
				allowNull: false,
				references: {
					model: {
						tableName: 'warehouse'
					},
					key: 'id'
				}
			},
			phone: {
				type: DataTypes.INTEGER(11),
				allowNull: false
			},
			city: {
				type: DataTypes.STRING(150),
				allowNull: false
			},
			address: {
				type: DataTypes.STRING(150),
				allowNull: false
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: Sequelize.NOW
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: Sequelize.NOW
			}
		},
		{
			tableName: 'warehouse_description',
			timestamps: false
		}
	)
}
