/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';
import { SelectFAQPosts } from '../_components/select-faq-posts';

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

export default registerBlockType('blocks-playground/faqs1', {
    title: __('FAQs', 'blocks-playground'),
    description: __('Simple shortcode example.', 'blocks-playground'),
    icon: {
        background: 'rgba(254, 243, 224, 0.52)',
        src: icon,
    },
    category: 'blocks-playground',
    edit: withSelect( select => {

        return {
            posts: select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 3 } )
        };
    })((props) => {
        const { attributes: { page_depth, faq_posts }, className, setAttributes, isSelected, posts } = props;

        //return <div style={{width:'350px'}}><small><pre>{JSON.stringify(props)}</pre></small></div>;

        var markup;

        if (!JSON.parse(faq_posts)) {
            markup = <h5>Please select one or more FAQs from the sitemap inspector panel.</h5>;
        } else {
            markup = <Fragment>
                <h3>FAQs Block!</h3>
                <ul className={className}>
                    {/* {JSON.parse(faq_posts).map(post => {
                        return (
                            <li>
                                <a className={className} href={post.link}>
                                    {post.title.rendered}
                                </a>
                            </li>
                        );
                    })} */}
                </ul>
            </Fragment>;
        }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('FAQ Settings', 'simple-sitemap')} initialOpen={true}>
                        <PanelRow className="simple-sitemap">
                            <SelectFAQPosts setAttributes={setAttributes} faq_posts={faq_posts} />
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
                Markup: {markup}
                FAQs:
                {faq_posts}
            </Fragment>
        );
    }),
    save() {
        // Rendering in PHP
        return null;
    },
});
