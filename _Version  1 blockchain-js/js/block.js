//Clase para generar un Bloque, es decir, cada pieza o componente de nuestra Blockchain
//-------------------------------------------------------------------------------------

class Block{
    constructor(data){
        this.hash = null;                                                  //Cada bloque tiene un hash que en la creación esta vacio. Se rellena al agregarlo a la blockchain.
        this.height = 0;                                                   //Numero de bloque dentro de la cadena
        this.body = JSON.stringify(data).toString('hex');                  //Cuerpo del bloque que lo serializamos y los pasamos a hexadecimal
        this.time = 0;                                                     //Timestamp de cuando se agrega el bloque a la blockchain
        this.previousBlockHash = '';                                       //Hash del bloque anterior
    }

    //Función para validar que un bloque es correcto, que no se ha modificado (No ha sido "dumpered")
    validate(){
        const self = this;
        //Lo ejecutamos con una promesa por la latencia de la red al estar en produccion
        return new Promise((resolve, reject)=>{
            //Guardamos el Hast Actual
            let currectHash = self.hash;
            //Calculamos de nuevo el Hash con una copia del bloque con el hash a null, pasado a string para poder compararlo
            self.hash = CryptoJS.SHA256(JSON.stringify({...self, hash:null})).toString();
            //Y comparamos
            if (currectHash != self.hash ) {
                return false;
            }
            return true;
        });
    }

    //Función para obtener los datos del Bloque
    getBlockData(){
        const self = this;
        return new Promise((resolve, reject)=>{
            let encodeData = self.body;
            //Pasamos a texto los datos hexadecimales del bloque
            //let decodeData = hex2ascii(encodeData);
            //Y este texto los convertimos a un objeto de Js para poder manejarlo
            //let dataObject = JSON.parse(decodeData);
            let dataObject = JSON.parse(encodeData);        //-> Lo dejo como texto ya que al hacer el Parse del hexadecimal da error

            //Revisamos que no sea el bloque inicial por seguridad
            //if ( dataObject.data == 'Genesis Block') {
            if ( dataObject.data === "Genesis Block") {
                reject(new Error("No se puede devolver información del bloque Genesis"));
            }
            //resolve(dataObject);
            resolve(dataObject);
        });
    }    

    //Función para mostrar por consola la información del bloque
    toString(){
        //Pasamos los valores del bloque a variables individuales
        const { hash, height, body, time, previousBlockHash } = this;
        return `Block:
                Hash: ${hash}
                Height: ${height} 
                Body: ${body}
                Time: ${time}
                PreviousBlockHash: ${previousBlockHash}
                -----------------------------------------------------------------------------------`;
    }

    //Función para mostrar en HTML la información del bloque
    toHtml(){
        //Pasamos los valores del bloque a variables individuales
        const { hash, height, body, time, previousBlockHash } = this;

        const divB = document.createElement("p");
        divB.textContent = " Block:";
        divBlockchain.appendChild(divB);
        
        const divB1 = document.createElement("p");
        const str1 = " - Hash:"+hash;
        divB1.textContent = str1;
        divBlockchain.appendChild(divB1);

        const divB2 = document.createElement("p");
        const str2 = " - Height:"+height;
        divB2.textContent = str2;
        divBlockchain.appendChild(divB2);

        const divB3 = document.createElement("p");
        const str3 = " - Body:"+body;
        divB3.textContent = str3;
        divBlockchain.appendChild(divB3);

        const divB4 = document.createElement("p");
        const str4 = " - Time:"+time;
        divB4.textContent = str4;
        divBlockchain.appendChild(divB4);

        const divB5 = document.createElement("p");
        const str5 = " - PreviousBlockHash:"+previousBlockHash;
        divB5.textContent = str5;
        divBlockchain.appendChild(divB5);
    }
        
}