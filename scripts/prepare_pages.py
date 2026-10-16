"""Set absolute metadata URLs for this GitHub Pages repository."""

import os
from pathlib import Path


source_origin = "https://shelly-creative-portfolio.sturdypear33.chatgpt.site"
repository = os.environ["GITHUB_REPOSITORY"]
owner, name = repository.split("/", 1)
pages_origin = f"https://{owner.lower()}.github.io"
pages_base = pages_origin if name.lower() == f"{owner.lower()}.github.io" else f"{pages_origin}/{name}"
public = Path(__file__).resolve().parents[1] / "public"

for path in public.rglob("*"):
    if path.is_file() and path.suffix in {".html", ".xml", ".txt"}:
        content = path.read_text(encoding="utf-8")
        path.write_text(content.replace(source_origin, pages_base), encoding="utf-8")

print(f"Prepared absolute links for {pages_base}")
