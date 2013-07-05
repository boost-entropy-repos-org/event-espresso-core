<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Admin
 *
 * @package			Event Espresso
 * @subpackage	/core/admin/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Admin {

   /**
     * 	EE_Admin Object
     * 	@private _instance
	 * 	@private 	protected
     */
	private static $_instance = NULL;

	/**
	 * 	EE_Registry Object
	 *	@var 	object	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * 	path to main espresso.php file
	 *	@var 	$main_file
	 * 	@access 	public
	 */
	public $main_file;





	/**
	 *@ singleton method used to instantiate class object
	 *@ access public
	 *@ return class instance
	 */	
	public static function instance(  $main_file  ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self(  $main_file  );
		}
		return self::$_instance;
	}


	
   /**
     * class constructor
     */
	protected function __construct(  $main_file  ) {
		$this->main_file = $main_file;
		// admin hooks
		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ), 1 );
		add_filter( 'plugin_action_links', array( $this, 'filter_plugin_actions' ), 10, 2 );
		add_action( 'init', array( $this, 'init' ), 100 );
		add_action( 'admin_init', array( $this, 'admin_init' ), 100 );
		add_action( 'wp_ajax_event_list_save_state', array( $this, 'event_list_save_state_callback' ));
		add_action( 'wp_ajax_event_list_load_state', array( $this, 'event_list_load_state_callback' ));
		add_action( 'action_hook_espresso_help', array( $this, 'help_tab_links' ), 10, 4 );
