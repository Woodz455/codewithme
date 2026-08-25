/**
 * Certificat de fin de parcours.
 *
 * Un document autonome, imprimable et exportable en PDF par le moteur
 * d'impression deja en place pour le bilan tuteur. Il porte le prenom de
 * l'eleve, le parcours acheve et la date.
 *
 * Contrainte a connaitre : le PDF est rendu dans une fenetre invisible chargee
 * depuis une URL `data:`, sans acces au protocole `app://`. Les polices
 * embarquees de l'application n'y sont donc PAS disponibles — ce document
 * n'emploie que des polices systeme, et dessine tout le reste en CSS.
 */
import { texte } from './core/i18n.js';
import * as store from './core/store.js';
import { PARCOURS, leconsDuParcours, nombreLeconsTotal } from '../content/parcours.js';

/** Un parcours est acheve quand toutes ses lecons sont terminees. */
export function parcoursAcheve(identifiant) {
  const lecons = leconsDuParcours(identifiant);
  return lecons.length > 0 && lecons.every((fiche) => store.leconTerminee(fiche.id));
}

/** La liste des parcours acheves, dans l'ordre du programme. */
export function parcoursAcheves() {
  return PARCOURS.filter((parcours) => parcoursAcheve(parcours.id));
}

/** Tout le programme est-il termine ? C'est le certificat le plus fort. */
export function toutAcheve() {
  return PARCOURS.every((parcours) => parcoursAcheve(parcours.id));
}

const echapper = (valeur) =>
  String(valeur ?? '').replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);

/**
 * Fabrique le document du certificat.
 * @param {object|null} parcours  le parcours acheve, ou null pour le programme entier
 */
export function construireCertificatHtml(parcours) {
  const profil = store.etat();
  const prenom = profil.prenom?.trim() || texte({ fr: 'l’élève', en: 'the student' });

  const intitule = parcours
    ? texte({ fr: `Parcours ${parcours.nom}`, en: `${parcours.nom} track` })
    : texte({ fr: 'Programme complet', en: 'Complete programme' });

  // Le nombre de lecons du parcours (ou du programme), pas un compteur vivant :
  // un certificat enonce un fait acquis, il ne suit pas la progression.
  const lecons = parcours ? leconsDuParcours(parcours.id).length : nombreLeconsTotal();
  const teinte = parcours?.couleurBrute || '#00E5FF';

  const detail = parcours
    ? texte({
        fr: `${lecons} leçons terminées, défis réussis et projets réalisés.`,
        en: `${lecons} lessons completed, challenges passed and projects built.`,
      })
    : texte({
        fr: `Les cinq langages et le grand projet final, soit ${lecons} leçons.`,
        en: `All five languages and the final project — ${lecons} lessons.`,
      });

  const date = new Date().toLocaleDateString(profil.langue === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `<!doctype html>
<html lang="${profil.langue === 'en' ? 'en' : 'fr'}">
<head>
<meta charset="utf-8">
<title>${echapper(texte({ fr: 'Certificat', en: 'Certificate' }))} — ${echapper(prenom)}</title>
<style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    color: #eef1ff;
    background: #0b0e1a;
  }
  .feuille {
    width: 297mm;
    height: 210mm;
    padding: 14mm;
    display: flex;
    background:
      radial-gradient(120% 90% at 12% 0%, ${teinte}22 0%, transparent 55%),
      radial-gradient(100% 80% at 92% 100%, #b14bff22 0%, transparent 55%),
      #0b0e1a;
  }
  /* Trois blocs : entete en haut, corps centre, pied en bas. Sans cette
     repartition explicite, les marges automatiques creusent deux vides au
     milieu de la feuille. */
  .cadre {
    flex: 1;
    border: 2px solid ${teinte}55;
    border-radius: 6mm;
    padding: 11mm 16mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }
  .entete { display: flex; flex-direction: column; gap: 1.5mm; }
  .surtitre {
    font-size: 10.5pt;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: ${teinte};
    margin: 0;
  }
  .marque { font-size: 9pt; letter-spacing: 0.34em; color: #7d88ad; margin: 0; }

  .corps { display: flex; flex-direction: column; align-items: center; }
  .decerne {
    font-size: 10.5pt;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #7d88ad;
    margin: 0 0 4mm;
  }
  h1 {
    font-size: 46pt;
    line-height: 1.05;
    margin: 0 0 5mm;
    font-weight: 700;
    background: linear-gradient(92deg, ${teinte} 15%, #b14bff 85%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .trait {
    width: 46mm;
    height: 2px;
    margin: 0 0 5mm;
    background: linear-gradient(90deg, transparent, ${teinte}, transparent);
  }
  .intitule { font-size: 19pt; font-weight: 600; margin: 0 0 2.5mm; }
  .detail { font-size: 10.5pt; color: #a9b3d4; margin: 0; }

  .pied {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 9pt;
    color: #7d88ad;
  }
  .pied strong { display: block; color: #eef1ff; font-size: 10.5pt; font-weight: 600; }
</style>
</head>
<body>
  <div class="feuille">
    <div class="cadre">
      <div class="entete">
        <p class="surtitre">${echapper(texte({ fr: 'Certificat de réussite', en: 'Certificate of achievement' }))}</p>
        <p class="marque">CODEWITHME</p>
      </div>

      <div class="corps">
        <p class="decerne">${echapper(texte({ fr: 'décerné à', en: 'awarded to' }))}</p>
        <h1>${echapper(prenom)}</h1>
        <div class="trait"></div>
        <p class="intitule">${echapper(intitule)}</p>
        <p class="detail">${echapper(detail)}</p>
      </div>

      <div class="pied">
        <span>${echapper(texte({ fr: 'Délivré le', en: 'Issued on' }))} <strong>${echapper(date)}</strong></span>
        <span>${echapper(
          texte({
            fr: 'Apprentissage du code — Python · HTML · CSS · JavaScript · C++',
            en: 'Learning to code — Python · HTML · CSS · JavaScript · C++',
          })
        )}</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Propose l'enregistrement du certificat en PDF.
 * @returns {Promise<{annule:boolean, chemin?:string}>}
 */
export function enregistrerCertificat(parcours) {
  const nom = (store.etat().prenom || 'eleve')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  return window.cwm.rapport.exporter({
    html: construireCertificatHtml(parcours),
    format: 'pdf',
    paysage: true,
    titre: texte({ fr: 'Enregistrer le certificat', en: 'Save the certificate' }),
    nomSuggere: `codewithme-certificat-${parcours ? parcours.id : 'complet'}-${nom || 'eleve'}.pdf`,
  });
}
