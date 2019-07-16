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
    PanelBody,
    PanelRow,
    ServerSideRender,
    TextControl,
    RadioControl,
    SelectControl,
    ColorPicker
} = wp.components;
const { withSelect } = wp.data;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;

export default registerBlockType('blocks-playground/faqs', {
    title: __('FAQs', 'blocks-playground'),
    description: __('Simple shortcode example.', 'blocks-playground'),
    icon: {
        background: 'rgba(254, 243, 224, 0.52)',
        src: icon,
    },
    category: 'blocks-playground',
    edit: withSelect((select) => {
        return {
            posts: select('core').getEntityRecords('postType', 'post', { per_page: 3 })
        };
    })((props) => {
        const { attributes: { page_depth }, posts, className, setAttributes, isSelected } = props;
        var markup;

        if (!posts) {
            markup = (
                <Fragment>
                    {markup}
                    <p className={className} >
                        <Spinner />
                        {__('Loading Posts', 'blocks-playground')}
                    </p>
                </Fragment>
            );
        } else if (0 === posts.length) {
            markup = (
                <Fragment>
                    {markup}
                    <p>{__('No Posts', 'blocks-playground')}</p>
                </Fragment>
            );
        } else {
            markup = <Fragment>
                <h3>FAQs Block!</h3>
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
            </Fragment>;
        }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Page Settings', 'simple-sitemap')} initialOpen={false}>
                        <PanelRow className="simple-sitemap">
                            <p>Affects sitemap pages only.</p>
                        </PanelRow>
						<PanelRow className="simple-sitemap">
							<TextControl
								type="number"
								label="Page indentation"
								min="0"
								max="5"
								help="Leave at zero for auto-depth"
								value={page_depth}
								onChange={(value) => { setAttributes({ page_depth: value }); }}
							/>
						</PanelRow>
                    </PanelBody>
                </InspectorControls>
                Page depth: {page_depth}
                {markup}
            </Fragment>
        );
    }) // end withAPIData
    , // end edit
    save() {
        // Rendering in PHP
        return null;
    },
});
