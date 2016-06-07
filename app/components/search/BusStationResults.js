var React = require('react');
var Link = require('react-router').Link;


var styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

var BusStationResults = function (hits, path, onClickReset) {
    return (
        <div style={styles.container}>
            {
                hits.map(function (result) {
                        return (
                            <Link key={result._id} to={path+"/"+result._id}>
                                <button
                                    type='button'
                                    style={{margin: 9}}
                                    className='btn btn-info'
                                    onClick={onClickReset}>
                                    {path === "buses" ? result._source.ServiceNo : result._source.Description}
                                </button>
                            </Link>
                        )
                    }
                )}

        </div>)
};


module.exports = BusStationResults;