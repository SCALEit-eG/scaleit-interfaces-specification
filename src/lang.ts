namespace lang{
    export function Main(){
        urlEncoding();
    }

    function urlEncoding(){
        const value = "äöü/ß-%&$.,;#/§&\"\\+*~";
        let encoded = global.encodeURI(value);
        let decoded = global.decodeURI(encoded);
        console.log(encoded);
        console.log(decoded);
    }
}

lang.Main();