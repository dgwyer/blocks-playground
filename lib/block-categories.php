<?php

namespace Adv_Gutenberg_Courses\Example_Blocks;


add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		[
			[
                'slug' => 'blocks-playground',
                'icon' => 'wordpress-alt',
				'title' => __( 'JS for WP - Advanced Blocks', 'blocks-playground' ),
			],
		],
		[
			[
                'slug' => 'recommended',
                'icon' => 'star-filled',
				'title' => __( 'Recommended Blocks', 'blocks-playground' ),
			],
		]
	);
}, 10, 2 );