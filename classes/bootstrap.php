<?php
/*
 *	Bootstrap plugin
*/

class WPGO_Blocks_Playground_BootStrap {

	protected $module_roots;

	/* Main class constructor. */
	public function __construct($module_roots) {

		$this->module_roots = $module_roots;
		$this->load_supported_features();
	}

	/* Load plugin features. */
	public function load_supported_features() {

		$root = $this->module_roots['dir'];

 		// Test CPTs needed for blocks
		require_once( $root . 'classes/cpt.php' );
		new WPGO_Blocks_Playground_CPT($this->module_roots);

		// register endpoints
		require_once( $root . 'classes/rest-api-endpoints.php' );
		new WPGO_Custom_Blocks_Playground_Endpoints($this->module_roots);
		
 		// bootstrap block PHP
		require_once( $root . 'src/__index.php' );
		new WPGO_Blocks_Playground_BootStrap_PHP($this->module_roots);

    // Bootstrap block PHP
    require_once $root . 'classes/block-filters.php';

    // Enqueue JS and CSS
    require_once $root . 'classes/register-scripts.php';

    // Register block categories
    require_once $root . 'classes/block-categories.php';

    // Setup Global Block Setting Options Setting
    require_once $root . 'classes/wp-options.php';

    // Register REST API Endpoint
    require_once $root . 'classes/rest-api-endpoint.php';

    // Register blocks server side
    require_once $root . 'classes/register-blocks.php';

    // Register any PHP block filters
    require_once $root . 'classes/block-filters.php';

		// // enqueue plugin scripts
		// require_once( $root . 'modules/classes/enqueue-scripts.php' );
		// new WPGO_Simple_Sitemap_Enqueue_Scripts($this->module_roots);

		// // plugin docs/settings page
		// require_once( $root . 'modules/classes/settings.php' );
		// new WPGO_Simple_Sitemap_Settings($this->module_roots);
	
		// // sitemap shortcodes
		// require_once( $root . 'modules/classes/shortcodes/shortcodes.php' );
		// new WPGO_Simple_Sitemap_Shortcodes($this->module_roots);

		// // localize plugin
		// require_once( $root . 'shared/localize.php' );
		// new WPGO_Simple_Sitemap_Localize($this->module_roots);

		// // links on the main plugin index page
		// require_once( $root . 'shared/links.php' );
		// new WPGO_Simple_Sitemap_Links($this->module_roots);
		
		// // register endpoints
		// require_once( $root . 'shared/rest-api-endpoints.php' );
		// new WPGO_Custom_Sitemap_Endpoints($this->module_roots);
		
		// // plugin hooks
		// require_once( $root . 'shared/hooks.php' );

		// // walker class to render hierarchical pages
		// require_once( $root . 'shared/class-wpgo-walker-page.php' );
	}

} /* End class definition */