const { render } = wp.element;

//import FrontendGallery from "./components/FrontendGallery";
import FlexibleFaq from "./components/FlexibleFaq";

const ffaq_els = document.querySelectorAll('.ffaq-container');
const element = <Welcome name="Sara" title="Mara"/>;

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
  //return <FlexibleFaq />;
}

console.log('ffaq_els: ', ffaq_els);
console.log('FlexibleFaq: ', FlexibleFaq);

ffaq_els.forEach((ffaq_el, index) => {
  const ffaq_id = ffaq_el.id;
  //const direction = gallery.dataset.direction;
  // const islightboxenabled = gallery.dataset.islightboxenabled;
  // const images = gallery.querySelectorAll("img");
  // const photos = [];

  console.log('FAQ ID: ', ffaq_id);

  // images.forEach(image => {
  //   photos.push({
  //     src: image.src,
  //     width: image.width,
  //     height: image.height,
  //     alt: image.alt,
  //     caption: image.title
  //   });
  // });

  render(
    <FlexibleFaq />,
    ffaq_el //document.querySelector('.ffaq-container')
  );  
});