'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('SubmitLogs','Copied_or_moved_a_file_or_folder', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Sent_email_with_attached_file', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Used_basic_arithmetic_formula_in_spreadsheet', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Connected_and_installed_new_device', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Found_downloaded_installed_and_configured_software', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Created_electronic_presentation_with_presentation_software', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Transferred_file_between_computer_and_other_device', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Wrote_computer_program_in_any_programming_language', {
      type: Sequelize.FLOAT
    });
    await queryInterface.addColumn('SubmitLogs','Performed_at_least_one_out_of_nine_activities', {
      type: Sequelize.FLOAT
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
