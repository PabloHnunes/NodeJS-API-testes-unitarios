import chalk from "chalk";
import { pegaArquivo } from "./index.js";
import { validaURLs } from "./http-validacoes.js";

const caminho = process.argv;

async function processaTexto(caminhoDeArquivo) {
  const resultado = await pegaArquivo(caminhoDeArquivo[2]);
  if (caminho[3] === "validar") {
    console.log(
      chalk.yellow("Links validados"),
      await Promise.all(resultado.map((res) => validaURLs(res)))
    );
  } else {
    console.log(chalk.yellow("Lista de links"), resultado);
  }
}

processaTexto(caminho);
