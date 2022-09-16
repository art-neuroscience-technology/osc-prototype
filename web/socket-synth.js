var threshold = 0.1;
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
            var address = msg.address;
            var value = msg.args[0];
            

            const partNames = ['leftEar', 'rightEar', 
            'leftEye','rightEye',
            'leftShoulder', 'rightShoulder', 
            'leftElbow', 'rightElbow', 
            'leftWrist', 'rightWrist', 
            'leftHip', 'rightHip', 
            'leftKnee', 'rightKnee', 
            'leftAnkle', 'rightAnkle']
           
            switch (address) {
              case '/leftEye/x':
                console.log(address, value);
                let n = 0.25*(value/600)
                let oldValue = document.getElementById('mod').value
                let difference = Math.abs(n-oldValue)
                if (difference>threshold){
                    document.getElementById('mod').value = n;
                    console.log(address, value, n);
                }
                break;
              default:
                console.log(`Sorry, we are out of ${expr}.`);
            }
        });
    };

}());

