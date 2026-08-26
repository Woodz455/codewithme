#!/usr/bin/env bash
#
# Verifie ce qu'electron-builder a reellement produit pour Windows.
#
# Ce fichier existe parce que la meme verification, ecrite en ligne dans le
# workflow, a fait echouer une construction pourtant reussie : les deux .exe
# etaient la, mais `ls dist/*nsis*.exe` ne correspondait a rien, bash passait
# la chaine litterale a `ls`, qui sortait en code 2 — propage par `pipefail`
# et fatal sous `-e`.
#
# La lecon n'est pas « attention aux globs » mais « du code qui ne vit que
# dans un workflow n'est jamais eprouve ». Ici il l'est : `npm test` le lance
# sur un faux dossier dist, avec les memes options de shell que GitHub.
#
# Usage : verifier-paquet-windows.sh [dossier-dist]

set -euo pipefail

dist="${1:-dist}"

# Sans nullglob, un motif sans correspondance est passe tel quel a la commande
# suivante — c'est exactement ce qui a casse la version precedente.
shopt -s nullglob

installateurs=("$dist"/*Setup*.exe)
portables=("$dist"/*portable*.exe)

# Un .exe minuscule est pire qu'un .exe absent : il se telecharge, se
# double-clique, et ne fait rien. L'installateur reel pese ~117 Mo ; le stub
# produit par une construction interrompue en pesait 0,3.
TAILLE_MINIMALE=$((20 * 1024 * 1024))

probleme=0

controler() {
  local libelle="$1" chemin="$2"

  if [ -z "$chemin" ]; then
    echo "ECHEC  $libelle introuvable dans $dist/"
    probleme=1
    return
  fi

  local taille
  taille=$(stat -c%s "$chemin" 2>/dev/null || stat -f%z "$chemin")

  if [ "$taille" -lt "$TAILLE_MINIMALE" ]; then
    echo "ECHEC  $libelle ne pese que $taille octets — construction incomplete"
    echo "       $chemin"
    probleme=1
    return
  fi

  printf 'ok     %-14s %s (%s Mo)\n' "$libelle" "$(basename "$chemin")" "$((taille / 1024 / 1024))"
}

echo
echo "Fichiers produits pour Windows"
echo

controler "installateur" "${installateurs[0]:-}"
controler "portable" "${portables[0]:-}"

if [ "$probleme" -ne 0 ]; then
  echo
  echo "Contenu reel de $dist/ :"
  ls -la "$dist/" || echo "  (dossier absent)"
  echo
  exit 1
fi

echo
echo "  Les deux fichiers sont presents et de taille plausible."
echo
