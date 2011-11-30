<?php

class Event {

	private $id;
	private $members_only;
	private $event_code;
	private $event_name;
	private $event_desc;
	private $display_desc;
	private $display_reg_form;
	private $event_identifier;
	private $start_date;
	private $end_date;
	private $registration_start;
	private $registration_end;
	private $registration_startT;
	private $registration_endT;
	private $visible_on;
	private $address;
	private $address2;
	private $city;
	private $state;
	private $zip;
	private $phone;
	private $venue_title;
	private $venue_url;
	private $venue_image;
	private $venue_phone;
	private $virtual_url;
	private $virtual_phone;
	private $reg_limit;
	private $allow_multiple;
	private $additional_limit;
	private $send_mail;
	private $is_active;
	private $event_status;
	private $conf_mail;
	private $use_coupon_code;
	private $use_groupon_code;
	private $category_id;
	private $coupon_id;
	private $tax_percentage;
	private $tax_mode;
	private $member_only;
	private $post_id;
	private $post_type;
	private $country;
	private $externalURL;
	private $early_disc;
	private $early_disc_date;
	private $early_disc_percentage;
	private $question_groups;
	private $item_groups;
	private $event_type;
	private $allow_overflow;
	private $overflow_event_id;
	private $recurrence_id;
	private $email_id;
	private $alt_email;
	private $event_meta;
	private $wp_user;
	private $require_pre_approval;
	private $timezone_string;
	private $likes;
	private $submitted;
	private $ticket_id;
	private $certificate_id;
	private $status;
	private $timeslots;
	private $active_state;
	private $categories;
	private $registration_url;
	private $location;
	private $contact;
	private $twitter;
	private $venue_desc;
	private $enable_for_maps;
	private $gmap_static;
	private $prices;

	private function set_prices() {
		$sql = "SELECT * FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $this->id . "'";
		global $wpdb;
		$prices = $wpdb->get_results($sql, ARRAY_A);
		foreach ($prices as $price) {
			$this->prices[] = array(
					'price_type' => $price['price_type'],
					'event_cost' => $price['event_cost'],
					'surcharge' => $price['surcharge'],
					'surcharge_type' => $price['surcharge_type'],
					'member_price_type' => $price['member_price_type'],
					'member_price' => $price['member_price'],
					'max_qty' => $price['max_qty'],
					'max_qty_members' => $price['max_qty_members']
			);
		}
	}

	private function set_location() {
		if (!isset($this->address))
			$this->set_event_details();
		$location = $this->address != '' ? $this->address : '';
		$location .= $this->address2 != '' ? '<br />' . $this->address2 : '';
		$location .= $this->city != '' ? '<br />' . $this->city : '';
		$location .= $this->state != '' ? ', ' . $this->state : '';
		$location .= $this->zip != '' ? '<br />' . $this->zip : '';
		$location .= $this->country != '' ? '<br />' . $this->country : '';
		$this->location = $location;
	}

	private function set_registration_url() {
		if (!isset($this->externalURL)) {
			$this->set_event_details();
		}
		if ($this->externalURL != '') {
			$this->registration_url = $this->externalURL;
		} else {
			global $org_options;
			$this->registration_url = add_query_arg('ee', $this->id, get_permalink($org_options['event_page_id']));
		}
	}

	protected function set_event_details() {
		$sql = "SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $this->id . "'";
		global $wpdb, $org_options;
		$vars = $wpdb->get_row($sql, ARRAY_A);
		foreach ($vars as $key => $value) {
			$this->$key = $value;
		}
		if (isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y') {
			$sql = "SELECT ev.* FROM " . EVENTS_VENUE_TABLE . " ev ";
			$sql .= "JOIN " . EVENTS_VENUE_REL_TABLE . " evr ON evr.venue_id = ev.id ";
			$sql .= "WHERE evr.event_id = '" . $this->id . "'";
			$vars = $wpdb->get_row($sql, ARRAY_A);
			$this->venue_title = $vars['name'];
			$this->address = $vars['address'];
			$this->address2 = $vars['address2'];
			$this->city = $vars['city'];
			$this->state = $vars['state'];
			$this->zip = $vars['zip'];
			$this->country = $vars['country'];
			$venue_meta = unserialize($vars['meta']);
			$this->contact = $venue_meta['contact'];
			$this->phone = $venue_meta['phone'];
			$this->venue_phone = $venue_meta['phone'];
			$this->twitter = $venue_meta['twitter'];
			$this->venue_image = $venue_meta['image'];
			$this->venue_url = $venue_meta['website'];
			$this->venue_desc = $venue_meta['description'];
			$this->enable_for_maps = $venue_meta['enable_for_maps'];
			$this->gmap_static = $venue_meta['gmap_static'];
		}
	}

	protected function set_categories() {
		$sql = "SELECT ec.* FROM " . EVENTS_CATEGORY_TABLE . " ec ";
		$sql .= "JOIN " . EVENTS_CATEGORY_REL_TABLE . " ecr ON ecr.cat_id=ec.id ";
		$sql .= "WHERE ecr.event_id = '" . $this->id . "'";
		global $wpdb;
		$vars = $wpdb->get_results($sql, ARRAY_A);
		if (empty($vars)) {
			$this->categories[] = array(
					'category_name' => '',
					'category_identifier' => '',
					'category_desc' => '',
					'display_desc' => '',
					'wp_user' => ''
			);
		} else {
			foreach ($vars as $var) {
				$this->categories[] = array(
						'category_name' => $var['category_name'],
						'category_identifier' => $var['category_identifier'],
						'category_desc' => $var['category_desc'],
						'display_desc' => $var['display_desc'],
						'wp_user' => $var['wp_user']
				);
			}
		}
	}

