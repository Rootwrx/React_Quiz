```java


package TDs;

public class Rationnel {
    private int num, den;

    // Constructors
    public Rationnel(int num, int den) {
        this.num = num;
        this.den = den;
        if (!estValide()) {
            System.err.println("Denominateur invalide");
            System.exit(1);
        }
    }

    public Rationnel(int num, int den, boolean norml) {
        this(num, den);
        if (norml)
            normaliser();
    }

    // Copy constructor
    public Rationnel(Rationnel r) {
        this(r.num, r.den);
    }

    public Rationnel(int num) {
        this(num, 1);
    }

    public Rationnel() {
        this(0, 1);
    }

    // Public methods

    public boolean estNul() {
        return num == 0;
    }

    public boolean estEntier() {
        return num % den == 0;
    }

    public boolean estUnitaire() {
        return num == den;
    }

    // getters
    public int getNum() {
        return num;
    }

    public int getDen() {
        return den;
    }
    // Private methods

    private boolean estValide() {
        return den != 0;
    }

    private int pgcd(int a, int b) {
        if (b == 0)
            return a;

        return pgcd(b, a % b);
    }

    private void normaliser() {
        int gcd = pgcd(Math.abs(num), Math.abs(den));
        num /= gcd;
        den /= gcd;
    }

    public Rationnel additionner(Rationnel r) {
        int newNum = this.num * r.den + r.num * this.den;
        int newDen = this.den * r.den;
        return new Rationnel(newNum, newDen);
    }

    public Rationnel muliplier(Rationnel r) {
        int newNum = num * r.num;
        int newDen = den * r.den;
        return new Rationnel(newNum, newDen);
    }

    public Rationnel oppose() {
        return new Rationnel(-num, den);
    }

    public Rationnel soustraire(Rationnel r) {
        return this.additionner(r.oppose());
    }

    public Rationnel inverse() {
        // je pense que le prof pas fait ce ArithmeticException
        if (estNul())
            throw new ArithmeticException("on peut pas diviser pas zero");

        return new Rationnel(den, num);
    }

    public Rationnel diviser(Rationnel r) {

        return this.muliplier(r.inverse());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        Rationnel r = (Rationnel) o;

        return (num / den) == (r.num / r.den);
    }

    // override toString method
    @Override
    public String toString() {
        if (estUnitaire())
            return "1";

        if (estNul())
            return "0";

        if (estEntier())
            return num / den + "";

        normaliser();

        if (den < 0) {
            num = -num;
            den = -den;
        }

        return num + "/" + den;

    }

}




/////////////////////////////////////////////////////////////////
// class Monome 
/////////////////////////////////////////////////////////////////
package TDs;

public class Monome {

    private Rationnel coeff;
    private int deg;

    // Constructors
    public Monome(int deg, Rationnel coeff) {
        this.coeff = coeff;
        this.deg = deg;
    }

    public Monome(Monome m) {
        this(m.deg, new Rationnel(m.coeff));
    }

    public Monome() {
    }

    public Monome additionner(Monome m) {
        // assert works only if java assertions is 'enabled
        // si true : continue sinon arrete
        assert equals(m);

        coeff = coeff.additionner(m.coeff);
        return this;
    }

    public Monome multiplier(Monome m) {
        return new Monome(deg + m.deg, coeff.muliplier(m.coeff));
    }

    public boolean estNul() {
        return coeff.estNul();
    }

    public int compareTo(Monome m) {
        return deg - m.deg;
    }
    // Operations

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Monome m = (Monome) obj;
        return deg == m.deg;
    }

    // toString : version de prof
    // @Override
    // public String toString() {
    // return "(" +coeff+")" +"X^" + deg;
    // }

    // method pas demande mais util pour l'affichage
    public Rationnel getCoeff() {
        return coeff;
    }

    // toString : mon version pour une bonne affichage
    @Override
    public String toString() {
        if (estNul())
            return "0";

        String sb = "";
        // avoid printing 1X and X^0 for coefficient
        if (!coeff.estUnitaire() || deg == 0) {
            sb = coeff.toString(); // i.e :"3/10","5",...(deg!=0) , mais pas "1"
        }

        if (deg >= 1) {
            sb = "(" + sb + ")X";
            if (deg > 1)
                sb += "^" + deg; // x^2 ,x^3...
        }
        return sb;
    }

}






/////////////////////////////////////////////////////////////////
// class Polynome 
/////////////////////////////////////////////////////////////////


package TDs;

import java.util.ArrayList;

public class Polynome extends ArrayList<Monome> {

    public Polynome() {
    };

    @Override
    public int indexOf(Object o) {
        Monome m = (Monome) o;
        int i = 0;
        for (i = 0; i < size(); i++) {
            int c = get(i).compareTo(m);
            if (c >= 0)
                break;
        }

        return i;
    }

    @Override
    public boolean add(Monome m) {
        int index = indexOf(m);
        if (index == size()) {
            super.add(m);
            return true;
        }

        if (get(index).equals(m)) {
            Monome sum = get(index).additionner(m);
            if (sum.estNul()) {
                remove(index);
                return false;
            }
            return true;
        }

        // si existe pas :l'ajouter a l'indice
        add(index, m);
        return true;
    }

    public Polynome additionner(Monome m) {
        add(m);
        return this;
    }

    public Polynome multiplier(Monome m) {
        Polynome result = new Polynome();
        for (Monome x : this)
            result.add(m.multiplier(x));

        return result;
    }

    // le prof pas fait 'toString' : cest just pour l'affichage
    // prof jamais utilise StringBuilder
    @Override
    public String toString() {
        if (isEmpty())
            return "0";

        StringBuilder sb = new StringBuilder();
        for (int i = size() - 1; i >= 0; i--) {
            Monome m = get(i);
            if (i != size() - 1 && m.getCoeff().getNum() > 0)
                sb.append("+");
            sb.append(m.toString());
        }
        return sb.toString();
    }

    // code testing
    public static void main(String[] args) {

        // Create an empty polynomial
        Polynome p = new Polynome();
        p.add(new Monome(2, new Rationnel(2, 3)));
        p.add(new Monome(1, new Rationnel(2, 3)));
        p.add(new Monome(3, new Rationnel(2, 3)));

        System.out.println(p);

        p.add(new Monome(2, new Rationnel(2, 3)));
        p.add(new Monome(1, new Rationnel(5, 3)));

        System.out.println(p);
        p.multiplier(new Monome(2, new Rationnel(3, 4)));
        System.out.println(p);
        p.multiplier(new Monome(1, new Rationnel(3, 4)));
        System.out.println("p(x) = " + p);

    }
}








/////////////////////////////////////////////////////////////////
// class Compte 
/////////////////////////////////////////////////////////////////


package TDs;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public class Compte implements Comparable<Compte>, Cloneable {
    private String numero;
    private double solde;
    private List<Action> historique = new LinkedList<>();

    class Action {
        private double montant;

        public Action(double montant) {
            this.montant = montant;
        }

        class Depot extends Action {
            public Depot() {
                super(montant);
                Compte.this.solde += montant;
            }

            @Override
            public String toString() {
                return "+" + montant;
            }
        }

        class Retrait extends Action {
            public Retrait() {
                super(montant);
                Compte.this.solde -= montant;
            }

            @Override
            public String toString() {
                return "+" + montant;
            }
        }

    }

    public double getSolde() {
        return solde;
    }

    public void setSolde(double solde) {
        this.solde = solde;
    }

    @Override
    public String toString() {
        return numero + "\t" + solde + "\n" + historique + "\n";
    }

    public void deposer(double m) {
        historique.add(new Action(m).new Depot());
    }

    public boolean retirer(double m) {
        if (solde < m)
            return false;
        // upCasting i.e Action object <-- Depot or Retrait object
        // because Action is supertype of both
        historique.add(new Action(m).new Retrait());
        return true;
    }

    public double Depots() {
        double total = 0;
        for (Iterator<Action> it = historique.iterator(); it.hasNext();) {
            Action action = it.next();
            if (action instanceof Action.Depot)
                total += action.montant;
        }

        return total;
    }

    @Override
    public int compareTo(Compte o) {
        return numero.compareTo(o.numero);
    }

    @Override
    public Compte clone() {
        Compte cloned = null;
        try {

            cloned = (Compte) super.clone();
            // list is an interface => has no clone method
            // so we need to caste historique to a class implementing the interface List
            // for exmaple LinkedLit
            // then clone this linkedlist object => clone of type object
            // then casting the linkedlist of Object to List<Action>
            cloned.historique = (List<Action>) ((LinkedList<Action>) historique).clone();

        } catch (CloneNotSupportedException ex) {
        }
        return cloned;
    }

    public static void main(String[] args) {
        Compte c1 = new Compte();
        c1.setSolde(1000);
        c1.deposer(100);
        c1.deposer(200);

        System.out.println(c1);
        System.out.println(c1.Depots());

    }
}







/////////////////////////////////////////////////////////////////
// class  Agence
/////////////////////////////////////////////////////////////////


package TDs;

import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.function.Function;
import java.util.function.Predicate;

public class Agence extends LinkedList<Compte> {
    // trier par solde
    public Agence sTrier() {
        sort(Comparator.comparing(Compte::getSolde));
        return this;
    }

    // methode 'filtrer' qui retourne l'ensemble des comptes
    // vérifiant p
    public Agence filtrer(Predicate<Compte> p) {
        Agence res = new Agence();

        // en utilisant For
        // for (Compte c : this)
        // if (p.test(c))
        // res.add(c);

        // en utilisant Iterator
        Iterator<Compte> it = iterator();
        while (it.hasNext()) {
            Compte c = it.next();
            if (p.test(c))
                res.add(c);
        }
        return res;
    }

    // method 'maper' qui retourne l'ensemble des
    // comptes d'une agence à laquelle
    // on a appliqué la fonction ‘f’
    public Agence maper(Function<Compte, Compte> f) {
        Agence res = new Agence();

        for (Iterator<Compte> it = iterator(); it.hasNext();)
            res.add(f.apply(it.next()));

        return res;
    }

    // une méthode permettant de multiplier par 1.02 les soldes des comptes de
    // soldes supérieurs à un certain montant donné.
    public Agence misaj(double m) {
        Predicate<Compte> p = (c) -> c.getSolde() > m;
        Function<Compte, Compte> f = (c) -> {
            c.setSolde(c.getSolde() * 1.02);
            return c;
        };

        return filtrer(p).maper(f);
    }
}







/////////////////////////////////////////////////////////////////
// class Element  
/////////////////////////////////////////////////////////////////

package TDs;

public class Element implements Comparable<Element> {
    private int ligne, colonne;
    private double val;

    public double getVal() {
        return val;
    }

    public Element(int ligne, int colonne, double val) {
        this.ligne = ligne;
        this.colonne = colonne;
        this.val = val;
    }

    public Element(int ligne, int colonne) {
        this.ligne = ligne;
        this.colonne = colonne;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }

        if (this == obj) {
            return true;
        }

        if (getClass() != obj.getClass()) {
            return false;
        }
        final Element other = (Element) obj;
        if (this.ligne != other.ligne) {
            return false;
        }
        if (this.colonne != other.colonne) {
            return false;
        }
        return true;
    }

    public int compareTo(Element o) {
        if (ligne > o.ligne)
            return 1;
        if (ligne < o.ligne)
            return -1;
        if (colonne > o.colonne)
            return 1;
        if (colonne < o.colonne)
            return -1;
        return 0;
    }

    public Element plus(Element e) {
        assert equals(e);
        val += e.val;
        return this;
    }

    public String toString() {
        return "(" + ligne + "," + colonne + "," + val + ")";
    }

    public boolean mval(Element e) {
        return val == e.val;
    }
}






/////////////////////////////////////////////////////////////////
// class OEns 
/////////////////////////////////////////////////////////////////

package TDs;

import java.util.*;
import java.util.function.Predicate;

public class OEns<T extends Comparable<? super T>> extends LinkedList<T> {

    public Paire<Integer, Boolean> localiser(T x) {
        int i = 0;
        for (; i < size(); i++) {
            int c = x.compareTo(get(i));
            if (c == 0)
                return new Paire<>(i, true);
            if (c < 0)
                break;
        }
        return new Paire<>(i, false);
    }

    @Override
    public boolean add(T e) {
        Paire<Integer, Boolean> p = localiser(e);
        if (p.getSecond())
            return false;
        add(p.getFirst(), e);
        return true;
    }

    public OEns<T> pgp(Predicate<T> p) {
        OEns<T> res = new OEns<>();
        Iterator<T> it = this.iterator();
        while (it.hasNext()) {
            T x = it.next();
            if (p.test(x))
                res.add(x);
            else
                break;
        }
        return res;
    }

    public OEns<T> union(OEns<T> x) {
        for (Iterator<T> it = x.iterator(); it.hasNext();) {
            add(it.next());
        }
        return this;
    }
}





/////////////////////////////////////////////////////////////////
// class matrice
/////////////////////////////////////////////////////////////////


package TDs;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

public class Matrice extends OEns<Element> {

    public Matrice plus(Matrice m) {
        for (Element x : m) {
            Paire<Integer, Boolean> p = localiser(x);
            if (p.getSecond()) {
                get(p.getFirst()).plus(x);
            } else {
                add(p.getFirst(), x);
            }
        }
        return this;
    }

    public Matrice ordval() {
        sort(Comparator.comparing(Element::getVal));
        return this;
    }

    public List<Paire<Double, Integer>> occ() {
        List<Paire<Double, Integer>> res = new LinkedList<>();

        ordval();
        while (!this.isEmpty()) {
            Element c = get(0);
            // OEns x = pgp(e -> e.mval(c));
            OEns<Element> x = pgp(e -> e.mval(c));
            res.add(new Paire<>(c.getVal(), x.size()));
            this.removeAll(x);
        }
        return res;
    }
}

```
