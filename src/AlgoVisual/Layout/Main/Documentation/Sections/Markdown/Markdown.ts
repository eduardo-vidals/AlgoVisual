export let introductionMarkdown = `
# Introduction 
This part of the page will go over the implementations of the algorithms and data structures that are implemented throughout the site.

- Before starting, this documentation page assumes that you have a good understanding of the Java programming language. 
- An explanation of the data structures and algorithms will be provided in their respective sections. 
 
## Inspiration & Credits
- This project was largely inspired by Clément Mihailescu's sorting and pathfinding visualizer.
- The algorithm and data structure implementations are inspired by the Coursera algorithm courses offered by Princeton University under Robert Sedgewick & Kevin Wayne. 
- Thanks to freeCodeCamp for the wonderful projects offered within their course which helped me build a solid foundation of the React framework. 

## Respective Links
- [Clément Mihailescu's Sorting Visualizer](https://github.com/clementmihailescu/Sorting-Visualizer)
- [Clément Mihailescu's Pathfinding Visualizer](https://github.com/clementmihailescu/Pathfinding-Visualizer)
- [Algorithms Part I by Robert Sedgewick & Kevin Wayne](https://www.coursera.org/learn/algorithms-part1)
- [Algorithms Part II by Robert Sedgewick & Kevin Wayne](https://www.coursera.org/learn/algorithms-part2)
- [Front End Development Libraries by freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries)
`

export let datastructuresMarkdown = `
# Data Structures
This part of the page will go over many relevant data strucures that are implemented throughout the site. 
`
export let arraylistMarkdown = `
# ArrayList in Java
This section will go over a simple implementation of ArrayList.

## Arrays
As a reminder, keep in mind that arrays have a limited size in the amount of data they can hold. However, in an ArrayList we are able to manipulate arrays in such a way that allows us to insert and remove elements without having to worry about a limited size. 

## ArrayList Implementation
Keeping the last section in mind, let's initialize our instance variables for our ArrayList. We will be using generics for our implementation to easily apply our ArrayList across all objects. 

\`\`\`java
public class ArrayList<E> implements Iterable<E> {
    private static final int INIT_CAPACITY = 8; // initial capacity of array
    private E[] arr; 
    private int n; // size of array
    
    public ArrayList(){
        arr = (E[]) new Object[INIT_CAPACITY]; // generic array 
        n = 0;
    }
}
\`\`\`

First, let's implement the straightforward methods of an ArrayList. 

\`\`\`java
public boolean isEmpty() {
    return n == 0;
}

public int size() {
    return n;
}
\`\`\`

Let's now implement our first relevant helper method for an ArrayList. We will need a resize method that will use an array with a new capacity and copies all values from the old array into this new array with an updated capacity. 

\`\`\`java
private void resize(int capacity) {
    E[] copy = (E[]) new Object[capacity];
    for (int i = 0; i < n; i++){
        copy[i]= arr[i];
    }
    arr = copy;
}
\`\`\`

With this helper method, we are now able to implement our add and remove methods. 

\`\`\`java
public void add(E item){
    // resize once we reach max capacity
    if (n == arr.length) {
        // resizing by 2x ensures we don't resize too frequently and don't allocate too much memory
        resize(arr.length * 2);
    }
    arr[n++] = item;
}

public void remove(int index){
    int numMoved = n - index - i; // numOfNumbers that need to be moved
    System.arraycopy(arr, index + 1, arr, index, numMoved); // shifts elements to left by 1
    arr[n--] = null; // decrement size and ensure last arr value is null 
    
    // resize to ensure you don't allocate too much memory when you have a few amount of elements
    if (n > 0 && n == arr.length / 4){
        resize(arr.length / 2);
    }
}
\`\`\`
## Iterators
As a reminder, remember to implement the Iterator interface and implement the following methods: 
- hasNext()
    - returns true or false depending on whether there is a next element
- next()
    - returns the next element in the iterator
- remove()
    - allows you to remove elements while traversing

We will implement an iterator to allow users to remove elements while the list is being traversed. Iterators also allow you to use the for-each syntax for easier traversal. 

\`\`\`java
public Iterator<E> iterator() {
    return new ListIterator();
}

private class ListIterator implements Iterator<E> {
    private int i; // current index
    
    @Override
    public boolean hasNext(){
        return i < n;
    }
    
    @Override
    public E next(){
        if (!hasNext()){
            throw new UnsupportedOperationException();
        }
        return copy[i++];
    }
    
    @Override 
    public void remove() {
        ArrayList.this.remove(--i);
    }
}
\`\`\`


## Visualizer
...And that's it! Our implementation of ArrayList should be working just fine. Remember, there is also a simple visualization tool of how the array operates in an ArrayList. Click the button below to check out the visualizer!
`

export let linkedlistMarkdown = `
# LinkedList in Java
This section will go over a simple implementation of ArrayList.

## Objects & Classes
There is sometimes confusion when linked lists are introduced due to not understanding objects and classes. Therefore, it is important that you understand the idea of having a **inner** class within a class. The idea of a linked list is that an inner class can essentially act as a *pointer* that keeps track of **previous** and **next** nodes. This idea is explained in the image below. 

## LinkedList Implementation
Keeping the logic of the last section in mind, we can now initialize the barebones logic of a LinkedList. We will be using generics for our implementation to easily apply our LinkedList across all objects.
\`\`\`java
public class LinkedList<E> implements Iterable<E> {

}
\`\`\`
`