import csv
import io
import logging
from typing import Dict, Any, List

logger = logging.getLogger("nexus.rag.parsers.csv")


class CSVParser:
    """
    Tabular CSV Dataset Parser converting rows to natural language schema chunks.
    """

    @classmethod
    def parse_csv_bytes(cls, content_bytes: bytes, max_rows: int = 1000) -> Dict[str, Any]:
        text_rows = []
        full_text = ""

        try:
            string_io = io.StringIO(content_bytes.decode("utf-8", errors="ignore"))
            reader = csv.reader(string_io)
            headers = next(reader, None)

            if headers:
                full_text += f"Dataset Columns: {', '.join(headers)}\n\n"
                for idx, row in enumerate(reader):
                    if idx >= max_rows:
                        break
                    row_desc = f"Record #{idx+1}: " + ", ".join([f"{h}={v}" for h, v in zip(headers, row)])
                    text_rows.append(row_desc)
                    full_text += row_desc + "\n"
        except Exception as e:
            logger.warning(f"CSV extraction fallback: {e}")
            full_text = content_bytes.decode("utf-8", errors="ignore")

        return {
            "total_records": len(text_rows),
            "full_text": full_text.strip(),
            "records": text_rows
        }


csv_parser = CSVParser()
