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
				'type'    => 'string',
				'default' => 'default string'
			],
			'some_array'  => [
				'type'  => 'array',
				'items' => [
						'type' => 'string'
				],
				'default' => [
					"5px", // padding
					"3px" // margin
				]	
			],
			'page_depth' => [
					'type' => 'number',
					'default' => 0
			],
			'q_padding' => [
				'type'    => 'string',
				'default' => '0'
			],
			'faq_styles' => [
				'type'    => 'object',
				'default' => '0'
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
		'q_padding' => '0',
		'some_array' => []

		// following attributes don't have block support yet

		// attributes below are only relevant to sitemap block			
		//'gutenberg_block' => false,
		//'block_post_types' => '',
	), $attr );
	
	//$args['page_depth'] = tag_escape( $args['container_tag'] );
	$args['q_padding'] = esc_attr( $args['q_padding'] );
	$args['some_array'] = json_encode($args['some_array']); // convert PHP attribute to JS array

	// Start output buffering (so that existing content in the [simple-sitemap] post doesn't get shoved to the bottom of the post
	ob_start();

	// ******************
	// ** OUTPUT START **
	// ******************

	$faqJS = <<<JS
	<script>
		var ffaq_{$args['id']} = {
			page_depth: {$args['page_depth']},
			q_padding: '{$args['q_padding']}',
			some_array: {$args['some_array']}
		};
		console.log('Hello there!', ffaq_{$args['id']});
		console.log( 'ARRSTR: ', {$args['some_array']} );
	</script>
	JS;
	$faqJS = trim(preg_replace('/\s+/', ' ', $faqJS));

	echo "<h3 id='ffaq-heading' data-id='" . $args['page_depth'] . "'>FAQs Block!</h3>\n";
	echo "<div id='ffaq_" . $args['id'] . "' class='ffaq-container'>\n" . $faqJS . "\n</div>";

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
