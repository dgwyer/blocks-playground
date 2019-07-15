/**
 * Block dependencies
 */
import classnames from 'classnames';
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
    registerBlockType,
} = wp.blocks;
const {
    URLInput,
} = wp.editor;
const {
    IconButton,
    Tooltip,
    TextControl,
} = wp.components;

/**
 * Register example block
 */
export default registerBlockType(
    'bpblocks/url-input',
    {
        title: __( 'Example - URL Input', 'bpblocks' ),
        description: __( 'An example of how to use the URLInput component.', 'bpblocks'),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },         
        keywords: [
            __( 'Link', 'bpblocks' ),
            __( 'Post', 'bpblocks' ),
            __( 'Search', 'bpblocks' ),
        ],
        attributes: {
            text: {
                type: 'string',
                source: 'text',
                selector: 'a',
            },
            url: {
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
            },
        },
        edit: props => {
            const { attributes: { text, url },
                className, isSelected, setAttributes } = props;
            return (
                <div className={ className }>
                    { isSelected ? (

                        <Fragment>
                            <TextControl
                                id="example-input-field"
                                label={ __( 'Link Text', 'bpblocks' ) }
                                value={ text }
                                onChange={ text => setAttributes( { text } ) }
                            />
                            <p>{ __( 'Link URL', 'bpblocks' ) }</p>
                            <form
                                className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
                                onSubmit={ event => event.preventDefault() }
                            >
                                <Tooltip text="Add Link">
                                    {icon}
                                </Tooltip>
                                <URLInput
                                    className="url"
                                    value={ url }
                                    onChange={ url => setAttributes( { url } ) }
                                />
                                <IconButton
                                    icon="editor-break"
                                    label={ __( 'Apply', 'bpblocks' ) }
                                    type="submit"
                                />
                            </form>
                        </Fragment>

                    ) : (

                        <p>
                            <a href={ url }>
                                { text || __( 'Edit link', 'bpblocks' ) }
                            </a>
                        </p>

                    )}

                </div>
            );
        },
        save: props => {
            const { attributes: { text, url } } = props;

            return (
                <p>
                    <a href={ url }>
                        { text }
                    </a>
                </p>
            );
        },
    },
);
