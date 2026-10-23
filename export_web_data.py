"""정제 CSV(data/toilets_clean.csv)를 정적 웹페이지용 JSON(web/toilets.json)으로 변환한다.

API는 호출하지 않는다. CSV가 바뀔 때마다 한 번 실행한다.
    python export_web_data.py
"""
import json
from pathlib import Path

import pandas as pd

CSV_PATH = Path("data/toilets_clean.csv")
JSON_PATH = Path("web/toilets.json")
# 컬럼 약속(CLAUDE.md 9번) 그대로 사용한다
COLUMNS = ["이름", "주소", "구", "위도", "경도", "개방시간", "개방구분", "장애인용"]


def main():
    df = pd.read_csv(CSV_PATH)[COLUMNS]
    df["장애인용"] = df["장애인용"].astype(bool)
    JSON_PATH.parent.mkdir(exist_ok=True)
    # 브라우저에서 바로 쓰도록 레코드 배열로 저장 (용량 줄이려고 공백 없이)
    records = df.to_dict(orient="records")
    JSON_PATH.write_text(
        json.dumps(records, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"{len(records):,}건 -> {JSON_PATH}")


if __name__ == "__main__":
    main()
