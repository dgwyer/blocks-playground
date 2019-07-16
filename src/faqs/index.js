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
const { Fragment } = wp.element;

export default registerBlockType('blocks-playground/faqs', {
    title: __('FAQs', 'blocks-playground'),
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
    })(({ posts, className, isSelected, setAttributes }) => {
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
                <div>Inspector controls here</div>
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
