var React = require('react');
var Searchkit = require('searchkit');
var GetBusStationContainer = require('../../containers/GetBusStationContainer');
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
                        <div className="search_results">
                            <Hits
                                hitsPerPage={6}
                                mod="sk-hits-list"
                                itemComponent={GetBusStationContainer}
                            />
                        </div>
                    </div>
                </SearchkitProvider>
            </div>
        )
    }
});



module.exports = SearchBusStation;