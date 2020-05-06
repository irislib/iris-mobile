// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');
var Gun = require("gun");
var server = require('http').createServer(Gun.serve);
var gun = Gun({web: server.listen(8765), multicast: { port: 8765 } }); // file: userDataPath + '/radata', 

// Echo every message received from react-native.
rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(msg);
} );

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");
