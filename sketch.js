let characterSprite; // 載入角色的橫向精靈圖。
let characterX; // 記錄角色在畫布上的水平位置。
let characterY; // 記錄角色在畫布上的垂直位置。
let characterDirection = 1; // 記錄角色方向，1 為向右，-1 為向左。
let animationFrame = 0; // 記錄目前播放的精靈圖影格。
let animationCounter = 0; // 累計影格時間以控制動畫速度。
const spriteFrameCount = 7; // 設定精靈圖中的圖片數量。
const spriteSheetWidth = 450; // 設定精靈圖檔的總寬度。
const spriteSheetHeight = 88; // 設定精靈圖檔的總高度。
const characterSpeed = 5; // 設定角色每次繪製時的移動速度。
const characterScale = 2; // 設定角色顯示尺寸的縮放比例。

function preload() { // 在畫面建立前載入角色精靈圖。
  characterSprite = loadImage("1/跑/All.png"); // 載入指定的七格角色精靈圖。
} // 結束載入函式。

function setup() { // 設定 p5.js 畫布與角色初始位置。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的畫布。
  characterX = width / 2; // 將角色初始水平位置設在畫面中央。
  characterY = height / 2; // 將角色初始垂直位置設在畫面中央。
  imageMode(CENTER); // 讓角色的位置代表圖片中心點。
  noSmooth(); // 保留精靈圖像素邊緣的清晰感。
} // 結束設定函式。

function draw() { // 每個畫面影格更新角色並繪製畫面。
  background("#ade8f4"); // 使用指定的淺藍色清除畫布。
  let isMoving = false; // 預設角色目前沒有移動。

  if (keyIsDown(RIGHT_ARROW)) { // 檢查是否按住鍵盤右方向鍵。
    characterX += characterSpeed; // 將角色向右移動。
    characterDirection = 1; // 設定角色朝向右方。
    isMoving = true; // 標記角色正在移動。
  } // 結束右方向鍵判斷。

  if (keyIsDown(LEFT_ARROW)) { // 檢查是否按住鍵盤左方向鍵。
    characterX -= characterSpeed; // 將角色向左移動。
    characterDirection = -1; // 設定角色朝向左方。
    isMoving = true; // 標記角色正在移動。
  } // 結束左方向鍵判斷。

  characterX = constrain(characterX, 0, width); // 避免角色水平位置超出畫布範圍。

  if (isMoving) { // 只有移動時才播放跑步動畫。
    animationCounter += 1; // 累計動畫播放時間。
    if (animationCounter >= 6) { // 每六個畫面影格切換一次精靈圖片。
      animationFrame = (animationFrame + 1) % spriteFrameCount; // 切換到下一格並循環播放。
      animationCounter = 0; // 重設動畫計時器。
    } // 結束動畫影格切換判斷。
  } else { // 角色停止時回到第一格圖片。
    animationFrame = 0; // 顯示精靈圖中的第一格。
    animationCounter = 0; // 清除累積的動畫時間。
  } // 結束移動狀態判斷。

  push(); // 暫存目前的繪圖設定。
  translate(characterX, characterY); // 將座標原點移至角色中心。
  scale(characterDirection * characterScale, characterScale); // 依方向翻轉並放大角色。
  image( // 繪製目前的精靈圖影格。
    characterSprite, // 指定要繪製的角色圖片。
    0, // 設定角色圖片中心的水平座標。
    0, // 設定角色圖片中心的垂直座標。
    (spriteSheetWidth / spriteFrameCount) * characterScale, // 設定單格圖片的顯示寬度。
    spriteSheetHeight * characterScale, // 設定單格圖片的顯示高度。
    animationFrame * (spriteSheetWidth / spriteFrameCount), // 設定精靈圖裁切區域的水平起點。
    0, // 設定精靈圖裁切區域的垂直起點。
    spriteSheetWidth / spriteFrameCount, // 設定精靈圖裁切區域的寬度。
    spriteSheetHeight // 設定精靈圖裁切區域的高度。
  ); // 結束繪製角色圖片。
  pop(); // 還原先前的繪圖設定。
} // 結束畫面更新函式。

function windowResized() { // 視窗尺寸改變時同步調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小。
  characterX = constrain(characterX, 0, width); // 確保角色仍位於新畫布範圍內。
  characterY = constrain(characterY, 0, height); // 確保角色仍位於新畫布範圍內。
} // 結束視窗尺寸調整函式。
