import ImageGallery from "react-image-gallery";
import { URL } from "../config";
import { checkUrl} from "../utils/queries";

async function imageExists(image_url){

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  return http.status ;

 //return http.status != 404;

}


async function setSource(i) {
  
  console.log(i)

  var e;

  try{
      const src = require(i)
      e = src
      return "Good"
  }
  catch(err){

    e = err
    return "Failed"      //Do whatever you want when the image failed to load here
  }
}

class MyGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }



  async componentDidMount(){
    
  }




  render() {
    const url = `${URL}/static/uploadedimages/`;

    var files = [];
    
    
        if (this.props.files.length > 0) {
          
    
          this.props.files.map(async file => {
          // const f = await checkUrl(`${url}${file.name}`)
    
          // if(f == 200 ){
    
            files.push({
              original: `${url}${file.name}`,
              thumbnail: `${url}${file.name}`
            });
          // }
          });
          //   this.setState({ files: files });
        } else {
          files.push({
            original: `/static/uploadedimages/noimage.jpg`,
            thumbnail: `/static/uploadedimages/noimage.jpg`
          });
          //  this.setState({ files: files });
        }

    return <ImageGallery items={files} />;
  }
}

export default MyGallery;
