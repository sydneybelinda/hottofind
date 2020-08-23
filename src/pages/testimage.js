
import React, { Component } from 'react';


export default class Main extends Component {
	static async getInitialProps() {
		return {

		};
    }
    
    

	render() {
    
      var noimage = "/static/uploadedimages/noimage.jpg";
       
          try {
            var image = require('../../../../data/uploadedimages/blah.jpg');
            // do stuff
        } catch (ex) {
           var  image = noimage;
        }
   
    
    return (
<div>
    <img src={image} />
</div>
		);
	}
}