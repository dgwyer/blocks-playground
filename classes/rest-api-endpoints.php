<?php
/*
 * Register custom REST API endpoints
*/

class WPGO_Custom_Blocks_Playground_Endpoints {

	protected $module_roots;

	/* Main class constructor. */
	public function __construct($module_roots) {

		$this->module_roots = $module_roots;

		add_action( 'rest_api_init', array( &$this, 'register_endpoints' ) );
	}

	/**
	 * Register REST API
	 */
	public function register_endpoints() {

		// get public CPT
		register_rest_route(
			'blocks-playground/v1',
			'/posts',
			array(
				'methods'             => 'GET',
				'callback'            => array( &$this, 'get_posts' ),
				'permission_callback' => function () {
					return ''; //current_user_can( 'edit_posts' );
				},
			)
		);

		// get registered taxonomies for specified post type
		// register_rest_route(
		// 	'simple-sitemap/v1',
		// 	'/post-type-taxonomies/(?P<type>[a-zA-Z0-9-_]+)', // allowed chars [a-z] [A-Z] [0-9] [-_]
		// 	array(
		// 		'methods'             => 'GET',
		// 		'callback'            => array( &$this, 'get_post_type_taxonomies' ),
		// 		'permission_callback' => function () {
		// 			return ''; //current_user_can( 'edit_posts' );
		// 		},
		// 	)
		// );
	}

	/**
	 * Get public post types
	 *
	 */
	public function get_posts() {
	
		$args = array( 'post_type' => 'wpgo_faq', 'posts_per_page' => 250 );
		$posts = get_posts( $args );

		$faq_posts = array();
		foreach( $posts as $post ) {
			$faq_posts[$post->ID] = $post->post_title;
		}

		return $faq_posts;
	}

	/**
	 * Get taxonomies for specific post type
	 *
	 */
	public function get_post_type_taxonomies(WP_REST_Request $request) {
	
		$post_type = $request->get_param( 'type' );
		$post_type_taxonomies = get_object_taxonomies( $post_type );

		// if empty array no taxonomies return empty
		if( empty($post_type_taxonomies) ) {
			return array();
		}
		
		// remove 'post_format' from list of taxonomies
		if (($key = array_search('post_format', $post_type_taxonomies)) !== false) {
			unset($post_type_taxonomies[$key]);
		}

		// format into array
		$taxonomies = array();
		foreach($post_type_taxonomies as $post_type_taxonomy) {
			$tax = get_taxonomy($post_type_taxonomy);
				$taxonomies[$tax->name] = $tax->label;
		}

		return $taxonomies;
	}
	
} /* End class definition */
