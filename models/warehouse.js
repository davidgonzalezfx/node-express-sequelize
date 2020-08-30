const { Sequelize, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	return sequelize.define(
		'warehouse',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER(10).UNSIGNED,
				allowNull: false,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false
			},
			headquarters_number: {
				type: DataTypes.INTEGER(11),
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
			tableName: 'warehouse',
			timestamps: false
		}
	)
}
