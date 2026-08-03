#!/usr/bin/env bash

set -euo pipefail

release_id="${1:-}"
if [[ ! "$release_id" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Invalid release id" >&2
  exit 1
fi

base_dir="/opt/emilyfield-blog"
release_dir="$base_dir/releases/$release_id"
archive="$base_dir/shared/release.tar.gz"
next_env="$base_dir/shared/.env.next"
current_link="$base_dir/current"
next_link="$base_dir/current.next"
previous_release="$(readlink -f "$current_link" 2>/dev/null || true)"

rm -rf "$release_dir"
mkdir -p "$release_dir"
tar -xzf "$archive" -C "$release_dir"
rm -f "$archive"

mv "$next_env" "$base_dir/shared/.env"
chmod 600 "$base_dir/shared/.env"

ln -sfn "$release_dir" "$next_link"
mv -Tf "$next_link" "$current_link"

if ! sudo /usr/bin/systemctl restart emilyfield-blog || ! sudo /usr/bin/systemctl is-active emilyfield-blog >/dev/null; then
  if [[ -n "$previous_release" && -d "$previous_release" ]]; then
    ln -sfn "$previous_release" "$next_link"
    mv -Tf "$next_link" "$current_link"
    sudo /usr/bin/systemctl restart emilyfield-blog
  fi
  echo "Deployment failed; restored the previous release when available" >&2
  exit 1
fi

echo "Deployed release $release_id"
