<?php

class WPGO_Blocks_Playground__Dynamic {

	protected $module_roots;

	/* Main class constructor. */
	public function __construct($module_roots) {

		$this->module_roots = $module_roots;
		add_action( 'plugins_loaded', array( &$this, 'register_dynamic_block') );
	}

	/**
	 * Register the dynamic block.
	 */
	public function register_dynamic_block() {

		// Hook server side rendering into render callback
		register_block_type( 'blocks-playground/dynamic', [
			'render_callback' => array( &$this, 'render_dynamic_block' )
		] );
	}

	/**
	 * Server rendering for /blocks/examples/12-dynamic
	 */
	public function render_dynamic_block() {
		$recent_posts = wp_get_recent_posts( [
			'numberposts' => 3,
			'post_status' => 'publish',
		] );

		if ( empty( $recent_posts ) ) {
			return '<p>No posts</p>';
		}

		$markup = '<ul>';

		foreach ( $recent_posts as $post ) {
			$post_id  = $post['ID'];
			$markup  .= sprintf(
				'<li><a href="%1$s">%2$s</a></li>',
				esc_url( get_permalink( $post_id ) ),
				esc_html( get_the_title( $post_id ) )
			);
		}

		return "{$markup}<ul>";
	}

} /* End class definition */