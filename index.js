import chalk from "chalk";
import fs from "fs";
import path from "path";

const log = console.log;

function extraiTexto(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];
  let temp;
  while ((temp = regex.exec(texto)) !== null) {
    arrayResultados.push({ [temp[1]]: temp[2] });
  }
  return arrayResultados.length === 0 ? "Não há links" : arrayResultados;
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "não há arquivo no caminho!"));
}

export async function pegaArquivo(caminho) {
  const caminhoAbsoluto = path.join(path.resolve(), ".", caminho);
  const encoding = "utf-8";
  const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });

  const result = await Promise.all(
    arquivos.map(async (arquivo) => {
      const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
      const texto = await fs.promises.readFile(localArquivo, encoding);
      return extraiTexto(texto);
    })
  );

  return result;
}

export async function pegaArquivoTest(caminhoDoArquivo) {
  const encoding = "utf-8";
  try {
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiTexto(texto);
  } catch (erro) {
    trataErro(erro);
  } finally {
    log(chalk.yellow("Comportamento async executado com sucesso!"));
  }
}
