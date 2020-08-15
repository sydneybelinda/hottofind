import React, { Component } from "react";
import PostPreview from "../components/postPreview";
import { ReactiveBase, DataSearch, ReactiveList } from "@appbaseio/reactivesearch";

class Search extends Component {
  render() {
    return (
      <ReactiveBase
        app="carstore-dataset"
        credentials="4HWI27QmA:58c731f7-79ab-4f55-a590-7e15c7e36721"
      >
        // other components will go here.
        <div>
          <DataSearch
            componentId="SearchSensor"
            dataField="title"
            autosuggest={true}
            placeholder="Search"
            iconPosition="left"
            className="search"
            highlight={true}
            URLParams={true}
          />
          <ReactiveList
          className= 'right-col'
          componentId= 'SearchResult'
          dataField= 'title'
          size={12}
          render={({ data }) => (
            <ReactiveList.ResultCardWrapper>
                {
                    data.map(item => (
                        <ResultCard key={item._id}>
                                            <ResultCard.Image 
                                                src='http://www.asfera.info/files/images/
                                                1_aprela/4/deloreyn.jpg'
                                            />
                            <ResultCard.Title 
                                dangerouslySetInnerHTML={{ 
                                    __html: item.name 
                                }} 
                            />
                            <ResultCard.Description>
                               {item.brand + " " + "*".repeat(item.rating)}
                            </ResultCard.Description>
                        </ResultCard>
                    ))
                }
            </ReactiveList.ResultCardWrapper>
        )}
          pagination={true}
          URLParams={true}
          react={{
            and: ['SearchSensor'],
          }}
          innerClass={{
            resultStats: 'result-stats',
            list: 'list',
            listItem: 'list-item',
            image: 'image',
          }}
          />
        </div>
      </ReactiveBase>
    );
  }
}

export default Search;
