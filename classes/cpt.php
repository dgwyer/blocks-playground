<?php

/**
 * FAQ custom post type.
 *
 * This class registers the faq post type and the taxonomy for faq topics.
 *
 * Class name suffix _CPT stands for [C]ustom_[P]ost_[T]ype.
 */
class WPGO_Blocks_Playground_CPT {

	protected $module_roots;

	/**
	 * FAQ class constructor.
	 *
	 * Contains hooks that point to class methods to initialise the custom post type etc.
	 *
	 * @since 0.1.0
	 */
	public function __construct($module_roots) {

		$this->module_roots = $module_roots;

		/* Register CPT and associated taxonomy. */
		add_action( 'init', array( &$this, 'register_post_type' ) );
		add_action( 'init', array( &$this, 'register_taxonomy' ) );

		/* Customize CPT columns on overview page. */
		add_filter( 'manage_wpgo_faq_posts_columns', array( &$this, 'change_overview_columns' ) ); /* Which columns are displayed. */
		add_filter( 'manage_edit-wpgo_faq_sortable_columns', array( &$this, 'sort_custom_columns' ) ); /* Specify which columns are sortable. */

		/* Customize the CPT messages. */
		add_filter( 'post_updated_messages', array( &$this, 'update_cpt_messages' ) );
		add_filter( 'enter_title_here', array( &$this, 'title_placeholder' ) );

		// Add an ID column to FAQ topic admin page
		add_action( "manage_edit-wpgo_faq_topic_columns", array( &$this, 'add_id_column' ) );
		add_filter( "manage_edit-wpgo_faq_topic_sortable_columns", array( &$this, 'add_id_column' ) );
		add_filter( "manage_wpgo_faq_topic_custom_column", array( &$this, 'show_id_column' ), 10, 3 );
		add_action( 'admin_print_styles-edit-tags.php', array( &$this, 'style_id_column' ) );
	}

	public function add_id_column( $columns ) {
		return $columns + array ( 'tax_id' => 'ID' );
	}

	public function style_id_column() {
		echo "<style>#tax_id{width:4em}</style>";
	}

	public function show_id_column( $v, $name, $id ) {
		return 'tax_id' === $name ? $id : $v;
	}

	/**
	 * Register FAQ post type.
	 *
	 * @since 0.1.0
	 */
	public function register_post_type() {

		/* Post type arguments. */
		$args = array(
			'public'              => true,
			'has_archive'         => 'faqs',
			'exclude_from_search' => false, // @todo Setting this to true will break the pagination for the wpgo_faq_topic custom taxonomy. See: http://core.trac.wordpress.org/ticket/17592
			'query_var'           => true,
			'rewrite'             => array( 'slug' => 'faq' ),
			'capability_type'     => 'page',
			'publicly_queryable'  => false,
			'hierarchical'        => false,
			'menu_icon'           => 'dashicons-editor-help',
			'supports'            => array(
				'editor',
				'author',
				//'thumbnail',
				'title',
				//'revisions'
				//'comments',
				//'excerpt'
			),
			'labels'              => array(
				'name'               => __( 'FAQ CPT (test)', 'wpgo-flexible-faqs' ),
				'all_items'          => __( 'All FAQs', 'wpgo-flexible-faqs' ),
				'singular_name'      => __( 'FAQ', 'wpgo-flexible-faqs' ),
				'add_new'            => __( 'Add New', 'wpgo-flexible-faqs' ),
				'add_new_item'       => __( 'Add New FAQ', 'wpgo-flexible-faqs' ),
				'edit_item'          => __( 'Edit FAQ', 'wpgo-flexible-faqs' ),
				'new_item'           => __( 'New FAQ', 'wpgo-flexible-faqs' ),
				'view_item'          => __( 'View FAQ', 'wpgo-flexible-faqs' ),
				'search_items'       => __( 'Search FAQs', 'wpgo-flexible-faqs' ),
				'not_found'          => __( 'No FAQs Found. Now\'s a good time to create you\'re first one!', 'wpgo-flexible-faqs' ),
				'not_found_in_trash' => __( 'No FAQs Found In Trash', 'wpgo-flexible-faqs' ),
				'attributes'         => __( 'FAQ Attributes', 'wpgo-flexible-faqs' ),
			)
		);

		/* Register post type. */
		register_post_type( 'wpgo_faq', $args );
	}

	/**
	 * Register FAQ taxonomy.
	 *
	 * @since 0.1.0
	 */
	public function register_taxonomy() {

		/* FAQ taxonomy arguments. */
		$args = array(
			'hierarchical'  => true,
			'query_var'     => true,
			'show_tagcloud' => false,
			'sort'          => true,
			'rewrite'       => array( 'slug' => 'faqs' ),
			'labels'        => array(
				'name'              => __( 'FAQ Topics', 'wpgo-flexible-faqs' ),
				'singular_name'     => __( 'FAQ Topic', 'wpgo-flexible-faqs' ),
				'edit_item'         => __( 'Edit FAQ Topic', 'wpgo-flexible-faqs' ),
				'update_item'       => __( 'Update FAQ', 'wpgo-flexible-faqs' ),
				'add_new_item'      => __( 'Add New Topic', 'wpgo-flexible-faqs' ),
				'new_item_name'     => __( 'New FAQ Name', 'wpgo-flexible-faqs' ),
				'all_items'         => __( 'All FAQs', 'wpgo-flexible-faqs' ),
				'search_items'      => __( 'Search FAQs', 'wpgo-flexible-faqs' ),
				'parent_item'       => __( 'Parent Genre', 'wpgo-flexible-faqs' ),
				'parent_item_colon' => __( 'Parent Genre:', 'wpgo-flexible-faqs' ),
				'not_found' => __( 'No FAQ topics found. Now\'s a good time to create you\'re first one!', 'wpgo-flexible-faqs' ),
			)
		);

		/* Register the faq taxonomy. */
		register_taxonomy( 'wpgo_faq_topic', array( 'wpgo_faq' ), $args );
	}

