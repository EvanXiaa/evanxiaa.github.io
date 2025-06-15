let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = "小夜";

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// 防止 `null` 变成 `"null"`
if (username) {
    questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
    "？你认真的吗…",
    "要不再想想？",
    "不许选这个！ ",
    "我会很伤心…",
    "不行:(",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
    clickCount++;

    // 让 Yes 变大，每次放大 2 倍
    let yesSize = 1 + clickCount * 1.2;
    yesButton.style.transform = `scale(${yesSize})`;

    // 挤压 No 按钮，每次右移 50px
    let noOffset = clickCount * 50;
    noButton.style.transform = `translateX(${noOffset}px)`;

    // 让图片和文字往上移动
    let moveUp = clickCount * 25;
    mainImage.style.transform = `translateY(-${moveUp}px)`;
    questionText.style.transform = `translateY(-${moveUp}px)`;

    // No 文案变化（前 5 次变化）
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }

    // 图片变化（前 5 次变化）
    if (clickCount === 1) mainImage.src = "images/smallcry.png"; // 震惊
    if (clickCount === 2) mainImage.src = "images/smallcry.png"; // 思考
    if (clickCount === 3) mainImage.src = "images/smallcry.png"; // 生气
    if (clickCount === 4) mainImage.src = "images/cry.png"; // 哭
    if (clickCount >= 5) mainImage.src = "images/cry.png"; // 之后一直是哭
});

// Yes 按钮点击后，进入表白成功页面
const loveTest = `!!!喜欢你!! ( >᎑<)♡︎ᐝ  ${
    username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

const targetURL = 'https://pan.quark.cn/s/b1ecfe55d868';

yesButton.addEventListener("click", function () {
    // Clear existing body content to prepare for the new screen
    document.body.innerHTML = '';

    // Create the main container for the "yes" screen
    const yesScreenDiv = document.createElement('div');
    yesScreenDiv.className = 'yes-screen';
    document.body.appendChild(yesScreenDiv);

    // Create and append the heading
    const yesTextH1 = document.createElement('h1');
    yesTextH1.className = 'yes-text';
    yesTextH1.innerText = loveTest;
    yesScreenDiv.appendChild(yesTextH1);

    // Create and append the image (initially happy.png)
    const yesImage = document.createElement('img');
    yesImage.src = "images/happy.png"; // First image: happy.png
    yesImage.alt = "happy";
    yesImage.className = "yes-image";
    yesScreenDiv.appendChild(yesImage);

    // After 1 second, change the image to gift.png and make it a link
    setTimeout(() => {
        yesImage.src = "images/gift.png"; // Second image: gift.png
        yesImage.alt = "gift";

        // Wrap the image in an anchor tag to make it clickable
        const link = document.createElement('a');
        link.href = targetURL;
        // Optional: Open in a new tab
        // link.target = "_blank";
        yesScreenDiv.replaceChild(link, yesImage); // Replace the existing image with the link
        link.appendChild(yesImage); // Put the image inside the link
    }, 1000); // 1000 milliseconds = 1 second

    // 禁止滚动，保持页面美观
    document.body.style.overflow = "hidden";
});