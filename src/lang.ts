import { EventEmitter } from 'events';

namespace lang{
    export function Main(){
        useExample();
    }

    function urlEncoding(){
        const value = "äöü/ß-%&$.,;#/§&\"\\+*~";
        let encoded = global.encodeURI(value);
        let decoded = global.decodeURI(encoded);
        console.log(encoded);
        console.log(decoded);
    }

    function dateSerialization(){
        const d1 = new Date();
        const d2 = new Date(2000, 3, 1, 8);
        const dates = [d1, d2];
        for(let d of dates){
            console.log(d);
            console.log("\t", d.toDateString());
            console.log("\t", d.toString());
            console.log("\t", d.toISOString());
            console.log("\t", d.toJSON());
            console.log("\t", d.toLocaleString());
            console.log("\t", d.toLocaleDateString());
            console.log("\t", d.toLocaleTimeString());
            console.log("\t", d.toUTCString());
        }
    }

    class Example extends EventEmitter{
        private secret = 1;

        example(){
            console.log(this, this.secret);
        }

        call1(){
            this.example();
        }

        call2(){
            function myfunc(this: Example){
                console.log("call2 myfunc:", this);
                try{
                    this.example();
                }catch(e){
                    console.error(e);
                }
            }
            myfunc.bind(this)();
        }

        call3(){
            const myfunc = () => {
                this.example();
            };
            myfunc();
        }

        sendEvent(){
            this.emit("data", this.secret);
        }

        on(eventName: "data", listener: (...args: any[]) => void): this {
            return super.on(eventName, listener);
        }
    }

    function useExample(){
        const ex = new Example();
        ex.call1();
        ex.call2();
        ex.call3();
        ex.on("data", value => {
            console.log("emitted:", value);
        });
        ex.sendEvent();
    }
}

lang.Main();