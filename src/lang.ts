namespace lang{
    export function Main(){
        dateSerialization();
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
}

lang.Main();