import { pegaArquivoTest } from "..";

const arrayResult = [
    {
      FileList: `https://developer.mozilla.org/pt-BR/docs/Web/API/FileList`,
    },
];

describe("pegaArquivoTest::", () => {
  it("deve ser uma função", () => {
    expect(typeof pegaArquivoTest).toBe("function");
  });

  it("deve retornar array com resultados", async () => {
    const result = await pegaArquivoTest("./test/arquivos/texto1.md");
    expect(result).toEqual(arrayResult);
  });

  it("deve retornar mensagem 'Não há links' ", async () => {
      const result = await pegaArquivoTest("./test/arquivos/texto2.md");

      expect(result).toBe("Não há links");
  });

  it('deve lançar um erro na falta de arquivo', async () => {
    await expect(pegaArquivoTest('./test/arquivos_test/')).rejects.toThrow(/não há arquivo no caminho/)
  });
  it('deve resolver a função com sucesso', async () => {
    await expect(pegaArquivoTest('./test/arquivos/texto1.md')).resolves.toEqual(arrayResult)
  });
});
