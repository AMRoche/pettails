cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.oracle.mx.ux.cordova.estimotebeacons/www/EstimoteBeacons.js",
        "id": "com.oracle.mx.ux.cordova.estimotebeacons.EstimoteBeacons",
        "clobbers": [
            "EstimoteBeacons"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.oracle.mx.ux.cordova.estimotebeacons": "0.0.4",
    "org.apache.cordova.splashscreen": "0.3.5-dev"
}
// BOTTOM OF METADATA
});