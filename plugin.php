<?php
/*
 * Plugin Name: Blocks Playground
 * Plugin URI:  https://wpgoplugins.com/
 * Description: A small collection of experimental blocks.
 * Version:     1.0.0
 * Author:      David Gwyer
 * Author URI:  https://twitter.com/dgwyer
 * Text Domain: blocks-playground
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;

// @todo delete these when dependencies have been deleted
function _get_plugin_directory() {
	return __DIR__;
}
function _get_plugin_url() {
	static $plugin_url;
	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}
	return $plugin_url;
}

class WPGO_Blocks_Playground {
	
	protected $module_roots;

	/* Main class constructor. */
	public function __construct($module_roots) {

		$this->module_roots = $module_roots;
		$this->bootstrap();
	}

	/* Bootstrap plugin. */
	public function bootstrap() {

		$root = $this->module_roots['dir'];
		$path = $root . 'classes/bootstrap.php';

		// if ( ss_fs()->is__premium_only() ) {
		// 	$tmp = $root . 'modules/classes/bootstrap.php';
		// 	if ( file_exists( $tmp ) ) {
		// 			$path = $tmp;
		// 	}
		// }

		require_once $path;
		new WPGO_Blocks_Playground_BootStrap( $this->module_roots );
	}

} /* End class definition */

$module_roots = array(
	'dir' => plugin_dir_path( __FILE__ ),
	'pdir' => plugin_dir_url( __FILE__ ),
	'uri' => plugins_url( '', __FILE__ ),
	'file' => __FILE__
);
new WPGO_Blocks_Playground( $module_roots );