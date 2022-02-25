import fetch from "node-fetch";

function tratamento(erro) {
  throw new Error(erro.message);
}

async function checaStatus(urls) {
  try {
    const status = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url);
        return `${res.status} - ${res.statusText}`;
      })
    );
    return status;
  } catch (erro) {
    tratamento(erro);
  }
}

function geraArrayURLs(urls) {
  return urls.map((url) => Object.values(url).join());
}

export async function validaURLs(urls) {
  const links = geraArrayURLs(urls);
  const status = await checaStatus(links);
  const resultados = urls.map((url, index) => ({
    ...url,
    status: status[index],
  }));
  return resultados;
}
