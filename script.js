document.getElementById("convert-btn").addEventListener("click", () => {
    const inputLink = document.getElementById("input-link").value.trim();
    const linkType = document.getElementById("link-type").value;

    let ticket = inputLink.match(/g2\/([a-zA-Z0-9_-]+)/);
    if (!ticket || ticket.length < 2) {
        alert("無効なリンク形式です。正しいリンクを入力してください。");
        return;
    }

    ticket = ticket[1];
    let convertedLink;

    switch (linkType) {
        case "report":
            convertedLink = `line://square/report?ticket=${ticket}`;
            break;
        case "invite":
            convertedLink = `line://square/ti/g2/${ticket}`;
            break;
        case "join":
            convertedLink = `line://square/join?ticket=${ticket}`;
            break;
        case "browser":
            convertedLink = `https://square-api.line.me/smw/v2/static/sm/html/#/squareCover/${ticket}`;
            break;
        default:
            alert("形式を選択してください。");
            return;
    }

    const resultDiv = document.getElementById("result");
    const convertedLinkElement = document.getElementById("converted-link");

    convertedLinkElement.textContent = convertedLink;
    resultDiv.style.display = "block";

    document.getElementById("copy-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(convertedLink)
            .then(() => alert("リンクがコピーされました！"))
            .catch(err => alert("コピーに失敗しました: " + err));
    });
});
