import chalk from "chalk";
import fs from 'fs';
import path from "path";

const log = console.log;
const arquivoUrl = './arquivos/texto1.md';

function extraiTexto(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const arrayResultados = [];
    let temp;
    while((temp = regex.exec(texto)) !== null){
        arrayResultados.push({[ temp[1]]: temp[2]});
    }
    return arrayResultados.length === 0 ? chalk.red('Não há links') : arrayResultados;
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivo no caminho!'));
};

export default async function pegaArquivo(caminho){
    const caminhoAbsoluto = path.join(path.resolve(), '.', caminho);
    const encoding = 'utf-8';
    const arquivos = await fs.promises.readdir(caminhoAbsoluto,{ encoding });

    const result = await Promise.all(arquivos.map(async (arquivo) => {
        const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
        const texto = await fs.promises.readFile(localArquivo, encoding);
        return extraiTexto(texto);
      }));

    return result;
}
// export async function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     try{
//         const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
//         return extraiTexto(texto);
//     } catch (erro) {
//         trataErro(erro)
//     }
//     finally{
//         log(chalk.yellow("Comportamento async executado com sucesso!"));
//     }

// }

/* Função usando o .then() para assincrono  */
// function pegaArquivo( caminhoDoArquivo ){
//     const encoding = 'utf-8';
//         fs.promises.readFile(caminhoDoArquivo, encoding)
//         .then((response) => { log(chalk.green(response)) })
//         .catch((erro) => { trataErro(erro)})
// }
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, data) => {
//         if(erro){
//             trataErro(erro);
//         }else{
//             log(chalk.green(data));
//         };
//     })
// };

//pegaArquivo(arquivoUrl);