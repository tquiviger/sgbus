var React = require('react');
var Searchkit = require('searchkit');
var GetBusStationContainer = require('../../containers/GetBusStationContainer');
var Config = require('Config')

const searchkit = new Searchkit.SearchkitManager(Config.elasticSearchUrl + "/sgbus");
const SearchkitProvider = Searchkit.SearchkitProvider;
const SearchBox = Searchkit.SearchBox;
const Hits = Searchkit.Hits;

var styles = {
    query: {
        fontSize: 20,
        color: '#333',
        fontWeight: 100
    }
}


function SearchBusStation() {
    return (
        <div>

            <SearchkitProvider searchkit={searchkit}>
                <div>
                    <div style={styles.query}>
                        <SearchBox
                            searchOnChange={true}
                            queryOptions={{analyzer:"standard"}}
                            queryFields={["Description", "languages", "text"]}
                        />
                    </div>
                    <div className="search_results" >
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


module.exports = SearchBusStation;