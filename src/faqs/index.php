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
							'type' => 'string'
					],
					'default' => []
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
function render_dynamic_block($attr) {

	/* Get attributes from the shortcode. */
	$args = shortcode_atts( array(
		'id' => uniqid(), // unique identifier to avoid conflicts if using multiple faqs on the same page. e.g. 5d026c6168954
		'page_depth' => 0,

		// following attributes don't have block support yet

		// attributes below are only relevant to sitemap block			
		//'gutenberg_block' => false,
		//'block_post_types' => '',
	), $attr );
	
	//$args['page_depth'] = tag_escape( $args['container_tag'] );

	// Start output buffering (so that existing content in the [simple-sitemap] post doesn't get shoved to the bottom of the post
	ob_start();

	// ******************
	// ** OUTPUT START **
	// ******************

	$faqJS = <<<JS
	<script>
		var ffaq_{$args['id']} = {
			page_depth: {$args['page_depth']}
		};
		console.log('Hello there!', faq_{$args['id']});  
	</script>
	JS;

	echo "<div id='ffaq_" . $args['id'] . "' class='ffaq-container'>";
	echo "<h3 id='ffaq-heading' data-id='" . $args['page_depth'] . "'>FAQs Block!</h3>";
	echo $faqJS;
	echo "</div>";

	echo "<pre>";
	print_r($attr);
	print_r($args);
	echo "</pre>";

	// ****************
	// ** OUTPUT END **
	// ****************

	$faqs = ob_get_contents();
	ob_end_clean();

	return $faqs;
			
	

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
