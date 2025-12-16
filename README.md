```java
package TPs;

public class Date {
    private final int month; // month (between 1 and 12)
    private int day; // day (between 1 and 31
    private int year; // year
    public Date(int day, int month, int year) {
        if (!isValid(day, month, year)) {
            System.err.println("Invalid date");
            System.exit(0);
        }
        this.month = month;
        this.day = day;
        this.year = year;
    }
    public Date(int year) {
        this(1,1,year);
    }
    public int month() {
        return month;
    }
    public int day() {
        return day;
    }
    public int year() {
        return year;
    }
    private boolean isValid(int d, int m, int y) {
        if (d < 1 || d > 31) return false;
        if (m < 1 || m > 12) return false;
        return y >= 0;
    }
    public boolean isAfter(Date that) {
        return compareTo(that) > 0;
    }
    public boolean isBefore(Date that) {
        return compareTo(that) < 0;
    }
    public int compareTo(Date that) {
        if(year != that.year) return  year-that.year;
        if(month!=that.month) return  month-that.month;
        return  day-that.day;

    }
    @Override
    public String toString() {
        return day + "/" + month + "/" + year;
    }
    public boolean aEquals(Date dt) {
        if (dt==null) return false;

        return year == dt.year;
    }
}
```

```java

package TPs;

public class Personne {
    private String nom;
    private Date dt;

    public Personne(String nom, Date dt) {
        this.nom = nom;
        this.dt = dt;
    }

    public Personne(String nom) {
        this.nom = nom;
    }

    public Personne(String n, int j, int m, int a) {
        this(n, new Date(j, m, a));
    }

    public String toString() {
        return nom + " né le " + dt + "\n";
    }

    public boolean equals(Personne p) {
        if (p == null) return false;
        return nom.equalsIgnoreCase(p.nom);
    }

    public int compareTo(Personne p) {
        if (dt == null) return Integer.MAX_VALUE;
        if (p == null) return Integer.MAX_VALUE;
        return dt.compareTo(p.dt);
    }

    public boolean aEquals(Personne p) {
        if (dt == null) return false;
        if (p == null) return false;
        return dt.aEquals(p.dt);
    }
}

```
```java

package TPs;

import java.util.Objects;
public class Produit    {
    private String code;
    private Date dt;
    public Produit(String code, Date dt) {
        this.code = code;
        this.dt = dt;
    }



    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Produit other = (Produit) obj;
        return Objects.equals(this.code, other.code);
    }
    @Override
    public String toString() {
        return "Produit[" + "code=" + code + ", Date=" + dt +"]";
    }
    public int compareTo(Produit o) {
        return code.compareTo(o.code);
    }
    public boolean estAncien(Produit ref){
        return dt.isBefore(ref.dt);
    }


    // pas demanded dans le TP!,
    // c'est just pour le 'hard copy' dans le Stock qui est aussi pas demanded !!
    @Override
    public  Produit clone() throws CloneNotSupportedException {
        return  (Produit) super.clone();
    }

    static void main() {
        Produit p1 = new Produit("x3wwn3",new Date(2020));
    }
}

```
```java

package TPs;
import java.util.LinkedList;

public class Stock extends LinkedList<Produit> {

    @Override
    public boolean add(Produit produit) {
        return !contains(produit) ? super.add(produit) :false;

        // ou bien;
        //if(contains(produit)) return  false;
        //return  super.add(produit);
    }



    public  Produit plusEncien() {
        int j=0;
        for(int i=1 ; i<size(); i++)
            if(get(i).estAncien(get(j)))  j=i;

        return  get(j);
    }


    public  Stock getPerimes(Date dt) {
        Stock stock = new Stock();
        Produit  other = new Produit("", dt);
        for(Produit p:this)
            if(p.estAncien(other)) stock.add(p);

        return  stock;
    }

    // supprimer les produits perimes du Stock;
    public  void removePerimes(Date dt) {
        for(Produit produitPerime : getPerimes(dt))
            remove(produitPerime);
    }

    // pas demanded dans le TP;
    @Override
    public Stock clone() {
        // shallow copy
        Stock cloned = (Stock) super.clone();

        try {
            // deep copy of Produit;
            for(int i= 0;i<size();i++)
                    cloned.set(i, cloned.get(i).clone());
        }catch (CloneNotSupportedException _)  {}

        return  cloned;
    }

    // pas demande dans le TP;
    @Override
    public  String toString() {
        StringBuilder s = new StringBuilder();
        for(Produit produit : this)
            s.append(produit.toString()).append("\n");
        return s.toString();
    }


    static void main() {
        Stock stock = new Stock();
        stock.add(new Produit("0002",new Date(2022)));
        stock.add(new Produit("0003",new Date(2021)));
        stock.add(new Produit("0004",new Date(5,1,2023)));
        stock.add(new Produit("0005",new Date(7,1,2023)));
        stock.add(new Produit("0006",new Date(6,1,2023)));
        stock.add(new Produit("0007",new Date(2000)));
        stock.add(new Produit("0008",new Date(2024)));


        System.out.println(stock.plusEncien());
        stock.removePerimes(new Date(6,1,2023));
        System.out.println(stock);
    }
}


```
