import classnames from 'classnames';
import Select from 'react-select';

//  Import core block libraries
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  ServerSideRender,
  TextControl,
  RadioControl,
  SelectControl,
  Spinner
} = wp.components;
const { registerBlockType } = wp.blocks;
const { Component, Fragment } = wp.element;

export class SelectFAQPosts extends Component {

  constructor(props) {
    super(); // or super(props); ??

    this.state = {
      loading: false,
      posts: [],
    };
    this.props = props;
  }

  // get post types to populate select box
  // this is done everytime the block is mounted (clicked on)
  componentDidMount() {

    this.setState({ loading: true });

    const url = 'blocks-playground/v1/posts';

    wp.apiFetch({ path: url, method: 'GET' }).then(
      (data) => {

        var posts = [];

        const entries = Object.entries(data);
        for (const [key, value] of entries) {

          console.log(key, value);

          const tmp = {
            value: key,
            label: value
          };

          posts.push(tmp);
        }

        this.setState({
          posts: posts,
          loading: false
        });
        return data;
      },
      (err) => {
        return err;
      }
    );
  }

  componentDidMount() {

    this.setState({ loading: true });

    const url = 'blocks-playground/v1/posts';

    wp.apiFetch({ path: url, method: 'GET' }).then(
      (data) => {

        var posts = [];

        const entries = Object.entries(data);
        for (const [key, value] of entries) {

          console.log(key, value);

          const tmp = {
            value: key,
            label: value
          };

          posts.push(tmp);
        }

        this.setState({
          posts: posts,
          loading: false
        });
        return data;
      },
      (err) => {
        return err;
      }
    );
  }

  updateSelect(val) {

    setAttributes({ faq_posts: JSON.stringify(val) });

    // this.setState({ loading: true });

    // const url = 'blocks-playground/v1/posts';

    // wp.apiFetch({ path: url, method: 'GET' }).then(
    //   (data) => {

    //     var posts = [];

    //     const entries = Object.entries(data);
    //     for (const [key, value] of entries) {

    //       console.log(key, value);

    //       const tmp = {
    //         value: key,
    //         label: value
    //       };

    //       posts.push(tmp);
    //     }

    //     this.setState({
    //       posts: posts,
    //       loading: false
    //     });
    //     return data;
    //   },
    //   (err) => {
    //     return err;
    //   }
    // );
  }

  render() {
    const { setAttributes, faq_posts, multi=true, className } = this.props;
    //console.log(JSON.stringify(this.props));

    // Not really needed as this displays a spinning icon EVERY time a sitemap block is clicked on which doesn't look great.
    // if ( this.state.loading ) {
    //   return (
    //     <p style={{'display': 'flex', 'align-items': 'center'}} className={className} >
    //       <Spinner />
    //       { __( 'Loading post types', 'simple-sitemap' ) }
    //     </p>
    //   );
    // }

    return (
      <div>
        <Select
          value={JSON.parse(faq_posts)}
          isMulti={multi}
          onChange={(val) => setAttributes({ faq_posts: JSON.stringify(val) })}
          options={this.state.posts}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>
    );
  }
}
