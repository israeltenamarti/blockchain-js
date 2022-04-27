//Clase para generar un Bloque, es decir, cada pieza o componente de nuestra Blockchain
//-------------------------------------------------------------------------------------

//Constante que nos permite Gestionar el algoritmo de Minado. Si se están minando muchos bloques a la vez, ampliamos la dificultad. Si se están minando pocos, pues la bajamos.
const DIFFICULTY = 3;

//Tasa de minado, milisengundos entre iteraciones de cálculo
const MINE_RATE = 3000;

class Block{
    constructor(time, previousBlockHash, hash, data, nonce, difficulty, height){
        this.time = time;                                                     //Timestamp de cuando se agrega el bloque a la blockchain
        this.previousBlockHash = previousBlockHash;                           //Hash del bloque anterior
        this.hash = hash;                                                     //Cada bloque tiene un hash que en la creación esta vacio. Se rellena al agregarlo a la blockchain.
        this.height = height;                                                 //Numero de bloque dentro de la cadena
        this.data = JSON.stringify(data).toString('hex');                     //Cuerpo del bloque que lo serializamos y los pasamos a hexadecimal
        this.nonce = nonce;                                                   //Es el número de vueltas que va a dar el algoritmo hasta que encontremos 
        this.difficulty = difficulty;                                         //Dificultad que queremos aplicar al Algoritmo
    }

    //Funcion estatíca que nos permite ejecutarla sin crear un nuevo bloque
    static get genesis(){
        console.log("1.- Constructor del Bloque Genesis");
        const divB = document.createElement("div");
        divB.textContent = "1.- Constructor del Bloque Genesis";
        divBlockchain.appendChild(divB);
            
        const time = new Date('2009-03-01').getTime();
        return new this(
            time,
            undefined,
            'genesis_hash',
            'Genesis Block',
            0,
            DIFFICULTY,
        );
    }

    //Funcion estatíca que nos permite ejecutarla sin crear un nuevo bloque
    static mine(previousBlock, data, height){
        const { hash: previousHash } = previousBlock;
        let { difficulty } = previousBlock;
        let hash;
        let time;
        let nonce = 0;
        do{
            time = Date.now();
            nonce +=  1;
            difficulty = previousBlock.time + MINE_RATE > time ? difficulty + 1 : difficulty - 1;
            hash = CryptoJS.SHA256(previousHash + time + data + nonce + difficulty).toString();
            //console.log(hash);  //Muestra todos los calculos
        }while(hash.substring(0,difficulty) != "0".repeat(difficulty));
        //El algoritmo obliga a que el hash tenga esa repetición y que obligue a calcular nuevos hases

        height +=  1;
        return new this(time, previousHash, hash, data, nonce, difficulty, height);
    }

    //Función para mostrar por consola la información del bloque
    toString(){
        //Pasamos los valores del bloque a variables individuales
        const { hash, height, data, time, previousBlockHash, nonce, difficulty } = this;
        return `Block:
                Hash: ${hash}
                Height: ${height} 
                Data: ${data}
                Time: ${time}
                PreviousBlockHash: ${previousBlockHash}
                Nonce: ${nonce}
                Dificulty: ${difficulty}
                -----------------------------------------------------------------------------------`;
    }

    //Función para mostrar en HTML la información del bloque
    toHtml(){
        //Pasamos los valores del bloque a variables individuales
        const { hash, height, data, time, previousBlockHash, nonce, difficulty } = this;

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
        const str3 = " - Data:"+data;
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

        const divB6 = document.createElement("p");
        const str6 = " - Nonce:"+nonce;
        divB6.textContent = str6;
        divBlockchain.appendChild(divB6);

        const divB7 = document.createElement("p");
        const str7 = " - Dificulty:"+difficulty;
        divB7.textContent = str7;
        divBlockchain.appendChild(divB7);
    }
        
}