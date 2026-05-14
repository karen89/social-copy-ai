//Fluxo de trabalho:
// 1.  Usuário clica no botão
async function gerarLegenda(){
    // 2. JS pega os valores do textarea, rede social, tom
    const textoUsuario = document.getElementById("descricao").value;
    const redeSocial = document.getElementById("redes-sociais").value;
    const tom = document.getElementById("tons").value;  

    // 3. JS valida o que o usário informou
    if(textoUsuario === ''){
        alert("Descrição invalida")
        return;
    }
    // 4. JS monta o prompt que vai para IA
    const prompt = `Crie uma legenda para ${redeSocial} com tom ${tom} sobre: ${textoUsuario}`

    // 5. JS chama a API envia o prompt e aguarda
        const response = await fetch("http://localhost:3000/gerar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: prompt })
});
    // 6. JS recebe a resposta e mostra em forma de HTML o resultado
    const data = await response.json();
    console.log(data);
    const textoGerado = data.content[0].text;
    document.getElementById("resultado").style.display = "block";
    document.getElementById("texto-gerado").innerText = textoGerado;

}
