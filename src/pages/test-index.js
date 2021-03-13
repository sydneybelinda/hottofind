import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('XASMT3PQUY', '4975554cdc1513b3717e777173837417');
const index = client.initIndex('dev_HOTTOFIND');
import Axios from "axios";
import React from "react";
import {API, COUNTRYCODE} from "../../config" 




export default class Main extends React.Component {
	static async getInitialProps() {
		return {
			// store: await initReactivesearch(
			// 	[
			// 		{
			// 			...dataSearchProps,
			// 			source: DataSearch,
			// 		},
			// 		{
			// 			...reactiveListProps,
			// 			source: ReactiveList,
			// 		},
			// 	],
			// 	null,
			// 	settings,
			// ),
		};
	}

	render() {
		return (
<div >Index Posts</div>
		);
	}
}