#!/usr/bin/env bash
set -e

echo "[Pre-commit] Запуск перевірок якості коду..."

if command -v nix &> /dev/null; then
    nix develop --command npm run check
else
    npm run check
fi

echo "[Pre-commit] Успішно! Коміт дозволено."
