
import React, { Component } from 'react';


export default class Main extends Component {
	static async getInitialProps() {
		return {
		
		};
	}

	render() {
		return (
            <div>
<img src={require("../../../../data/uploadedimages/noimage.jpg") } />
</div>
		);
	}
}