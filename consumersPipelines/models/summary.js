'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Summary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     models.Summary.belongsTo(models.Category, {
       foreignKey: 'Category_id',
       as: 'category'
     });
    }
  }
  Summary.init({
    Copied_or_moved_a_file_or_folder: DataTypes.FLOAT,
    Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document: DataTypes.FLOAT,
    Sent_email_with_attached_file: DataTypes.FLOAT,
    Used_basic_arithmetic_formula_in_spreadsheet: DataTypes.FLOAT,
    Connected_and_installed_new_device: DataTypes.FLOAT,
    Found_downloaded_installed_and_configured_software: DataTypes.FLOAT,
    Created_electronic_presentation_with_presentation_software: DataTypes.FLOAT,
    Transferred_file_between_computer_and_other_device: DataTypes.FLOAT,
    Wrote_computer_program_in_any_programming_language: DataTypes.FLOAT,
    Performed_at_least_one_out_of_nine_activities: DataTypes.FLOAT,
    Source: DataTypes.STRING,
    Year: DataTypes.STRING,
    Category_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Summary',
  });
  return Summary;
};