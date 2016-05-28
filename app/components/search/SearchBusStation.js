var React = require('react');
var PropTypes = React.PropTypes;
var Searchkit = require('searchkit');
var BusStationResults = require('./BusStationResults');

const searchkit = new Searchkit.SearchkitManager(
    "/search/sgbus/bus_station",
    {searchOnLoad: false, useHistory: false}
);
searchkit.setQueryProcessor(function(query){
    query = query.query ? query : {"size": 0};
    return query;
});
const SearchkitProvider = Searchkit.SearchkitProvider;
const SearchBox = Searchkit.SearchBox;
const Hits = Searchkit.Hits;

var styles = {
    query: {
        fontSize: 20,
        color: '#333',
        fontWeight: 100,
        width: 300
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
};


var BusStationResultsStation = function (props) {
    return (
        BusStationResults(props.hits, '/detail/'))
};

var BusStationResultsItineraryD = function (props) {
    return (
        BusStationResults(props.hits, '/itinerary/'))
};

var BusStationResultsItineraryA = function (props) {
    var finalPath = window.location.hash.split('?').shift().split('#').pop() + '/';
    return (
        BusStationResults(props.hits, finalPath))
};

var SearchBusStation = React.createClass({
    render: function () {
        var container = this.props.departureStation == null ? BusStationResultsItineraryD : BusStationResultsItineraryA;
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
                            listComponent={ this.props.mode==='station'?  BusStationResultsStation : container}
                        />
                    </div>
                </SearchkitProvider>
            </div>
        )
    }
});

SearchBusStation.propTypes = {
    departureStation: PropTypes.string,
    mode: PropTypes.string.isRequired
};


module.exports = SearchBusStation;