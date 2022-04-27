//const Block2 = require('./blockchain.js'); //- Lo comento por que ya lo llamamos en el index.htm

//Capturamos los obtenos para agregar la información
const divBlockchain = document.getElementById("blockchain");

//Llamada para Ejecutar la Blockchain
async function run(){
    //Creamos un objeto de la clase blockchain
    const blockchain = await new Blockchain();

    //Creamos los tres bloques y los agregamos (con el await aseguramos la sincronía y el orden)
    const block1 = new Block({data: "Bloque #1"});
    block1.getBlockData();
    await blockchain.addBlock(block1);
    
    const block2 = new Block({data: "Bloque #2"});
    block2.getBlockData();
    await blockchain.addBlock(block2);
    
    const block3 = new Block({data: "Bloque #3"});
    block3.getBlockData();
    await blockchain.addBlock(block3);

    //Y los mostramos
    blockchain.print();
}

//Y ejecutamos
run();

//const block = new Block({data:"Genesis Block"});
//block.toString();
//console.log(block.toString());
//block.getBlockData();

//Prueba de Llamada a la función SHA256 de la librería  CryptoJS
//var encrypted = CryptoJS.SHA256("dasdas");
//console.log(encrypted)