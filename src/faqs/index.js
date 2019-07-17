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

export default registerBlockType('blocks-playground/faqs', {
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

        if (!faq_posts) {
            markup = (
                <Fragment>
                    {markup}
                    <p className={className} >
                        <Spinner />
                        {__('Loading Posts', 'blocks-playground')}
                    </p>
                </Fragment>
            );
        } else if (0 === faq_posts.length) {
            markup = (
                <Fragment>
                    {markup}
                    <p>{__('No FAQs found', 'blocks-playground')}</p>
                </Fragment>
            );
        } else {
            markup = <Fragment>
                <h3>FAQs Block!</h3>
                {faq_posts}
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
                Posts: {JSON.stringify(posts)}
                FAQs: {JSON.stringify(faq_posts)}
                {markup}                
            </Fragment>
        );
    }),
    save() {
        // Rendering in PHP
        return null;
    },
});
