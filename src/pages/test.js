
import React, { Component } from 'react';
import initReactivesearch from '@appbaseio/reactivesearch/lib/server';

import { ReactiveBase, DataSearch, SelectedFilters, ReactiveList, ResultCard } from '@appbaseio/reactivesearch';

const settings = {
	app: 'good-books-ds',
	credentials: 'nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d',
};

const dataSearchProps = {
	dataField: ['original_title', 'original_title.search'],
	categoryField: 'authors.raw',
	componentId: 'BookSensor',
	defaultSelected: 'Harry',
};

const reactiveListProps = {
	componentId: 'SearchResult',
	dataField: 'original_title.raw',
	className: 'result-list-container',
	from: 0,
	size: 5,
	renderItem: data => <ResultCard key={data._id} data={data} />,
	react: {
		and: ['BookSensor'],
	},
};

export default class Main extends Component {
	static async getInitialProps() {
		return {
			store: await initReactivesearch(
				[
					{
						...dataSearchProps,
						source: DataSearch,
					},
					{
						...reactiveListProps,
						source: ReactiveList,
					},
				],
				null,
				settings,
			),
		};
	}

	render() {
		return (
			<ReactiveBase {...settings} initialState={this.props.store}>
				<div className="row">
					<div className="col">
						<DataSearch {...dataSearchProps} />
					</div>

					<div className="col">
						<SelectedFilters />
						<ReactiveList {...reactiveListProps} />
					</div>
				</div>
			</ReactiveBase>
		);
	}
}