function generateShareLinks() {
    const inputText = document.getElementById('inputText').value;
    if (!inputText) {
        alert("テキストを入力してください");
        return;
    }

    // テキストを1行にする
    const line = inputText.trim();

    // 200回繰り返してメッセージを縦に表示
    let shareLinks = [];
    for (let i = 0; i < 200; i++) {
        const randomBinary = generateRandomBinary(); // ランダムな二進数
        const modifiedLine = `${line} ${randomBinary}`; // メッセージに二進数を追加
        const encodedMessage = encodeURIComponent(modifiedLine); // エンコード
        const shareLink = `https://line.me/R/msg/text/${encodedMessage}`;

        // リンクリストに追加
        shareLinks.push(`<a href="${shareLink}" target="_blank" onclick="redirectToShareLink(event, '${shareLink}')">${shareLink}</a>`);
    }

    // 結果を縦に表示
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = shareLinks.join('<br>');

    // コピー用ボタンを表示
    document.getElementById('copyButton').style.display = 'block';
}

function generateRandomBinary() {
    // ランダムな4桁の二進数を生成
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

