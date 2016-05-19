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
        fontWeight: 100
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 300,
        alignSelf: 'right'
    }
};


var SearchBusStation = React.createClass({
    render : function() {
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
                        <div style={styles.container}>
                            <Hits
                                hitsPerPage={6}
                                mod="sk-hits-list"
                                listComponent={BusStationResultsContainer}
                            />
                        </div>
                    </div>
                </SearchkitProvider>
            </div>
        )
    }
});



module.exports = SearchBusStation;