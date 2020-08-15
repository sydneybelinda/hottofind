import FineUploaderTraditional from "fine-uploader-wrappers";
import React, { Component } from "react";
import Gallery from "react-fine-uploader";
// ...or load this specific CSS file using a <link> tag in your document
import "react-fine-uploader/gallery/gallery.css";

class UploadComponent extends Component {
  render() {
    const uploader = new FineUploaderTraditional({
      options: {
        chunking: {
          enabled: true
        },
        deleteFile: {
          enabled: true,
          endpoint: "/uploads"
        },
        request: {
          endpoint: "/api/upload",
          params: {
            username: this.props.user.username
          }
        },
        retry: {
          enableAuto: true
        }
      }
    });

    return (
      <Gallery uploader={uploader} style={{ backgroundColor: "transparent" }} />
    );
  }
}

export default UploadComponent;
