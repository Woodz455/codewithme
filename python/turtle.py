"""
Module `turtle` de CodeWithMe.

Pyodide ne fournit pas le module `turtle` de CPython (celui-ci repose sur
Tkinter, absent du navigateur). Cette implementation reproduit l'API standard
— memes noms de fonctions, memes abreviations, memes conventions d'angles et
de coordonnees — mais dessine sur un canevas HTML au lieu d'une fenetre.

L'eleve apprend donc le vrai `turtle` : le code qu'il ecrit ici fonctionnera
tel quel sur un ordinateur avec Python installe.

Reperes, identiques a CPython :
  - l'origine (0, 0) est au centre de l'ecran ;
  - l'axe des y pointe vers le haut ;
  - la tortue demarre au centre, tournee vers la droite (cap 0 degre) ;
  - les angles augmentent dans le sens antihoraire.
"""

import math

from cwm_pont import dessin as _envoyer

__all__ = [
    "forward", "fd", "backward", "back", "bk", "right", "rt", "left", "lt",
    "goto", "setpos", "setposition", "setx", "sety", "setheading", "seth",
    "home", "circle", "dot", "penup", "pu", "up", "pendown", "pd", "down",
    "pensize", "width", "pencolor", "fillcolor", "color", "begin_fill",
    "end_fill", "speed", "clear", "reset", "write", "hideturtle", "ht",
    "showturtle", "st", "position", "pos", "xcor", "ycor", "heading",
    "isdown", "bgcolor", "done", "mainloop", "exitonclick", "Screen", "Turtle",
]


def _couleur(valeur):
    """Accepte 'red', '#ff0000' ou (255, 0, 0), comme le vrai turtle."""
    if isinstance(valeur, (tuple, list)):
        composantes = list(valeur[:3])
        if all(isinstance(c, float) and 0 <= c <= 1 for c in composantes):
            composantes = [round(c * 255) for c in composantes]
        r, v, b = (max(0, min(255, int(c))) for c in composantes)
        return f"rgb({r},{v},{b})"
    return str(valeur)


class Turtle:
    """Une tortue. La plupart des programmes utilisent la tortue par defaut."""

    def __init__(self):
        self.x = 0.0
        self.y = 0.0
        self.cap = 0.0            # en degres, 0 = vers la droite
        self.stylo_baisse = True
        self.couleur_trait = "black"
        self.couleur_remplissage = "black"
        self.epaisseur = 1
        self.vitesse = 6
        self.visible = True
        self._remplissage_en_cours = None

    # -- communication avec le canevas ------------------------------------
    def _emettre(self, **commande):
        _envoyer(commande)

    def _etat_tortue(self):
        self._emettre(
            c="tortue", x=self.x, y=self.y, cap=self.cap, visible=self.visible
        )

    # -- deplacements ------------------------------------------------------
    def _aller(self, x, y, trace=True):
        depart = (self.x, self.y)
        self.x, self.y = float(x), float(y)

        if self._remplissage_en_cours is not None:
            self._remplissage_en_cours.append((self.x, self.y))

        if trace and self.stylo_baisse:
            self._emettre(
                c="ligne",
                x1=depart[0], y1=depart[1],
                x2=self.x, y2=self.y,
                couleur=self.couleur_trait,
                epaisseur=self.epaisseur,
                vitesse=self.vitesse,
            )
        else:
            self._emettre(c="sauter", x=self.x, y=self.y)
        self._etat_tortue()

    def forward(self, distance):
        radians = math.radians(self.cap)
        self._aller(self.x + distance * math.cos(radians),
                    self.y + distance * math.sin(radians))

    def backward(self, distance):
        self.forward(-distance)

    def right(self, angle):
        self.cap = (self.cap - angle) % 360
        self._etat_tortue()

    def left(self, angle):
        self.cap = (self.cap + angle) % 360
        self._etat_tortue()

    def goto(self, x, y=None):
        if y is None:
            x, y = x
        self._aller(x, y)

    def setx(self, x):
        self._aller(x, self.y)

    def sety(self, y):
        self._aller(self.x, y)

    def setheading(self, angle):
        self.cap = float(angle) % 360
        self._etat_tortue()

    def home(self):
        self._aller(0, 0)
        self.setheading(0)

    def circle(self, rayon, extent=None, steps=None):
        """Arc de cercle. Le centre est a gauche de la tortue, comme en CPython."""
        if extent is None:
            extent = 360
        if steps is None:
            # Assez de segments pour que le cercle paraisse lisse, sans exces.
            steps = max(4, int(abs(extent) / 5) + 1)

        angle_pas = float(extent) / steps
        # Longueur de corde pour un pas d'angle donne.
        longueur_pas = 2 * rayon * math.sin(math.radians(angle_pas) / 2)

        self.left(angle_pas / 2)
        for _ in range(steps):
            self.forward(longueur_pas)
            self.left(angle_pas)
        self.right(angle_pas / 2)

    def dot(self, taille=None, couleur=None):
        diametre = taille if taille else max(self.epaisseur + 4, 2 * self.epaisseur)
        self._emettre(
            c="point", x=self.x, y=self.y, taille=diametre,
            couleur=_couleur(couleur) if couleur else self.couleur_trait,
        )

    # -- stylo -------------------------------------------------------------
    def penup(self):
        self.stylo_baisse = False

    def pendown(self):
        self.stylo_baisse = True

    def isdown(self):
        return self.stylo_baisse

    def pensize(self, largeur=None):
        if largeur is None:
            return self.epaisseur
        self.epaisseur = max(1, int(largeur))
        return None

    def pencolor(self, *args):
        if not args:
            return self.couleur_trait
        self.couleur_trait = _couleur(args[0] if len(args) == 1 else args)
        return None

    def fillcolor(self, *args):
        if not args:
            return self.couleur_remplissage
        self.couleur_remplissage = _couleur(args[0] if len(args) == 1 else args)
        return None

    def color(self, *args):
        """color(trait) ou color(trait, remplissage), comme en CPython."""
        if not args:
            return (self.couleur_trait, self.couleur_remplissage)
        if len(args) == 1:
            self.couleur_trait = self.couleur_remplissage = _couleur(args[0])
        else:
            self.couleur_trait = _couleur(args[0])
            self.couleur_remplissage = _couleur(args[1])
        return None

    def begin_fill(self):
        self._remplissage_en_cours = [(self.x, self.y)]

    def end_fill(self):
        if self._remplissage_en_cours and len(self._remplissage_en_cours) > 2:
            self._emettre(
                c="remplir",
                points=[list(point) for point in self._remplissage_en_cours],
                couleur=self.couleur_remplissage,
            )
        self._remplissage_en_cours = None

    # -- affichage ---------------------------------------------------------
    def speed(self, valeur=None):
        if valeur is None:
            return self.vitesse
        if isinstance(valeur, str):
            valeur = {"fastest": 0, "fast": 10, "normal": 6, "slow": 3, "slowest": 1}.get(valeur, 6)
        self.vitesse = max(0, min(10, int(valeur)))
        return None

    def hideturtle(self):
        self.visible = False
        self._etat_tortue()

    def showturtle(self):
        self.visible = True
        self._etat_tortue()

    def write(self, texte, move=False, align="left", font=("Arial", 12, "normal")):
        taille = font[1] if isinstance(font, (tuple, list)) and len(font) > 1 else 12
        self._emettre(
            c="ecrire", x=self.x, y=self.y, texte=str(texte),
            couleur=self.couleur_trait, taille=taille, alignement=align,
        )

    def clear(self):
        self._emettre(c="effacer")

    def reset(self):
        self.__init__()
        self._emettre(c="effacer")
        self._etat_tortue()

    # -- lecture d'etat ----------------------------------------------------
    def position(self):
        return (self.x, self.y)

    def xcor(self):
        return self.x

    def ycor(self):
        return self.y

    def heading(self):
        return self.cap


