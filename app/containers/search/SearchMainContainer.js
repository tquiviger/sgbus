var React = require('react');
var SearchMain = require('../../components/search/SearchMain');
var withRouter = require('react-router').withRouter;


var SearchMainContainer = React.createClass({

    render: function () {
        return (
            <SearchMain
                mode={this.props.route.path}
            />
        )
    }
});

module.exports = withRouter(SearchMainContainer);
