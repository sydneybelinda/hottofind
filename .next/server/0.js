exports.ids = [0];
exports.modules = {

/***/ "./components/dashboard/filePond.js":
/*!******************************************!*\
  !*** ./components/dashboard/filePond.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var filepond_plugin_file_rename__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! filepond-plugin-file-rename */ "filepond-plugin-file-rename");
/* harmony import */ var filepond_plugin_file_rename__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_rename__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! filepond-plugin-file-validate-size */ "filepond-plugin-file-validate-size");
/* harmony import */ var filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! filepond-plugin-file-validate-type */ "filepond-plugin-file-validate-type");
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var filepond_plugin_image_crop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! filepond-plugin-image-crop */ "filepond-plugin-image-crop");
/* harmony import */ var filepond_plugin_image_crop__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_crop__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var filepond_plugin_image_exif_orientation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! filepond-plugin-image-exif-orientation */ "filepond-plugin-image-exif-orientation");
/* harmony import */ var filepond_plugin_image_exif_orientation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_exif_orientation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! filepond-plugin-image-preview */ "filepond-plugin-image-preview");
/* harmony import */ var filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var filepond_plugin_image_preview_dist_filepond_plugin_image_preview_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css */ "./node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css");
/* harmony import */ var filepond_plugin_image_preview_dist_filepond_plugin_image_preview_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_preview_dist_filepond_plugin_image_preview_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var filepond_plugin_image_resize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! filepond-plugin-image-resize */ "filepond-plugin-image-resize");
/* harmony import */ var filepond_plugin_image_resize__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_resize__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var filepond_plugin_image_transform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! filepond-plugin-image-transform */ "filepond-plugin-image-transform");
/* harmony import */ var filepond_plugin_image_transform__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_transform__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var filepond_plugin_image_validate_size__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! filepond-plugin-image-validate-size */ "filepond-plugin-image-validate-size");
/* harmony import */ var filepond_plugin_image_validate_size__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_validate_size__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! filepond/dist/filepond.min.css */ "./node_modules/filepond/dist/filepond.min.css");
/* harmony import */ var filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(filepond_dist_filepond_min_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_filepond__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-filepond */ "react-filepond");
/* harmony import */ var react_filepond__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_filepond__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../config */ "./config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _utils_queries__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/queries */ "./utils/queries.js");

var _jsxFileName = "C:\\src\\hottofindtest\\components\\dashboard\\filePond.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement;
// Import React FilePond



 // Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately






 // Import FilePond styles





 // Register the plugins

Object(react_filepond__WEBPACK_IMPORTED_MODULE_13__["registerPlugin"])(filepond_plugin_image_exif_orientation__WEBPACK_IMPORTED_MODULE_5___default.a, filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_6___default.a, filepond_plugin_image_resize__WEBPACK_IMPORTED_MODULE_8___default.a, filepond_plugin_file_rename__WEBPACK_IMPORTED_MODULE_1___default.a, filepond_plugin_file_validate_size__WEBPACK_IMPORTED_MODULE_2___default.a, filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_3___default.a, filepond_plugin_image_crop__WEBPACK_IMPORTED_MODULE_4___default.a, filepond_plugin_image_validate_size__WEBPACK_IMPORTED_MODULE_10___default.a, filepond_plugin_image_transform__WEBPACK_IMPORTED_MODULE_9___default.a); // Our app

class FileUploader extends react__WEBPACK_IMPORTED_MODULE_12___default.a.Component {
  constructor(props) {
    super(props);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "componentDidMount", () => {
      if (this.props.files) {
        var files = [];
        this.props.files.map(file => {
          files.push({
            source: `${_config__WEBPACK_IMPORTED_MODULE_14__["URL"]}/uploadedimages/${file.name}`,
            options: {
              type: "local"
            }
          });
        });
        this.setState({
          files: files
        });
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "makeid", length => {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;

      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    });

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

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {
    var n;
    return __jsx("div", {
      className: "App",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    }, __jsx(react_filepond__WEBPACK_IMPORTED_MODULE_13__["FilePond"], {
      ref: this.props.setRef,
      files: this.state.files,
      allowMultiple: true,
      name: "file",
      maxFiles: 10,
      server: {
        process: "/api/dashboard/file/postupload",
        load: (source, load) => {
          fetch(source).then(res => res.blob()).then(load);
        },
        remove: (source, load, error) => {
          var name = source.replace(`${_config__WEBPACK_IMPORTED_MODULE_14__["URL"]}/uploadedimages/`, "");
          _utils_queries__WEBPACK_IMPORTED_MODULE_15__["deleteFile"](name);
          error("oh my goodness");
          load();
        }
      },
      imageResizeMode: "cover",
      allowImageTransform: true,
      allowImageCrop: true,
      imageCropAspectRatio: "1:1",
      oninit: () => this.handleInit(),
      imageTransformOutputQuality: 65,
      imageTransformOutputMimeType: "image/jpeg",
      fileRenameFunction: file => {
        n = this.makeid(25);
        return n + file.extension;
      },
      onupdatefiles: fileItems => {
        this.setState({
          files: fileItems.map(fileItem => fileItem.file)
        });
      } // onupdatefiles={this.props.onupdatefiles }
      ,
      onDrop: this.props.handleUploadImages,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (FileUploader);

/***/ }),

/***/ "./node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/filepond/dist/filepond.min.css":
/*!*****************************************************!*\
  !*** ./node_modules/filepond/dist/filepond.min.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

};;
//# sourceMappingURL=0.js.map