class _Ecran:
    """Equivalent minimal de turtle.Screen()."""

    def bgcolor(self, couleur=None):
        if couleur is None:
            return "white"
        _envoyer({"c": "fond", "couleur": _couleur(couleur)})
        return None

    def title(self, _titre):
        return None

    def setup(self, *_args, **_kwargs):
        return None

    def tracer(self, *_args, **_kwargs):
        return None

    def update(self):
        return None

    def exitonclick(self):
        return None

    def mainloop(self):
        return None


_tortue = Turtle()
_ecran = _Ecran()


def Screen():
    return _ecran


# --- Fonctions de module : elles pilotent la tortue par defaut -------------
def forward(distance):
    _tortue.forward(distance)


def backward(distance):
    _tortue.backward(distance)


def right(angle):
    _tortue.right(angle)


def left(angle):
    _tortue.left(angle)


def goto(x, y=None):
    _tortue.goto(x, y)


def setx(x):
    _tortue.setx(x)


def sety(y):
    _tortue.sety(y)


def setheading(angle):
    _tortue.setheading(angle)


def home():
    _tortue.home()


def circle(rayon, extent=None, steps=None):
    _tortue.circle(rayon, extent, steps)


def dot(taille=None, couleur=None):
    _tortue.dot(taille, couleur)


def penup():
    _tortue.penup()


def pendown():
    _tortue.pendown()


def isdown():
    return _tortue.isdown()


def pensize(largeur=None):
    return _tortue.pensize(largeur)


def pencolor(*args):
    return _tortue.pencolor(*args)


def fillcolor(*args):
    return _tortue.fillcolor(*args)


def color(*args):
    return _tortue.color(*args)


def begin_fill():
    _tortue.begin_fill()


def end_fill():
    _tortue.end_fill()


def speed(valeur=None):
    return _tortue.speed(valeur)


def clear():
    _tortue.clear()


def reset():
    _tortue.reset()


def write(texte, move=False, align="left", font=("Arial", 12, "normal")):
    _tortue.write(texte, move, align, font)


def hideturtle():
    _tortue.hideturtle()


def showturtle():
    _tortue.showturtle()


def position():
    return _tortue.position()


def xcor():
    return _tortue.xcor()


def ycor():
    return _tortue.ycor()


def heading():
    return _tortue.heading()


def bgcolor(couleur=None):
    return _ecran.bgcolor(couleur)


def done():
    """Sans effet ici : le dessin reste affiche, il n'y a pas de fenetre a garder."""
    return None


# Abreviations officielles de CPython.
fd = forward
bk = back = backward
rt = right
lt = left
pu = up = penup
pd = down = pendown
seth = setheading
setpos = setposition = goto
ht = hideturtle
st = showturtle
pos = position
width = pensize
mainloop = exitonclick = done
