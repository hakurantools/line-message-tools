function generateShareLinks() {
    const inputText = document.getElementById('inputText').value;
    if (!inputText) {
        alert("テキストを入力してください");
        return;
    }

    // テキストを行ごとに分割
    const lines = inputText.split('\n');
    const lineLinks = [];

    // 各行にランダムなバイナリコードを追加
    lines.forEach(line => {
        if (line.trim() !== "") {
            const randomBinary = generateRandomBinary();
            const modifiedLine = `${line} ${randomBinary}`;
            const encodedMessage = encodeURIComponent(modifiedLine);
            const shareLink = `https://line.me/R/msg/text/${encodedMessage}`;

            // リダイレクトを加えるためにaタグを表示
            lineLinks.push(`<a href="${shareLink}" target="_blank" onclick="redirectToShareLink(event, '${shareLink}')">${shareLink}</a>`);
        }
    });

    // 結果を表示
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = lineLinks.join('<br>');

    // コピー用ボタンを表示
    document.getElementById('copyButton').style.display = 'block';
}

function generateRandomBinary() {
    const randomNum = Math.floor(Math.random() * 16); // 16進数のバイナリ生成
    return `#${randomNum.toString(2).padStart(4, '0')}`;  // バイナリ形式
}

function redirectToShareLink(event, url) {
    // リダイレクト前に任意の処理を追加可能
    event.preventDefault(); // デフォルトのリンククリック動作を停止
    window.location.href = url; // リダイレクト
}

function copyLink() {
    const resultText = document.getElementById('result').textContent;
    navigator.clipboard.writeText(resultText).then(() => {
        alert('リンクがコピーされました！');
    });
}
