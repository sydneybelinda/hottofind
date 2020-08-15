import React from "react";
import AvatarEditor from "react-avatar-editor";

class MyEditor extends React.Component {
  onClickSave = () => {
    if (this.editor) {
      const canvas = this.editor.getImage();

      const canvasScaled = this.editor.getImageScaledToCanvas();
    }
  };

  setEditorRef = editor => (this.editor = editor);

  render() {
    return (
      <AvatarEditor
        ref={this.setEditorRef}
        image="http://example.com/initialimage.jpg"
        width={250}
        height={250}
        border={50}
        scale={1.2}
      />
    );
  }
}

export default MyEditor;
