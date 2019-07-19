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
const {
    Spinner,
    IconButton,
    Toolbar,
    PanelBody,
    PanelRow,
    TextControl,  
    RadioControl,
    ToggleControl
} = wp.components;
const { withSelect } = wp.data;
const {
    BlockControls,
    InspectorControls,
    MediaUpload,
    MediaPlaceholder
  } = wp.editor;

export default registerBlockType('blocks-playground/shortcode', {
    title: __('Shortcode Example #1', 'blocks-playground'),
    description: __('Simple shortcode example.', 'blocks-playground'),
    icon: {
        background: 'rgba(254, 243, 224, 0.52)',
        src: icon,
    },
    category: 'blocks-playground',
    edit: withSelect(select => {
        return {
            posts: select('core').getEntityRecords('postType', 'post', { per_page: 3 })
        };
    })((props) => {

        const {
            attributes: { page_depth },
            className,
            posts,
            isSelected,
            setAttributes
        } = props;

        if (!posts) {
            return (
                <p className={className} >
                    <Spinner />
                    {__('Loading Posts', 'blocks-playground')}
                </p>
            );
        }
        if (0 === posts.length) {
            return <p>{__('No Posts', 'blocks-playground')}</p>;
        }
        return (
            <div>
                <InspectorControls>
                    <PanelBody title={__("General Settings", "blocks-playground")} initialOpen={true}>
                        <PanelRow>
                            <TextControl
                                type="number"
                                label="Page indentation"
                                min="0"
                                max="5"
                                help="Leave at zero for auto-depth"
                                value={page_depth}
                                onChange={(value) => { setAttributes({ page_depth: parseInt(value) }); }}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                {page_depth}
                {JSON.stringify(props.attributes)}
                <ul className={className}>
                    {posts.map(post => {
                        return (
                            <li>
                                <a className={className} href={post.link}>
                                    {post.title.rendered}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }) // end withAPIData
    , // end edit
    save() {
        // Rendering in PHP
        return null;
    },
});
