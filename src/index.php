<?php
// Bootstrap and register blocks via PHP

class WPGO_Blocks_Playground_BootStrap_PHP {

	protected $module_roots;

	/* Main class constructor. */
	public function __construct($module_roots) {

		$this->module_roots = $module_roots;
		$this->bootstrap_php();
	}

	public function bootstrap_php() {

		$root = $this->module_roots['dir'];

    // Bootstrap blocks PHP
    require_once $root . 'src/dynamic/index.php';
    require_once $root . 'src/shortcode/index.php';

    // // Enqueue JS and CSS
    // require_once $root . '/classes/register-scripts.php';

    // // Register block categories
    // require_once $root . '/classes/block-categories.php';

    // // Setup Global Block Setting Options Setting
    // require_once $root . '/classes/wp-options.php';

    // // Register REST API Endpoint
    // require_once $root . '/classes/rest-api-endpoint.php';

    // // Register blocks server side
    // require_once $root . '/classes/register-blocks.php';

    // // Register any PHP block filters
    // require_once $root . '/classes/block-filters.php';

	}

} /* End class definition */