//		add_action( 'admin_enqueue_scripts', 'espresso_load_scripts_styles' );
		add_action( 'admin_notices', array( $this, 'display_admin_notices' ), 10 );
		add_action( 'admin_bar_menu', array( $this, 'espresso_toolbar_items' ), 100 );
		add_action( 'edit_post', array( $this, 'parse_post_content_on_save' ), 100, 2 );
		add_filter('admin_footer_text', array( $this, 'espresso_admin_footer' ));
	}



	/**
	 * 		plugins_loaded
	 *
	 * 		@access 	public
	 * 		@return 		void
	 */
	public function plugins_loaded() {
		//first define global EE_Admin constants
		$this->_define_all_constants();
		// registry, settings, autoloaders, and other config stuff
		$this->_load_system_files();
		// path to espresso.php
		$this->EE->main_file = $this->main_file;
		// activate
		register_activation_hook( EE_HELPERS . 'EEH_Activation.helper.php', array( 'EEH_Activation', 'plugin_activation' ));
		// pew pew pew
		$this->EE->load_core( 'PUE', TRUE );
	}


	/**
	 * _define_all_constants
	 * define constants that are set globally for all admin pages
	 *
	 * @access private
	 * @return void
	 */
	private function _define_all_constants() {
		define( 'EE_CORE_ADMIN', EE_CORE . 'admin' . DS );
		define( 'EE_CORE_ADMIN_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'includes/core/admin/' );
		define( 'EE_CORE_ADMIN_TEMPLATE', EE_CORE_ADMIN . 'templates' . DS );
		define( 'WP_ADMIN_PATH', ABSPATH . 'wp-admin/' );
		define( 'WP_AJAX_URL', get_bloginfo('url') . '/wp-admin/admin-ajax.php' );
		define( 'JQPLOT_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/' );
	}



	/**
	 * 		_load_system_files
	 *
	 * 		@access 	private
	 * 		@return 		void
	 */
	private function _load_system_files() {
		if ( is_readable( EE_CORE . 'EE_System.core.php' )) {
			require_once( EE_CORE . 'EE_System.core.php' );
			$this->EE = EE_Registry::instance();
		} else {
			wp_die( __( 'An error has occured. The EE_System files could not be loaded.', 'event_espresso' ));
		}
	}


	/**
	 * 	filter_plugin_actions - adds links to the Plugins page listing
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_plugin_actions( $links, $plugin ) {
		// set $main_file in stone
		static $main_file;
		// if $main_file is not set yet
		if ( ! $main_file ) {
			$main_file = plugin_basename( $this->EE->main_file );
		}
		// compare current plugin to this one
		if ( $plugin == $main_file ) {
			$org_settings_link = '<a href="admin.php?page=espresso_general_settings">' . __( 'Settings', 'event_espresso' ) . '</a>';
			$events_link = '<a href="admin.php?page=espresso_events">' . __( 'Events', 'event_espresso' ) . '</a>';
			// add before other links
			array_unshift( $links, $org_settings_link, $events_link );
		}
		return $links;
	}



	/**
	* init- should fire after shortcode, module,  addon, other plugin (default priority), and even EE_Front_Controller's init phases have run
	* 
	* @access public
	* @return void
	*/
	public function init() {
		// check for db changes
		$this->_check_database_tables();
		// bring out the pidgeons!!!
		require_once( EE_CORE . 'messages' . DS . 'EE_messages_init.core.php' );
		EE_messages_init::init();
		// run the admin page factory
		$this->EE_Admin_Page_Loader();
//		espresso_verify_default_pages_exist();

	}



	/**
	* check_database_tables
	* 
	* ensures that the database has been updated to the current version
	* and also ensures that all necessary data migration scripts have been applied
	* in order to bring the content of the database up to snuff as well
	* 
	* @access private
	* @since 3.1.28
	* @return void
	*/
	private function _check_database_tables() {
		if ( is_admin() ) {
			// check if db has been updated, cuz autoupdates don't trigger database install script
			$espresso_db_update = get_option( 'espresso_db_update' );
			// chech that option is an array
			if( ! is_array( $espresso_db_update )) {
				// if option is FALSE, then it never existed
				if ( $espresso_db_update === FALSE ) {
					// make $espresso_db_update an array and save option with autoload OFF
					$espresso_db_update =  array();
					add_option( 'espresso_db_update', $espresso_db_update, '', 'no' );
				} else {
					// option is NOT FALSE but also is NOT an array, so make it an array and save it
					$espresso_db_update =  array( $espresso_db_update );
					update_option( 'espresso_db_update', $espresso_db_update );
				}
			}
			
			// if current EE version is NOT in list of db updates, then update the db
			if ( ! in_array( EVENT_ESPRESSO_VERSION, $espresso_db_update )) {
				require_once( EE_HELPERS . 'EEH_Activation.helper.php' );
				EEH_Activation::create_database_tables();
			}	
			
			// grab list of any existing data migrations from db
			if ( ! $existing_data_migrations = get_option( 'espresso_data_migrations' )) {
				// or initialize as an empty array
				$existing_data_migrations = array();
				// and set WP option
				add_option( 'espresso_data_migrations', array(), '', 'no' );
			}

			// array of all previous data migrations to date
			// using the name of the callback function for the value
			$espresso_data_migrations = array(
			);
			
			// temp array to track scripts we need to run 
			$scripts_to_run = array();
			// for tracking script errors
			$previous_script = '';
			// if we don't need them, don't load them
			$load_data_migration_scripts = FALSE;
			// have we already performed some data migrations ?
			if ( ! empty( $existing_data_migrations )) {	
				// loop through all previous migrations
				foreach ( $existing_data_migrations as $ver => $migrations ) {
					// ensure that migrations is an array, then loop thru it
					$migrations = is_array( $migrations ) ? $migrations : array( $migrations );
					foreach ( $migrations as $migration_func => $errors_array ) {
						// make sure they have been executed
						if ( ! in_array( $migration_func, $espresso_data_migrations )) {		
							// ok NOW load the scripts
							$load_data_migration_scripts = TRUE;
							$scripts_to_run[ $migration_func ] = $migration_func;
						} 
					}
				}		
				
			} else {
				$load_data_migration_scripts = TRUE;
				$scripts_to_run = $espresso_data_migrations;
			}

			if ( $load_data_migration_scripts && ! empty( $scripts_to_run )) {
				require_once( 'includes/functions/data_migration_scripts.php' );		
				// run the appropriate migration script
				foreach( $scripts_to_run as $migration_func ) {
					if ( function_exists( $migration_func )) {
						call_user_func( $migration_func );
					}		
				}
			}
		}
	}




	/**
	 * 		loads and instantiates files and objects for EE admin pages
	 * 		@access private
	 * 		@return void
	 */
	private function EE_Admin_Page_Loader() {
		try {
			//this loads the controller for the admin pages which will setup routing etc
			$this->EE->load_core( 'Admin_Page_Loader' );
		} catch ( EE_Error $e ) {
			$e->get_error();
		}
		
	}



	/**
	* admin_init
	* 
	* @access public
	* @return void
	*/
	public function admin_init() {
//		espresso_verify_default_pages_exist();
	}



	/**
	* event_list_save_state_callback
	* 
	* @access public
	* @return void
	*/
	public function event_list_save_state_callback() {
		check_ajax_referer('event_list_state', 'nonce');
		update_user_meta($_POST['user'], 'event_list_state', $_POST['data']);
		die(); // this is required to return a proper result
	}



	/**
	* event_list_load_state_callback
	* 
	* @access public
	* @return void
	*/
	public function event_list_load_state_callback() {
		check_ajax_referer('event_list_state', 'nonce');
		echo json_encode(get_user_meta($_POST['user'], 'event_list_state', true));
		die(); // this is required to return a proper result
	}



	/**
	* wp_loaded
	* 
	* @access public
	* @return void
	*/
	public function wp_loaded() {
		$this->check_no_ticket_prices_array();
		
	}



	/**
	 * 	check_no_ticket_prices_array
	 *
	 *  @access 	private
	 *  @return 	string
	 */
	private function check_no_ticket_prices_array() {
		$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', FALSE );
		//printr( $espresso_no_ticket_prices, '$espresso_no_ticket_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( $espresso_no_ticket_prices ) {
			$no_ticket_prices_msg = __( '<strong>Warning!</strong> The following events have no ticket prices set for them and will therefore not allow registrations:', 'event_espresso' );
			foreach ( $espresso_no_ticket_prices as $EVT_ID => $event_name ) {
				if ( empty( $EVT_ID )) {
					unset( $espresso_no_ticket_prices[ $EVT_ID ] );
				} else {
					$edit_event_url = EE_Admin_Page::add_query_args_and_nonce( array( 'page'=>'espresso_events', 'action'=>'edit_event', 'EVT_ID'=>$EVT_ID ),  admin_url( 'admin.php?' ));
					$event_name = stripslashes( htmlentities( $event_name, ENT_QUOTES, 'UTF-8' ));
					$no_ticket_prices_msg .= '<br/><a href="' . $edit_event_url . '" title="' . sprintf( __( 'Edit Event: %s', 'event_espresso' ), $event_name ) .'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>';
				}
			}
			$no_ticket_prices_msg .= '<br/>' . __( 'click on the event name to go to the event editor and correct this issue.', 'event_espresso' );
			EE_Error::add_error( $no_ticket_prices_msg, __FILE__, __FUNCTION__, __LINE__ );
			add_action( 'admin_notices', 'display_admin_notice' );
			update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
		}
	}



	/**
	 * 	display_admin_notices
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function display_admin_notices() {
		echo EE_Error::get_notices();
	}





	/**
	 * 	help_tab_links
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function help_tab_links( $help_tab = FALSE, $action = FALSE, $page = FALSE, $help_text = '' ) {
		
		if ( ! $page ) {
			$page = isset( $_REQUEST['page'] ) && ! empty( $_REQUEST['page'] ) ? sanitize_key( $_REQUEST['page'] ) : $page;
		}
		
		if ( ! $action ) {
			$action = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) : $action;
		}

		if ( ! $help_tab ) {
			$help_tab = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) . '_help_tab' : $help_tab;
		}
		
	//	echo '<h4>$page : ' . $page . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	//	echo '<h4>$action : ' . $action . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	//	echo '<h4>$help_tab : ' . $help_tab . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		
		$help_tab_lnk = $page . '-' . $action . '-' . $help_tab;
		$icon_style = empty( $help_text ) ? ' help_img' : '';
		$help_text = ! empty( $help_text ) ? $help_text : 'click for help';
	//	$help_icon_img = $custom_image ? $custom_image : '<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/subtle_help.png" width="16" height="16" alt="help" />';
		
		echo '
		<a id="' . $help_tab_lnk . '" class="espresso-help-tab-lnk' . $icon_style . '" title="click to open the \'Help\' tab for more information about this feature" > ' . $help_text . ' </a>';
	}



	/**
	 * 	espresso_toolbar_items
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function espresso_toolbar_items($admin_bar) {

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$menu_class = 'espresso_menu_item_class';

		//Top Level
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar',
				'title' => '<span class="ab-icon-espresso"></span><span class="ab-label">' . _x('Event Espresso', 'admin bar menu group label') . '</span>',
				'href' => EVENTS_ADMIN_URL,
				'meta' => array(
						'title' => __('Event Espresso'),
						'class' => $menu_class . 'first'
				),
		));

		//Events
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events',
				'parent' => 'espresso-toolbar',
				'title' => 'Events',
				'href' => EVENTS_ADMIN_URL,
				'meta' => array(
						'title' => __('Events'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events Add New
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-new',
				'parent' => 'espresso-toolbar-events',
				'title' => 'Add New',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'add_event' ), EVENTS_ADMIN_URL ),
				'meta' => array(
						'title' => __('Add New'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-view',
				'parent' => 'espresso-toolbar-events',
				'title' => 'View',
				'href' => EVENTS_ADMIN_URL,
				'meta' => array(
						'title' => __('View'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View All
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-all',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'All',
				'href' => EVENTS_ADMIN_URL,
				'meta' => array(
						'title' => __('All'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View Today
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-today',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'Today',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today' ), EVENTS_ADMIN_URL ),
				'meta' => array(
						'title' => __('Today'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View This Month
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-month',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'This Month',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month' ), EVENTS_ADMIN_URL ),
				'meta' => array(
						'title' => __('This Month'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations',
				'parent' => 'espresso-toolbar',
				'title' => 'Registrations',
				'href' => REG_ADMIN_URL,
				'meta' => array(
						'title' => __('Registrations'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today',
				'parent' => 'espresso-toolbar-registrations',
				'title' => 'Today',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Today'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Completed
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-approved',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Approved',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RAP' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Pending
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-pending',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Pending',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RPN' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Pending'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Incomplete
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-not-approved',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Not Approved',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RNA' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Not Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Incomplete
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-cancelled',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Cancelled',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RCN' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Cancelled'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month',
				'parent' => 'espresso-toolbar-registrations',
				'title' => 'This Month',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('This Month'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Approved
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-approved',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Approved',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RAP' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Pending
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-pending',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Pending',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RPN' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Pending'),
						'target' => '',
						'class' => $menu_class
				),
		));
		
		//Registration Overview This Month Not Approved
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-not-approved',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Not Approved',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RNA' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Not Approved', 'event_espresso' ),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Cancelled
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-cancelled',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Cancelled',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RCN' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Cancelled'),
						'target' => '',
						'class' => $menu_class
				),
		));
	}


	/**
	 * 	parse_post_content_on_insert
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function parse_post_content_on_save( $post_ID, $post ) {
		// default post types
		$post_types = array( 'post' => 0, 'page' => 1 );
		// add CPTs
		$CPTs = EE_Register_CPTs::get_CPTs();
		$post_types = array_merge( $post_types, $CPTs );
//		printr( $post_types, '$post_types  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// for default or CPT posts...
		if ( isset( $post_types[ $post->post_type ] )) {
//			echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
			// post on frontpage ?
			$show_on_front = get_option('show_on_front');
			$update_post_shortcodes = FALSE;
			$this->EE->CFG->post_shortcodes = isset( $this->EE->CFG->post_shortcodes ) ? $this->EE->CFG->post_shortcodes : array();
			// loop thru shortcodes
			foreach ( $this->EE->shortcodes as $EES_Shortcode => $shortcode_dir ) {
				// strip class prefix and convert to UPPERCASE
				$shortcode = strtoupper( $EES_Shortcode );
				//$shortcode = strtoupper( str_replace( 'EES_', '', $EES_Shortcode ));
				// is the shortcode in the post_content ?
				if ( strpos( $post->post_content, $shortcode ) !== FALSE ) {
					// map shortcode to post
					$this->EE->CFG->post_shortcodes[ $post->post_name ][ $EES_Shortcode ] = $post_ID;
					// and to frontpage in case it's displaying latest posts
					$this->EE->CFG->post_shortcodes[ $show_on_front ][ $EES_Shortcode ] = $post_ID;
					$update_post_shortcodes = TRUE;
				} 
			}
			//printr( $this->EE->CFG->post_shortcodes, '$this->EE->CFG->post_shortcodes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			
			if ( $update_post_shortcodes ) {
				$this->EE->CFG->update_post_shortcodes();
			}			
		}
		
	}



	/**
	 * 	espresso_admin_footer
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function espresso_admin_footer() {
		return sprintf( 
			__( 'Event Registration and Ticketing Powered by %sEvent Registration Powered by Event Espresso%s', 'event_espresso' ),
			'<a href="http://eventespresso.com/" title="',
			'">' . EVENT_ESPRESSO_POWERED_BY . '</a>'
		);
	}





}
// End of file EE_Admin.core.php
// Location: /core/admin/EE_Admin.core.php