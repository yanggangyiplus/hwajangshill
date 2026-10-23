// 배포(빌드) 시 환경 변수 KAKAO_JS_KEY로 web/config.js를 만든다.
// 키가 코드·레포에 남지 않도록 하는 용도. JavaScript 키만 사용한다. (REST 키 금지)
// Vercel: Project Settings > Environment Variables 에 KAKAO_JS_KEY 등록
// 로컬:   node build-config.js  (환경 변수가 없으면 .env 의 KAKAO_JS_KEY를 읽는다)
const fs = require("fs");

// 환경 변수에 없으면 .env 파일에서 찾는다
function readKey() {
  if (process.env.KAKAO_JS_KEY) return process.env.KAKAO_JS_KEY;
  if (!fs.existsSync(".env")) return "";
  const line = fs
    .readFileSync(".env", "utf8")
    .split("\n")
    .find((l) => l.startsWith("KAKAO_JS_KEY="));
  return line ? line.slice("KAKAO_JS_KEY=".length).trim() : "";
}

const key = readKey();
if (!key) console.warn("경고: KAKAO_JS_KEY가 없어 지도가 표시되지 않습니다.");

fs.writeFileSync("web/config.js", `window.KAKAO_JS_KEY = ${JSON.stringify(key)};\n`);
console.log("web/config.js 생성 완료");
