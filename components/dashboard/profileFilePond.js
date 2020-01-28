// Import React FilePond
import FilePondPluginFileRename from "filepond-plugin-file-rename";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { URL } from "../../config";
import * as Queries from "../../utils/queries";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileRename,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginImageValidateSize,
  FilePondPluginImageTransform
);

// Our app
class FileUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      //  files: [
      //     {
      //       source: `${URL}/public/uploadedfiles/${this.props.files.name}`,
      //       options: {
      //         type: "local"
      //       }
      //     }
      //  ]
      files: []
    };
  }

  componentDidMount = () => {
    if (this.props.user.avatar) {
      var files = [];

      files.push({
        source: `${URL}/uploadedimages/profile/${this.props.user.avatar}`,
        options: {
          type: "local"
        }
      });

      this.setState({ files: files });
    }
  };

  handleInit() {
    console.log("FilePond instance has initialised");
  }

  makeid = length => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  render() {
    var n;

    return (
      <div className="App">
        <FilePond
          ref={this.props.setRef}
          files={this.state.files}
          allowMultiple={false}
          name={"file"}
          maxFiles={1}
          server={{
            // process: "/api/dashboard/file/profileupload",
            process: {
              url: "/api/dashboard/file/profileupload",
              method: "POST",

              onload: response => {
                var file = {
                  name: response,
                  username: this.props.user.username
                };
                Queries.uploadProfilePhoto(file);
              },
              onerror: response => response.data,
              ondata: formData => {
                formData.append("username", this.props.user.username);
                return formData;
              }
            },
            load: (source, load) => {
              // simulates loading a file from the server
              fetch(source)
                .then(res => res.blob())
                .then(load);
            },
            remove: (source, load, error) => {
              // var name = source.replace(`/uploadedimages/profile/`, '')

              var file = {
                username: this.props.user.username
              };

              // Should somehow send `source` to server so server can remove the file with this source
              Queries.deleteAvatar(file);
              // Can call the error method if something is wrong, should exit after
              error("oh my goodness");

              // Should call the load method when done, no parameters required
              load();
            }
          }}
          imageResizeMode="cover"
          allowImageTransform={true}
          allowImageCrop={true}
          imageCropAspectRatio={"1:1"}
          oninit={() => this.handleInit()}
          imageTransformOutputQuality={65}
          imageTransformOutputMimeType="image/jpeg"
          fileRenameFunction={file => {
            n = this.makeid(25);
            return n + file.extension;
          }}
          onupdatefiles={fileItems => {
            //this.props.onupdatefiles({ files: fileItems.map(fileItem => fileItem.file) });
            this.setState({ files: fileItems.map(fileItem => fileItem.file) });
          }}
          // onupdatefiles={this.props.onupdatefiles }
          onDrop={this.props.handleUploadImages}
        />
      </div>
    );
  }
}

export default FileUploader;
