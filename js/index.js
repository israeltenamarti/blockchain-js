//const Block2 = require('./blockchain.js'); //- Lo comento por que ya lo llamamos en el index.htm

//Capturamos los obtenos para agregar la información
const divBlockchain = document.getElementById("blockchain");

//Llamada para Ejecutar la Blockchain
async function run(){
    //Creamos un objeto de la clase blockchain
    const blockchain = await new Blockchain();

    //for (let i = 0; i < 20; i++){
    for (let i = 0; i < 10; i++){
        const block = blockchain.addBlock(`Block {i}`);
        console.log(block.toString());
    }   

    //Y los mostramos
    blockchain.print();
}

//Y ejecutamos
run();