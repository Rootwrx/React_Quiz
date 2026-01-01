```java

/**
 * Classe modélisant des couples d'éléments quelconques
 */
public class Paire<U, V> {
    private U first;
    private V second;

    public Paire(U first, V second) {
        this.first = first;
        this.second = second;
    }

    public Paire(U first) {
        this.first = first;
    }

    public V getSecond() {
        return second;
    }

    public U getFirst() {
        return first;
    }

    public String toString() {
        return "(" + first + ", " + second + ")";
    }
} // Fin classe Paire





////////////////////////////////////////////////
class OEns
///////////////////////////////////////////////


import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

public class OEns<T extends Comparable<? super T>> extends LinkedList<T> implements Comparable<OEns<T>> {

    Paire<Integer, Boolean> localiser(T x) {

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

    // redefinir la methode 'add' pour tenir compte des proprietes de la structure
    // ordonnees et sans repetition

    @Override
    public boolean add(T x) {

        Paire<Integer, Boolean> p = localiser(x);
        if (p.getSecond())
            return false;

        add(p.getFirst(), x);
        return true;

    }

    // definir en traitant le cas vide;
    public T max() {
        if (isEmpty())
            return null;

        return get(size() - 1); // liste ordonne => max = dernier element !
    }

    // retourne l'ensemble des elements verifiant le predicat
    public OEns<T> filtrer(Predicate<T> p) {
        OEns<T> res = new OEns<>();
        Iterator<T> it = iterator();
        while (it.hasNext()) {
            T x = it.next();
            if (p.test(x))
                res.add(x);
        }
        return res;

    }

    // retourne la plus grand prefixe commun aux deux ensembles
    // example: le pgpc aux deux ensembles d'entier [1,2,3,4] et [1,2,7] est [1,2]

    public OEns<T> pgcp(OEns<T> e) {

        if (e.size() == 0 || size() == 0)
            return null;

        OEns<T> res = new OEns<>();

        for (int i = 0; i < size() && i < e.size(); i++) {
            if (get(i).compareTo(e.get(i)) != 0)
                break;

            res.add(get(i));
        }

        return res;
    }

    // retourne la paire des deux ensembles des quels on a eliminer la plus grand
    // prefix commun
    // en utilisant les methodes 'max' et 'filtrer'

    Paire<OEns<T>, OEns<T>> restes(OEns<T> other) {
        OEns<T> p = this.pgcp(other);

        if (p == null || p.isEmpty())
            return new Paire<>(this, other);

        T max = p.max();

        OEns<T> r1 = filtrer((t) -> t.compareTo(max) > 0);
        OEns<T> r2 = other.filtrer((t) -> t.compareTo(max) > 0);

        return new Paire<>(r1, r2);
    }

    // la comparison se fait suivant le premier element non-common
    // utiliser la methode "restes" et traiter les cas particuliers
    @Override
    public int compareTo(OEns<T> e) {
        Paire<OEns<T>, OEns<T>> restes = restes(e);
        OEns<T> f = restes.getFirst();
        OEns<T> s = restes.getSecond();

        if (f.isEmpty() && s.isEmpty())
            return 0;

        if (f.isEmpty())
            return -1;
        if (s.isEmpty())
            return 1;

        return f.get(0).compareTo(s.get(0));
    }

    // Transformer une liste en OEns en utilisant un iterateur ;

    public OEns<T> cons(List<T> l) {
        if (l.isEmpty())
            return new OEns<>();

        OEns<T> res = new OEns<>();

        for (Iterator<T> it = l.iterator(); it.hasNext();)
            res.add(it.next());

        return res;
    }

    public static void main(String[] args) {

        // Case 1: deux listes qui sont egaux
        OEns<Integer> a1 = new OEns<>();
        a1.add(1);
        a1.add(2);
        a1.add(3);

        OEns<Integer> a2 = new OEns<>();
        a2.add(1);
        a2.add(2);
        a2.add(3);

        System.out.println("a1 vs a2 (expect 0): " + a1.compareTo(a2));

        // Case 2: difference apres le plus grand prefixe
        OEns<Integer> b1 = new OEns<>();
        b1.add(1);
        b1.add(2);
        b1.add(3);

        OEns<Integer> b2 = new OEns<>();
        b2.add(1);
        b2.add(2);
        b2.add(4);

        System.out.println("b1 vs b2 (expect <0): " + b1.compareTo(b2));
        System.out.println("b2 vs b1 (expect >0): " + b2.compareTo(b1));

        // Case 3: c1 est lui-meme le plus grand prefixe;
        OEns<Integer> c1 = new OEns<>();
        c1.add(1);
        c1.add(2);

        OEns<Integer> c2 = new OEns<>();
        c2.add(1);
        c2.add(2);
        c2.add(5);

        System.out.println("c1 vs c2 (expect <0): " + c1.compareTo(c2));
        System.out.println("c2 vs c1 (expect >0): " + c2.compareTo(c1));

        // Case 4: difference apres le plus grand prefixe
        OEns<Integer> d1 = new OEns<>();
        d1.add(1);
        d1.add(3);
        d1.add(7);

        OEns<Integer> d2 = new OEns<>();
        d2.add(1);
        d2.add(4);
        d2.add(6);

        System.out.println("d1 vs d2 (expect <0): " + d1.compareTo(d2));
        System.out.println("d2 vs d1 (expect >0): " + d2.compareTo(d1));

        // Case 5: comparison de listes vides
        OEns<Integer> e1 = new OEns<>();
        OEns<Integer> e2 = new OEns<>();

        System.out.println("e1 vs e2 (expect 0): " + e1.compareTo(e2));

        // ajoutant un element dans e2 , e1 et encore vide
        e2.add(1);
        System.out.println("e1 vs e2 (expect <0): " + e1.compareTo(e2));
        System.out.println("e2 vs e1 (expect >0): " + e2.compareTo(e1));
    }

}




////////////////////////////////////////////////
class Test
///////////////////////////////////////////////


public class Test {
    public static void main(String[] args) {
        OEns<OEns<String>> ls = new OEns<>();
        // 10) Justifier la validité de cette instruction.
        /*
         * La classe OEns<T> est définie avec la contrainte :
         * T extends Comparable<? super T>
         *
         * Or, la classe OEns<String> implémente l’interface
         * Comparable<OEns<String>>
         *
         * Donc OEns<String> est comparable à des objets de son propre type,
         * ce qui satisfait la contrainte générique imposée sur T.
         *
         * Par conséquent, l’instanciation OEns<OEns<String>> est valide.
         */

        OEns<String> s = new OEns<>();
        s.add("aba");
        s.add("aba"); // rejeté : OEns ne permet pas les doublons

        OEns<String> ss = new OEns<>();
        ss.add("ax");
        ss.add("abb"); // insertion ordonnée : "abb" < "ax"

        ls.add(s);
        ls.add(ss);

        System.out.println(ls);
        // 11) Donner le résultat de l'affichage
        // reponse : [["aba"], ["abb","ax"]]

        // just explication ce qui se passe : pas reponse pour le question !
        /*
         * ls est un ensemble ordonné dont les éléments sont des OEns<String>.
         *
         * Chaque élément de 'ls' est donc comparé à l’aide de la méthode
         * compareTo définie dans OEns<String>, c’est-à-dire par comparaison
         * lexicographique (premier élément non commun) !.
         *
         * Après les insertions :
         * s = ["aba"]
         * ss = ["abb", "ax"]
         *
         * Lors de ls.add(ss), la comparaison effectuée est :
         * ["aba"].compareTo(["abb","ax"])
         *
         * Le plus grand préfixe commun est vide, on compare donc les premiers
         * éléments :
         * "aba".compareTo("abb") < 0
         *
         * Ainsi ["aba"] est placé avant ["abb","ax"].
         *
         * Le contenu final de ls est donc :
         * [["aba"], ["abb","ax"]]
         */
    }
}



```
