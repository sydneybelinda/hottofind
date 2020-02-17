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

var files = [];
    if (this.props.files.length > 0) {
      

      this.props.files.map(file => {
        files.push({
          original: `${url}${file.name}`,
          thumbnail: `${url}${file.name}`
        });
      });
      //   this.setState({ files: files });
    } else {
      files.push({
        original: `/public/uploadedimages/noimage.jpg`,
        thumbnail: `/public/uploadedimages/noimage.jpg`
      });
      //  this.setState({ files: files });
    }

    return <ImageGallery items={files} />;
  }
}

export default MyGallery;
