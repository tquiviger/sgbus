import { fitBounds } from 'google-map-react/utils';

const bounds = {
    nw: {
        lat: 50.01038826014866,
        lng: -118.6525866875
    },
    se: {
        lat: 32.698335045970396,
        lng: -92.0217273125
    }
};

const size = {
    width: 640, // Map width in pixels
    height: 380, // Map height in pixels
};

const {center, zoom} = fitBounds({nw, se}, size);

var findCoord = function () {
    return 8;
};