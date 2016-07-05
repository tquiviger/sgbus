var React = require('react');
var PropTypes = React.PropTypes;
require("../../stylesheets/searchkit.css");

import {
SearchkitManager,
SearchkitProvider,
SearchBox,
Hits
} from "searchkit";

var BusStationResults = require('./BusStationResults');
var Config = require('Config');

var searchkit;

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


var SearchBusStation = React.createClass({
    componentWillMount: function () {
        var path = this.props.mode === "buses" ? "buses" : "stations";
        searchkit = new SearchkitManager(
            Config.apiUrl + "/search/" + path,
            {searchOnLoad: false, useHistory: false}
        );
        searchkit.setQueryProcessor(function (query) {
            query = query.query ? query : {"size": 0};
            return query;
        });
    },
    BusStationContainer: function (props) {
        var path = this.props.mode == "itineraries2" ? this.props.currentPath : this.props.mode;
        return BusStationResults(props.hits, path, this.onClickReset);
    },
    onClickReset: function () {
        searchkit.resetState();
        searchkit.accessors.queryAccessor.results.hits = {}

    },
    render: function () {
        var queryField = this.props.mode === "buses" ? "ServiceNo" : "Description";
        return (
            <div role="search" aria-labelledby="Search bus">
                <SearchkitProvider searchkit={searchkit}>
                    <div>
                        <div style={styles.query}>
                            <SearchBox
                                searchOnChange={true}
                                queryOptions={{analyzer:"standard"}}
                                queryFields={[queryField]}
                                prefixQueryFields={[queryField]}
                            />
                        </div>
                        <Hits
                            hitsPerPage={5}
                            mod="sk-hits-list"
                            listComponent={  this.BusStationContainer }
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