

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

// classe: implementant des ensembles ordonnes d'elements,sans repetitions

public class OEns<T extends Comparable<? super T>> extends LinkedList<T> implements Comparable<OEns<T>> {
    
    Paire<Integer, Boolean> localiser(T x) {
        // 1-  un type de retour de cette methode sous la forme 
        // Paire<int,boolean> serait-il valide ? 

        .............................

        // 2- donner le corps de la methode

        .............................
        .............................
        .............................
    }

    // 3- redefinir la methode 'add' pour tenir compte des proprietes de la structure
    // ordonnees et sans repetition

        .............................
        .............................
        .............................


     // retourne l'element maximal
        public T max() {
        // 4- definir en traitant le cas vide;
        .............................
        .............................
        .............................
    }

    // retourne l'ensemble des elements verifiant le predicat
    public OEns<T> filtrer(Predicate<T> p) {
        // 5-  donner  le corps de la methode
        .............................
        .............................
        .............................

    }

    // retourne la plus grand prefixe commun aux deux ensembles
    // example: le pgpc aux deux ensembles d'entier [1,2,3,4] et [1,2,7] est [1,2]

    public OEns<T> pgcp(OEns<T> e) {
        // 6- donner  le corps de la methode
        .............................
        .............................
        .............................
    }

    // retourne la paire des deux ensembles des quels on a eliminer la plus grand
    // prefix commun

    Paire<OEns<T>, OEns<T>> restes(OEns<T> other) {
        // 7-  donner le corps de la methode 
        // en utilisant les methodes 'max' et 'filtrer'

        .............................
        .............................
        .............................
        .............................


    }

    // 8- completer la definiton de la classe;
    // la comparison se fait suivant le premier element non-common
    // utiliser la methode "restes" et traiter les cas particuliers
        .............................
        .............................
        .............................
        .............................




    // Transformer une liste en OEns
    public OEns<T> cons(List<T> l) {
        // 9- donner le coprs de la methode en utilisant un iterateur ;
        .............................
        .............................
        .............................
    }

}


public class Test {
    public static void main(String[] args) {
        OEns<OEns<String>> ls = new OEns<>();
        // 10- Justifier la validité de cette instruction.
        .............................
        .............................        

        OEns<String> s = new OEns<>();
        s.add("aba");
        s.add("aba"); 

        OEns<String> ss = new OEns<>();
        ss.add("ax");
        ss.add("abb"); 

        ls.add(s);
        ls.add(ss);

        System.out.println(ls);
        // 11 Donner le résultat de l'affichage
        .............................
        .............................
    }
}


```
