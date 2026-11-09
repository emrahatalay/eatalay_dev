#!/usr/bin/env bash
# Sunucunun ortak bun'ını (root'un /root/.bun/bin/bun) en az 1.4.2 yapar; deploy iş akışı ve kurulum.sh çağırır.
# bun 1.3.10 Next 16'nın sunucu çalışma zamanını yükleyemiyor (her sayfa 500). Daha yeni bir sürüm kuruluysa dokunulmaz.
# Huzuru İslam ve Hatim App ile aynı sunucuda ortak bun kullanılır; bu betik onu asla eski sürüme indirmez.
set -euo pipefail
EN_AZ=1.4.2
BUN=/root/.bun/bin/bun

simdiki="$("$BUN" --version 2>/dev/null || echo 0)"
if [ "$(printf '%s\n%s\n' "$EN_AZ" "$simdiki" | sort -V | head -1)" != "$EN_AZ" ]; then
  echo "bun $simdiki → $EN_AZ"
  command -v unzip >/dev/null || DEBIAN_FRONTEND=noninteractive apt-get install -y -q unzip
  curl -fsSL https://bun.sh/install | bash -s "bun-v$EN_AZ"
fi
echo "bun $("$BUN" --version)"
