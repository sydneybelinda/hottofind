import ImageGallery from "react-image-gallery";

import { URL } from "../config";

class MyGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  render() {
    const url = `${URL}/static/uploadedimages/`;

    if (this.props.files[0]) {
      var files = [];

      this.props.files.map(file => {
        files.push({
          original: `${url}${file.name}`,
          thumbnail: `${url}${file.name}`
        });
      });
      //   this.setState({ files: files });
    } else {
      var files = {
        original: `/public/uploadedimages/noimage.jpg`,
        thumbnail: `/public/uploadedimages/noimage.jpg`
      };
      //  this.setState({ files: files });
    }

    return <ImageGallery items={files} />;
  }
}

export default MyGallery;
