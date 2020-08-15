
import React, { Component } from 'react';
import {
	ReactiveBase,
	DataSearch,
	NumberBox,
	// RangeSlider,
	ReactiveList,
	ResultCard,
} from '@appbaseio/reactivesearch';
import initReactivesearch from '@appbaseio/reactivesearch/lib/server';

import '../test.css';

const { ResultCardsWrapper } = ReactiveList;

const components = {
	settings: {
	//	app: 'airbeds-test-app',
	//	credentials: 'X8RsOu0Lp:9b4fe1a4-58c6-4089-a042-505d86d9da30',
	app: "hottofind",
	url: "http://db.hottofind.com:9200",
	},
	datasearch: {
		componentId: 'SearchSensor',
		dataField: 'title',
		autosuggest: true,
		placeholder: 'Search',
		iconPosition: 'left',
		className: 'search',
		highlight: true,
		URLParams: true,
	},
	numberbox: {
		componentId: 'GuestSensor',
		dataField: 'accommodates',
		title: 'Guests',
		defaultValue: 2,
		labelPosition: 'right',
		data: {
			start: 1,
			end: 16,
		},
		URLParams: true,
	},
	rangeslider: {
		componentId: 'PriceSensor',
		dataField: 'price',
		title: 'Price Range',
		range: {
			start: 10,
			end: 250,
		},
		rangeLabels: {
			start: '$10',
			end: '$250',
		},
		defaultValue: {
			start: 10,
			end: 50,
		},
		stepValue: 10,
		interval: 20,
	},
	resultcard: {
		className: 'right-col',
		componentId: 'SearchResult',
		dataField: 'title',
		size: 12,
		render: ({ data }) => (
			<ReactiveList.ResultCardsWrapper>
				{data.map(item => (
					<ResultCard href={item.listing_url} key={item._id}>
						<ResultCard.Image src={item.image} />
						<ResultCard.Title>{item.source.title}</ResultCard.Title>
						<ResultCard.Description>
							<div>
								<div className="price">${item.price}</div>
								<p className="info">
									{item.room_type} · {item.accommodates} guests
								</p>
							</div>
						</ResultCard.Description>
					</ResultCard>
				))}
			</ReactiveList.ResultCardsWrapper>
		),
		pagination: true,
		URLParams: true,
		react: {
			and: ['SearchSensor', 'GuestSensor'],
		},
		innerClass: {
			resultStats: 'result-stats',
			list: 'list',
			listItem: 'list-item',
			image: 'image',
		},
	},
};

export default class Main extends Component {
	static async getInitialProps({ pathname, query }) {
		return {
			store: await initReactivesearch(
				[
					{
						...components.datasearch,
						source: DataSearch,
					},
					{
						...components.numberbox,
						source: NumberBox,
					},
					// {
					// 	...components.rangeslider,
					// 	source: RangeSlider,
					// },
					{
						...components.resultcard,
						source: ReactiveList,
					},
				],
				query,
				components.settings,
			),
		};
	}

	render() {
		return (
			<div className="container">
				<ReactiveBase {...components.settings} initialState={this.props.store}>
                <div>Post Search</div>
                <DataSearch componentId="SearchFilter" dataField={['title', 'description']} />

                <ReactiveList
	componentId="results"
	dataField="name"
	size={6}
	pagination={true}
	react={{
		and: ['SearchFilter'],
	}}
	render={({ data }) => (
		<ReactiveList.ResultCardsWrapper>
			{data.map(item => (
				<ResultCard key={item._id}>
					<ResultCard.Image
						src="http://www.asfera.info/files/images/
											1_aprela/4/deloreyn.jpg"
					/>
					<ResultCard.Title
						dangerouslySetInnerHTML={{
							__html: item.title,
						}}
					/>
					{/* <ResultCard.Description>
						{item.brand + ' ' + '*'.repeat(item.rating)}
					</ResultCard.Description> */}
				</ResultCard>
			))}
		</ReactiveList.ResultCardsWrapper>
	)}
/>
				</ReactiveBase>


                
			</div>
		);
	}
}