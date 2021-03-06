<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Tests for the EE_Primary_Key_Int_Field class
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.26.rc.000
 * @group   model_fields
 * @group   models
 */
class EE_Primary_Key_Int_Field_Test extends EE_UnitTestCase
{

    /**
     * holds the field being tested
     * @var EE_Primary_Key_Int_Field
     */
    protected $_field;

    public function setUp()
    {
        parent::setUp();
        $this->_field = EEM_Message::instance()->field_settings_for('MSG_ID');
        $this->assertInstanceOf('EE_Primary_Key_Int_Field', $this->_field);
    }


    public function tearDown()
    {
        $this->_field = null;
        parent::tearDown();
    }


    public function test_getSchemaType()
    {
        $this->assertEquals('integer', $this->_field->getSchemaType());
    }

    public function test_get_wpdb_data_type()
    {
        $this->assertEquals('%d', $this->_field->get_wpdb_data_type());
    }
}