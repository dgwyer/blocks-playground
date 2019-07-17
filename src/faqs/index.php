<?php

namespace Gutenberg_Courses\Example_Block\Blocks\FAQs;

add_action( 'plugins_loaded', __NAMESPACE__ . '\register_dynamic_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_dynamic_block() {

	// Hook server side rendering into render callback
	register_block_type( 'blocks-playground/faqs', [
		'render_callback' => __NAMESPACE__ . '\render_dynamic_block',
		'attributes'      => [
			'some_string' => [
					'default' => 'default string',
					'type'    => 'string'
			],
			'some_array'  => [
					'type'  => 'array',
					'items' => [
							'type' => 'string',
					],
				],
				'page_depth' => [
					'type' => 'number',
					'default' => 0
				],
				'faq_posts'  => [
					'type'  => 'string',
					'default' => '[]'
				]
		]
	] );
}

/**
 * Server rendering for /blocks/examples/12-dynamic
 */
function render_dynamic_block() {

	return "<h3>FAQs Block!</h3>";

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

	return "{$markup}</ul>";
}
