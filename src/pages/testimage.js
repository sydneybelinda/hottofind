
import React, { Component } from 'react';


export default class Main extends Component {
	static async getInitialProps() {
		return {
<<<<<<< HEAD

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
=======
		
		};
	}

	render() {
		return (
            <div>
<img src={require("../../../../data/uploadedimages/noimage.jpg") } />
>>>>>>> 4eb8749e3e733ada39ac15aeee8f457a197481a4
</div>
		);
	}
}