	/**
	 * Change the column labels on the custom post types overview page.
	 *
	 * @since 0.1.0
	 */
	public function change_overview_columns( $cols ) {

		$cols = array(
			'cb'            => '<input type="checkbox">',
			'title'         => __( 'Title', 'wpgo-flexible-faqs' ),
			'faq-number'    => __( 'FAQs', 'wpgo-flexible-faqs' ),
			'faq-author'    => __( 'Author', 'wpgo-flexible-faqs' ),
			//'company'       => __( 'Company', 'wpgo-flexible-faqs' ),
			'image'         => __( 'Image', 'wpgo-flexible-faqs' ),
			'topic'         => __( 'FAQ Topic', 'wpgo-flexible-faqs' ),
			'id'            => __( 'ID', 'wpgo-flexible-faqs' ),
			'date'          => __( 'Date', 'wpgo-flexible-faqs' )
		);

		return $cols;
	}

	/**
	 * Make custom columns sortable.
	 *
	 * @since 0.1.0
	 */
	function sort_custom_columns() {

		return array(
			'title'   => 'title',
            'faq-author' => 'faq-author',
			'company' => 'company',
			'date'    => 'date',
			'id'      => 'id'
		);
	}

	/**
	 * Save the custom post type meta box input field settings.
	 *
	 * @since 0.1.0
	 */
	public function update_cpt_messages( $messages ) {
		global $post, $post_ID;

		$messages['wpgo_faq'] = array(
			0  => '', // Unused. Messages start at index 1.
			1  => sprintf( __( 'FAQ updated.', 'wpgo-flexible-faqs' ), esc_url( get_permalink( $post_ID ) ) ),
			2  => __( 'Custom field updated.', 'wpgo-flexible-faqs' ),
			3  => __( 'Custom field deleted.', 'wpgo-flexible-faqs' ),
			4  => __( 'FAQ updated.', 'wpgo-flexible-faqs' ),
			/* translators: %s: date and time of the revision */
			5  => isset( $_GET['revision'] ) ? sprintf( __( 'FAQ restored to revision from %s', 'wpgo-flexible-faqs' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
			6  => sprintf( __( 'FAQ published.', 'wpgo-flexible-faqs' ), esc_url( get_permalink( $post_ID ) ) ),
			7  => __( 'FAQ saved.', 'wpgo-flexible-faqs' ),
			8  => sprintf( __( 'FAQ submitted.', 'wpgo-flexible-faqs' ), esc_url( add_query_arg( 'preview', 'true', get_permalink( $post_ID ) ) ) ),
			9  => sprintf( __( 'FAQ scheduled for: %1$s.', 'wpgo-flexible-faqs' ),
				// translators: Publish box date format, see http://php.net/date
				'<strong>' . date_i18n( __( 'M j, Y @ G:i', 'wpgo-flexible-faqs' ), strtotime( $post->post_date ) ) . '</strong>', esc_url( get_permalink( $post_ID ) ) ),
			10 => sprintf( __( 'FAQ draft updated.', 'wpgo-flexible-faqs' ), esc_url( add_query_arg( 'preview', 'true', get_permalink( $post_ID ) ) ) ),
		);

		return $messages;
	}

	/**
	 * Filter the request to just give posts for the given taxonomy.
	 *
	 * @since 0.1.0
	 */
	public function taxonomy_filter_restrict_manage_posts() {
		global $typenow;

		/* Only work for specific post type */
		if ( $typenow != 'wpgo_faq' ) {
			return;
		}

		$post_types = get_post_types( array( '_builtin' => false ) );

		if ( in_array( $typenow, $post_types ) ) {
			$filters = get_object_taxonomies( $typenow );

			foreach ( $filters as $tax_slug ) {
				if ( ! isset( $_GET[$tax_slug] ) ) {
					$selected = '';
				} else {
					$selected = $_GET[$tax_slug];
				}

				$tax_obj = get_taxonomy( $tax_slug );
				wp_dropdown_categories( array(
					'taxonomy'     => $tax_slug,
					'name'         => $tax_obj->name,
					'orderby'      => 'name',
					'selected'     => $selected,
					'hierarchical' => $tax_obj->hierarchical,
					'show_count'   => true,
					'hide_empty'   => true
				) );
			}
		}
	}

	/**
	 * Add a filter to the query so the dropdown will work.
	 *
	 * @since 0.1.0
	 */
	public function taxonomy_filter_post_type_request( $query ) {
		global $pagenow, $typenow;

		if ( 'edit.php' == $pagenow ) {
			$filters = get_object_taxonomies( $typenow );
			foreach ( $filters as $tax_slug ) {
				$var = & $query->query_vars[$tax_slug];
				if ( isset( $var ) ) {
					$term = get_term_by( 'id', $var, $tax_slug );
					$var  = $term->slug;
				}
			}
		}
	}

	// Change default placeholder text for post title
	public function title_placeholder( $title ) {
		$screen = get_current_screen();
		if( isset( $screen->post_type ) ) {
			if ( 'wpgo_faq' == $screen->post_type ) {
				$title = 'Enter title here. e.g. FAQs, Help, Support';
			}
		}
		return $title;
	}
}
