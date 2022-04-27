//Clase para generar una Blockchain
//---------------------------------

//Importamos el modulo block.js
//const Block = require('./blockchain.js'); - Lo comento por que ya lo llamamos en el index.htm

class Blockchain{
    constructor(){
        this.chain = [];          //Array de objetos para almacenar los bloques
        this.height= -1;          //Es la altura de la Blockchain (0 es el primer bloque)
        this.initializeChain();   //Función para inicializar la blockchain
    }

    //Función para inicializar la blockchain
    async initializeChain(){
        if ( this.height == -1 ){
            //Creamos el bloque inicial y lo agregamos
            const block = new Block({ data: "Genesis Block" });
            
            console.log("1.- Constructor del Bloque Genesis");
            
            const divB1 = document.createElement("div");
            divB1.textContent = "1.- Constructor del Bloque Genesis";
            divBlockchain.appendChild(divB1);
            
            await this.addBlock(block);
        }
    }

    //Función para agregar un bloque a la Blockchain
    addBlock(block){
        let self = this;
        
        console.log("2.- Agregar bloque");
        const divB2 = document.createElement("div");
        divB2.textContent = "2.- Agregar bloque";
        divBlockchain.appendChild(divB2);

        return new Promise(async (resolve, reject)=>{
            //Establecemos la longitud a partir de la variable de la Blockchain
            block.height = self.chain.length;

            //Establecemos la fecha/hora de creación
            block.time = new Date().getTime().toString();
            
            //Establecemos el hash del bloque anterior
            if ( self.chain.length > 0){
                block.previousBlockHash = self.chain[self.chain.length - 1].hash;
            }

            //Y ahora verificamos que no hay errores
            let errors = await self.validateChain();
            if ( errors.length > 0 ){
                reject(new Error("Error: La cadena no es válida: ", errors));
            }

            //Si esta todo correcto, crearemos el hash
            block.hash = CryptoJS.SHA256(JSON.stringify(block)).toString();
            self.chain.push(block);
            //console.log(block.toString());
            resolve(block);
        });
    }

    //Función para revisar la Blockchain antes de agregar un boque
    validateChain(){
        let self = this;
        const errors = [];
        return new Promise( async(resolve, reject)=>{
            //Recorremos el array de bloques, y verificamos cada bloque con la función validate()
            self.chain.map(async (block) =>{
                try{
                    let isValid = await block.validate();
                    if ( !isValid ){
                        errors.push(new Error(`The block ${block} is not valid`));
                    }
                }catch (err){
                    errors.push(err);
                }
            });
            resolve(errors);
        });
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
