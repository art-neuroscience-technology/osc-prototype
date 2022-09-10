var example = example || {};

(function () {
    "use strict";

    var freqTransform = function (value) {
        return (value * 6000) + 60;
    };

    var identityTransform = function (value) {
        return value;
    };

    var carrierSpec = {
        freq: {
            inputPath: "carrier.freq.value",
            transform: freqTransform
        },
        mul: {
            inputPath: "carrier.mul",
            transform: identityTransform
        }
    };

    var modulatorSpec = {
        freq: {
            inputPath: "modulator.freq.value",
            transform: freqTransform
        },
        mul: {
            inputPath: "modulator.mul",
            transform: freqTransform
        }
    };

    example.SocketSynth = function () {
        this.oscPort = new osc.WebSocketPort({
            url: "ws://localhost:8081"
        });

        this.listen();
        this.oscPort.open();

        this.oscPort.socket.onmessage = function (e) {
            console.log("message", e);

        };

        
    };

    example.SocketSynth.prototype.createSynth = function () {
        if (this.synth) {
            return;
        }
      
    };

    example.SocketSynth.prototype.listen = function () {
        this.oscPort.on("message", function (msg) {
            console.log("message", msg);
            var address = msg.address;
            var value = msg.args[0];
            console.log('Message>', address, value)
            //TODO: if for each part 
            console.log(document.getElementById('modulateKaleid').value)
            document.getElementById('modulateKaleid').value = value;
            console.log(document.getElementById('modulateKaleid').value)
        });
    };

}());

