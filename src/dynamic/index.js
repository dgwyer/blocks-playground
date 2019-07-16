/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Spinner } = wp.components;
const { withSelect } = wp.data;
                                 //blocks-playground/dynamic
export default registerBlockType( 'blocks-playground/dynamic', {
        title: __( 'Some Example - Dynamic Block', 'blocks-playground'),
        description: __( 'A look at how to build a basic dynamic block.', 'blocks-playground'),
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },
        category: 'blocks-playground',
        edit: withSelect( select => {
                return {
                    posts: select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 3 } )
                };
            } )( ( { posts, className, isSelected, setAttributes } ) => {
                if ( ! posts ) {
                    return (
                        <p className={className} >
                            <Spinner />
                            { __( 'Loading Posts', 'blocks-playground' ) }
                        </p>
                    );
                }
                if ( 0 === posts.length ) {
                    return <p>{ __( 'No Posts', 'blocks-playground' ) }</p>;
                }
                return (
                    <ul className={ className }>
                        { posts.map( post => {
                            return (
                                <li>
                                    <a className={ className } href={ post.link }>
                                        { post.title.rendered }
                                    </a>
                                </li>
                            );
                        }) }
                    </ul>
                );
            } ) // end withAPIData
        , // end edit
        save() {
            // Rendering in PHP
            return null;
        },
} );
