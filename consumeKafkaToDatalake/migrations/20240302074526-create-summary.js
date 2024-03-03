'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Summaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Country: {
        type: Sequelize.STRING
      },
      ISO3: {
        type: Sequelize.STRING
      },
      UNICEF_Region: {
        type: Sequelize.STRING
      },
      Sex: {
        type: Sequelize.STRING
      },
      Copied_or_moved_a_file_or_folder: {
        type: Sequelize.FLOAT
      },
      Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document: {
        type: Sequelize.FLOAT
      },
      Sent_email_with_attached_file: {
        type: Sequelize.FLOAT
      },
      Used_basic_arithmetic_formula_in_spreadsheet: {
        type: Sequelize.FLOAT
      },
      Connected_and_installed_new_device: {
        type: Sequelize.FLOAT
      },
      Found_downloaded_installed_and_configured_software: {
        type: Sequelize.FLOAT
      },
      Created_electronic_presentation_with_presentation_software: {
        type: Sequelize.FLOAT
      },
      Transferred_file_between_computer_and_other_device: {
        type: Sequelize.FLOAT
      },
      Wrote_computer_program_in_any_programming_language: {
        type: Sequelize.FLOAT
      },
      Performed_at_least_one_out_of_nine_activities: {
        type: Sequelize.FLOAT
      },
      Source: {
        type: Sequelize.STRING
      },
      Year: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Summaries');
  }
};