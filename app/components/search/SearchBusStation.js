var React = require('react');
var Searchkit = require('searchkit');
var BusStationResultsContainer = require('../../containers/search/BusStationResultsContainer');
var Itinerary = require('./Itinerary');
var Config = require('Config');

const searchkit = new Searchkit.SearchkitManager(
    Config.elasticSearchUrl + "/sgbus/bus_station",
    {searchOnLoad: false, useHistory: false}
);
const SearchkitProvider = Searchkit.SearchkitProvider;
const SearchBox = Searchkit.SearchBox;
const Hits = Searchkit.Hits;

var styles = {
    query: {
        fontSize: 20,
        color: '#333',
        fontWeight: 100,
        width: 300
    }
};

var SearchBusStation = React.createClass({
    render: function () {
        this.props.trucs=1;
        return (
            <div>
                <SearchkitProvider searchkit={searchkit}>
                    <div>
                        <div style={styles.query}>
                            <SearchBox
                                searchOnChange={true}
                                queryOptions={{analyzer:"standard"}}
                                queryFields={["Description"]}
                                prefixQueryFields={["Description"]}
                            />
                        </div>
                        <Hits
                            hitsPerPage={5}
                            mod="sk-hits-list"
                            listComponent={BusStationResultsContainer}
                        />
                    </div>
                </SearchkitProvider>
            </div>
        )
    }
});


module.exports = SearchBusStation;