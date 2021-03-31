'use strict';

module.exports = function(sequelize, DataTypes) {
	const Question = sequelize.define(
		'Question',
		{
			content: {
				type: DataTypes.STRING,
				allowNull: false
			},
			type: {
				type: DataTypes.ENUM('INPUT_TEXT', 'CHOICE'),
				allowNull: false,
				defaultValue: 'INPUT_TEXT'
			},
			choices: {
				type: DataTypes.JSONB,
				allowNull: true
			}
		},
		{
			timestamps: false,
			underscored: true
		}
	);

	return Question;
};
