var React = require('react');
var SearchMain = require('../../components/search/SearchMain');
var withRouter = require('react-router').withRouter;


var SearchMainContainer = React.createClass({

    render: function () {
        var mode = this.props.routeParams.departureStation ? "itineraries2" : this.props.route.path;
        var currentPath = this.props.location.pathname;
        return (
            <SearchMain
                mode={mode}
                currentPath={currentPath}
            />
        )
    }
});

module.exports = withRouter(SearchMainContainer);