	protected function set_timeslots() {
		$sql = "SELECT * FROM " . EVENTS_START_END_TABLE . " WHERE event_id = '" . $this->id . "'";
		global $wpdb;
		$vars = $wpdb->get_results($sql, ARRAY_A);
		if (empty($vars)) {
			$this->timeslots[] = array('start_time' => '',
					'end_time' => '',
					'reg_limit' => ''
			);
		} else {
			foreach ($vars as $var) {
				$this->timeslots[] = array(
						'start_time' => $var['start_time'],
						'end_time' => $var['end_time'],
						'reg_limit' => $var['reg_limit']
				);
			}
		}
	}

	protected function set_status() {
		if (!isset($this->start_date))
			$this->set_event_details();
		if (!isset($this->timeslots))
			$this->set_timeslots();
		$timestamp = strtotime($this->start_date . ' ' . $this->timeslots[0]['start_time']);
		$registration_start_timestamp = strtotime($this->registration_start);
		$registration_end_timestamp = strtotime($this->registration_end);
		if ($this->is_active == "Y" && $this->event_status == "O") {
			$this->status = array('status' => 'ONGOING', 'display' => '<span style="color: #090; font-weight:bold;">' . __('ONGOING', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_ongoing">' . __('Ongoing', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && $this->event_status == "S") {
			$this->status = array('status' => 'SECONDARY', 'display' => '<span style="color: #090; font-weight:bold;">' . __('WAITLIST', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_secondary">' . __('Waitlist', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && $this->event_status == "R") {
			$this->status = array('status' => 'DRAFT', 'display' => '<span style="color: #ff8400; font-weight:bold;">' . __('DRAFT', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_draft">' . __('Draft', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && $this->event_status == "P") {
			$this->status = array('status' => 'PENDING', 'display' => '<span style="color: #ff8400; font-weight:bold;">' . __('PENDING', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_pending">' . __('Pending', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && $this->event_status == "X") {
			$this->status = array('status' => 'DENIED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('DENIED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_denied">' . __('Denied', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($registration_end_timestamp) <= date(time()) && $this->event_status != "D") {
			$this->status = array('status' => 'REGISTRATION_CLOSED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('CLOSED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_closed">' . __('Closed', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($registration_start_timestamp) >= date(time()) && $this->event_status != "D") {
			$this->status = array('status' => 'REGISTRATION_NOT_OPEN', 'display' => '<span style="color: #090; font-weight:bold;">' . __('NOT_OPEN', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_not_open">' . __('Not Open', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($registration_start_timestamp) <= date(time()) && $this->event_status != "D") {
			$this->status = array('status' => 'REGISTRATION_OPEN', 'display' => '<span style="color: #090; font-weight:bold;">' . __('OPEN', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_open">' . __('Open', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($timestamp) <= date(time()) && $this->event_status != "D") {
			$this->status = array('status' => 'EXPIRED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('EXPIRED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_expired">' . __('Expired', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "Y" && date($timestamp) >= date(time()) && $this->event_status != "D") {
			$this->status = array('status' => 'ACTIVE', 'display' => '<span style="color: #090; font-weight:bold;">' . __('ACTIVE', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_active">' . __('Active', 'event_espresso') . '</span>');
		} elseif ($this->is_active == "N" && $this->event_status != "D") {
			$this->status = array('status' => 'NOT_ACTIVE', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('NOT_ACTIVE', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_not_active">' . __('Not Active', 'event_espresso') . '</span>');
		} elseif ($this->event_status == "D") {
			$this->status = array('status' => 'DELETED', 'display' => '<span style="color: #000; font-weight:bold;">' . __('DELETED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_deleted">' . __('Deleted', 'event_espresso') . '</span>');
		}
	}

	protected function set_active_state() {
		if (!isset($this->status))
			$this->set_status();
		switch ($this->status['status']) {
			case 'EXPIRED':
			case 'NOT_ACTIVE':
			case 'DELETED':
			case 'REGISTRATION_CLOSED':
			case 'DENIED':
				//case 'REGISTRATION_NOT_OPEN':
				$this->active_state = 'NOT_ACTIVE';
				break;

			case 'PENDING':
			case 'DRAFT':
				$this->active_state = 'PENDING';
				break;

			case 'ACTIVE':
			case 'ONGOING':
			case 'SECONDARY':
			case 'REGISTRATION_OPEN':
				$this->active_state = 'ACTIVE';
				break;

			default:
				break;
		}
	}

	public function Event($id) {
		$this->id = $id;
	}

	public function get_id() {
		return $this->id;
	}

	public function is_member_only() {
		if (!isset($this->member_only))
			$this->set_event_details();
		return $this->member_only;
	}

	public function get_status() {
		if (!isset($this->status))
			$this->set_status();
		return $this->status;
	}

	public function get_active_state() {
		if (!isset($this->active_state))
			$this->set_active_state();
		return $this->active_state;
	}

	public function get_categories() {
		if (!isset($this->categories))
			$this->set_categories();
		return $this->categories;
	}

	public function get_event_name() {
		if (!isset($this->event_name))
			$this->set_event_details();
		return $this->event_name;
	}

	public function get_registration_url() {
		if (!isset($this->registration_url))
			$this->set_registration_url();
		return $this->registration_url;
	}

	public function get_location() {
		if (!isset($this->location))
			$this->set_location();
		return $this->location;
	}

	public function get_prices() {
		if (!isset($this->prices))
			$this->set_prices();
		return $this->prices;
	}

}

?>
