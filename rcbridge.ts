
/**
 *  RCBridge blocks
 */

let _protocol = 1;
let _pulselength = 193; //microsecond
let _bitlength = 24;
let _rcpattern = 0;

enum CTRL_PROT {
    //% block=Protocol_1
    Protocol_1 = 1,
    //% block=Protocol_2
    Protocol_2 = 2,
    //% block=Protocol_3
    Protocol_3 = 3,
    //% block=Protocol_4
    Protocol_4 = 4,
    //% block=Protocol_5
    Protocol_5 = 5,
    //% block=Protocol_6
    Protocol_6 = 6,
    //% block=Protocol_7
    Protocol_7 = 7
}



/**
 * Blocks
 */
//% weight=100 color=#0fbc12 icon="\uf2ce" block="RCBridge"

namespace RCBRIDGE {
    //% block="Send a RC pattern %rcpattern of length %bitlength at a pulse lenght of %pulselength milliseconds using protocol %protocol" 
    //% rcpattern.defl=4527884 bitlength.defl=24 pulselength.defl=193 protocol.defl=1
    export function setPattern(rcpattern: number, bitlength: number, pulselength: number, protocol: CTRL_PROT) {

        radio.sendString("!"+ pulselength.toString() 
                        +";"+ bitlength.toString()
                        +","+ protocol.toString()
                        +"."+ rcpattern.toString())

        basic.pause(100)
    }

    //% block="Retransmit last received Rc Pattern" 
    export function ResendLastRecvPattern() {
        
        serial.writeString("!"+ _pulselength.toString() 
                        +";"+ _bitlength.toString()
                        +","+ _protocol.toString()
                        +"."+ _rcpattern.toString())

        radio.sendString("!"+ _pulselength.toString() 
                        +";"+ _bitlength.toString()
                        +","+ _protocol.toString()
                        +"."+ _rcpattern.toString())

        basic.pause(100)
    }


    //% block="Is valid Rc signal %receivedString" 
    export function isRcSigTrue(receivedString: string):boolean {
        if (receivedString.includes("!") && receivedString.includes(";") && receivedString.includes(",") && receivedString.includes(".")) {
            _pulselength = parseInt(receivedString.substr(receivedString.indexOf("!") + 1, receivedString.indexOf(";") - receivedString.indexOf("!") - 1),10)
            _bitlength = parseInt(receivedString.substr(receivedString.indexOf(";") + 1, receivedString.indexOf(",") - receivedString.indexOf(";") - 1),10)
            _protocol = parseInt(receivedString.substr(receivedString.indexOf(",") + 1, receivedString.indexOf(".") - receivedString.indexOf(",") - 1),10)
            _rcpattern = parseInt(receivedString.substr(receivedString.indexOf(".") + 1, receivedString.length() - receivedString.indexOf(".") - 1),10)
            return true
        }
        else {
            return false
        }

    }

    //% block="Rc received result" 
    export function rcRecvStr():string {
        return "Receive: Pattern of " +
                _rcpattern.toString() +
                " " +
                _bitlength.toString() +
                " Bits at " +
                _pulselength.toString() +
                "ms (" +
                _protocol.toString() +
                ")Protocol"
    }

    //% block
    export function getPattern():number {
            return _rcpattern
    }

    //% block
    export function getBitLength():number {
            return _bitlength
    }

    //% block
    export function getPulseLength():number {
            return _pulselength
    }

    //% block
    export function getProtocol():number {
            return _protocol
    }

    //% block="Set Radio group to %group" 
    //% group.min=0 group.max=15
    export function initRadio(group: number) {
        radio.setGroup(group)
    }

   

}
