/**
 * Block dependencies
 */
import classnames from 'classnames';
import Inspector from './inspector';
import Edit from './edit';
import icon from './icon';
import attributes from './attributes';
import './style.scss';

const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    RichText,
} = wp.editor;

function getSettings(attributes) {
    let settings = [];
    for (let attribute in attributes) {
        let value = attributes[attribute];
        if ('boolean' === typeof attributes[attribute]) {
            value = value.toString();
        }
        settings.push(<li>{attribute}: {value}</li>);
    }
    return settings;
}

/**
 * Register static block example block
 */
export default registerBlockType(
    'blocks-playground/form-fields',
    {
        title: __('Example - Form Fields', 'blocks-playground'),
        description: __('An example of how to use form component in a block.', 'blocks-playground'),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },
        keywords: [
            __('Palette', 'blocks-playground'),
            __('Settings', 'blocks-playground'),
            __('Scheme', 'blocks-playground'),
        ],
        attributes,
        getEditWrapperProps(attributes) {
            const { blockAlignment } = attributes;
            if ('left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment) {
                return { 'data-align': blockAlignment };
            }
        },
        edit: props => {
            const { setAttributes } = props;

            return [
                <Inspector {...{ setAttributes, ...props }} />,
                <Edit {...{ setAttributes, ...props }} />
            ];
        },
        save: props => {
            const { attributes } = props;

            const settings = getSettings(attributes);

            return (
                <div>
                    <p>{__('Check the settings', 'blocks-playground')}</p>
                    <ul>
                        {settings}
                    </ul>
                </div>
            );
        },
    },
);
