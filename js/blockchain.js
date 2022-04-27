//Clase para generar una Blockchain
//---------------------------------

//Importamos el modulo block.js
//const Block = require('./blockchain.js'); - Lo comento por que ya lo llamamos en el index.htm

class Blockchain{
    constructor(){
        this.chain = [Block.genesis];   //Array de objetos para almacenar los bloques, que se inicializa con el genesis
        this.height= -1;                //Es la altura de la Blockchain (0 es el primer bloque)
    }

    //Función para agregar un bloque a la Blockchain
    addBlock(data){
        const previousBlock = this.chain[this.chain.length -1];
        const block = Block.mine(previousBlock, data, this.chain.length);
        this.chain.push(block);

        console.log("2.- Agregar Bloque");
        const divB1 = document.createElement("div");
        divB1.textContent = "2.- Agregar Bloque";
        divBlockchain.appendChild(divB1);

        return block;
    }

    //Función para recorrer la blockchain e imprimirla
    print(){
        let self = this;

        console.log("3.- Imprimir Blockchain");
        const divB = document.createElement("div");
        divB.textContent = "3.- Imprimir Blockchain";
        divBlockchain.appendChild(divB);

        for ( let block of self.chain ){
            console.log(block.toString());
            block.toHtml();
        }
    }

}