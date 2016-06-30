var isClientMobile = function () {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
}

module.exports = {
    isClientMobile: isClientMobile
};