<?php
namespace tests\testcases\core\libraries\rest_api\controllers;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Write_Test
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 * @group          rest_api
 */
class Write_Test extends \EE_REST_TestCase
{

    /**
     */
    public function test_no_insert_if_no_caps()
    {
        $request = new \WP_REST_Request('POST', '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $request->set_body_params(
            array(
                'EVT_name' => 'Haha I didnt log in and I inserted an event',
            )
        );
        $response = rest_do_request($request);
        $data = $response->get_data();
        $this->assertEquals('rest_cannot_create_events', $data['code']);
    }



    /**
     * Verifies that even if the current user can edit events, they shouldn't be able
     * to insert until we've sorted that code out
     */
    public function test_no_insert_limited_user()
    {
        $user = $this->factory->user->create_and_get(array('role' => 'subscriber'));
        $user->add_cap('ee_edit_events');
        $user->add_cap('ee_read_events');
        wp_set_current_user($user->ID);
        //ok now try to insert an event
        $request = new \WP_REST_Request('POST', '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $request->set_body_params(
            array(
                'EVT_name' => 'Haha I didnt log in and I inserted an event',
            )
        );
        $response = rest_do_request($request);
        $data = $response->get_data();
        $this->assertEquals('rest_cannot_create_events', $data['code']);
    }



    /**
     * @group 9222
     */
    public function test_insert_utc_and_relative_times()
    {
        //let's set a different WP timezone.
        update_option('gmt_offset', '-1');
        $this->_authenticate_an_admin();
        $req = new \WP_REST_Request(
            'POST',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes'
        );
        $req->set_body_params(
            array(
                'DTT_EVT_start_gmt' => '2016-01-02T00:00:00',
                'DTT_EVT_end'       => '2016-01-03T00:00:00',
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(empty($response_data['code']));
        $this->assertEquals('2016-01-02T00:00:00', $response_data['DTT_EVT_start_gmt']);
        $this->assertEquals('2016-01-01T23:00:00', $response_data['DTT_EVT_start']);
        $this->assertEquals('2016-01-03T01:00:00', $response_data['DTT_EVT_end_gmt']);
        $this->assertEquals('2016-01-03T00:00:00', $response_data['DTT_EVT_end']);
    }



    /**
     * Tests that when you provide both a UTC and local time for the SAME field, there's an error
     *
     * @group 9222
     */
    public function test_insert_utc_and_relative_duplicate()
    {
        //let's set a different WP timezone.
        $this->_authenticate_an_admin();
        $req = new \WP_REST_Request(
            'POST',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes'
        );
        $req->set_body_params(
            array(
                'DTT_EVT_start_gmt' => '2016-01-02T00:00:00',
                'DTT_EVT_start'     => '2016-01-03T00:00:00',
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('repeated_model_field', $response_data['code']);
    }



    /**
     * @group 9222
     */
    public function test_update_only_some_fields()
    {
        $this->_authenticate_an_admin();
        $original_reg_limit = 25;
        $original_sold = 100;
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'DTT_reg_limit' => $original_reg_limit,
                'DTT_sold'      => $original_sold,
            )
        );
        $req = new \WP_REST_Request(
            'PUT',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID()
        );
        //just update the reg limit, not the number sold
        $req->set_body_params(
            array(
                'DTT_reg_limit' => $original_reg_limit * 2,
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        //assert the reg limit was updated properly
        $this->assertEquals($original_reg_limit * 2, (int)$response_data['DTT_reg_limit']);
        //but that teh sold count wasn't changed
        $this->assertEquals($original_sold, (int)$response_data['DTT_sold']);
    }



    /**
     * @group 9222
     */
    public function test_delete__trashed()
    {
        $this->_authenticate_an_admin();
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'DTT_deleted' => false,
            )
        );
        //double-check the datetime isn't trashed
        $this->assertFalse($datetime->get('DTT_deleted'));
        $req = new \WP_REST_Request(
            'DELETE',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        $this->assertTrue($response_data['DTT_deleted']);
    }



    /**
     * @group 9222
     */
    public function test_delete__permanent()
    {
        $this->_authenticate_an_admin();
        $datetime_count_before_insertion = \EEM_Datetime::instance()->count_deleted_and_undeleted();
        $datetime = $this->new_model_obj_with_dependencies('Datetime');
        $req = new \WP_REST_Request(
            'DELETE',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID()
        );
        $req->set_query_params(
            array(
                'force' => true,
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        $this->assertTrue(isset($response_data['deleted'], $response_data['previous']));
        $this->assertEquals($datetime->ID(), $response_data['previous']['DTT_ID']);
        $this->assertEquals($datetime_count_before_insertion, \EEM_Datetime::instance()->count_deleted_and_undeleted());
    }



    /**
     * Tests that when we delete a non-soft-deletable model object, it has an error
     *
     * @group 9222
     */
    public function test_delete__not_allowed_on_non_soft_delete_model()
    {
        $this->_authenticate_an_admin();
        $payment = $this->new_model_obj_with_dependencies('Payment');
        $payment_count_before_deletion = \EEM_Payment::instance()->count();
        $req = new \WP_REST_Request(
            'DELETE',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/payments/' . $payment->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_trash_not_supported', $response_data['code']);
    }



    /**
     * Tests that when we delete a non-soft-deletable model object permanently, it works as normal
     *
     * @group 9222
     */
    public function test_delete__non_soft_delete_model()
    {
        $this->_authenticate_an_admin();
        $payment = $this->new_model_obj_with_dependencies('Payment');
        $payment_count_before_deletion = \EEM_Payment::instance()->count();
        $req = new \WP_REST_Request(
            'DELETE',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/payments/' . $payment->ID()
        );
        $req->set_query_params(
            array(
                'force' => 'true',
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        $this->assertTrue(isset($response_data['deleted'], $response_data['previous']));
        $this->assertEquals($payment->ID(), $response_data['previous']['PAY_ID']);
        $this->assertEquals($payment_count_before_deletion - 1, \EEM_Payment::instance()->count());
    }



    /**
     * Authenticates an admin with capabilities to use the API
     *
     * @param array $caps
     * @return \WP_User
     */
    protected function _authenticate_an_admin()
    {
        global $current_user;
        //setup our user and set as current user.
        $current_user = $this->factory->user->create_and_get();
        $this->assertInstanceOf('WP_User', $current_user);
        $current_user->add_role('administrator');
        return $current_user;
    }



}
// End of file Write_Test.php
// Location: tests\testcases\core\libraries\rest_api\controllers/Write_Test.php