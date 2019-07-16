<?php

namespace Adv_Gutenberg_Courses\Example_Blocks;

// Add custom block category
add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		[
			[
				'slug' => 'blocks-playground',
				'title' => __( 'Blocks Playground', 'blocks-playground' ),
			],
		]
	);
}, 10, 2 );