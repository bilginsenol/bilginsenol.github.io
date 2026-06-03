#!/usr/bin/env sh
# Assemble the published site into _site/.
#
# Layout rule: top-level files (index.html, more-works.js, ...) go to the site
# root, and each publications/<name>/ is FLATTENED to the root as /<name>/ so
# the public URL is bilginsenol.github.io/<name>/ (not /publications/<name>/).
#
# Used by both local preview and the GitHub Actions deploy workflow.
set -e

rm -rf _site
mkdir -p _site

# Everything at the repo root except the dirs we handle specially.
rsync -a \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='publications' \
  --exclude='_site' \
  --exclude='build.sh' \
  ./ _site/

# Flatten publications/* to the root: publications/tptf -> _site/tptf
# NOTE: tptf is temporarily withheld from publication while the paper is under
# double-blind review (so the public /tptf/ URL stays a 404 and can't
# de-anonymize the submission). Files remain in the repo; remove this exclude
# to republish after review.
rsync -a --exclude='tptf' publications/ _site/

echo "Built _site/"
echo "Preview with: (cd _site && python3 -m http.server 8000)"
