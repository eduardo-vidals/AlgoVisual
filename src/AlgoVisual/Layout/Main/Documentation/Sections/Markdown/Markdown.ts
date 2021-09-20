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
### Iterators
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
There is sometimes confusion when linked lists are introduced due to not understanding the concept of objects and classes. Therefore, it is important that you understand the idea of having a **inner** class within a class. The idea of a linked list is that an inner class can essentially act as a *pointer* that keeps track of **previous** and **next** nodes. This idea is explained in the image below. 

## LinkedList Implementation
Keeping the logic of the last section in mind, we can now initialize the barebones logic of a LinkedList. We will be using generics for our implementation to easily apply our LinkedList across all objects.

[TO DO IMAGE]

\`\`\`java
public class LinkedList<E> implements Iterable<E> {
    private Node head; // first element in list
    private Node tail; // last element in list
    private int n; // size of arr
    
    private class Node {
        Node next; // represents the node next to this current node
        Node prev; // represents the node prev to this current node
        E data; // represents the data within the current node
        
        public Node(E data){
            this.data = data;
        }
    }     
}
\`\`\`

The code above is the barebones logic of a **doubly-linked list.** It will have **two** pointers, one pointer to the previous element and one pointer to the next element. A **singly-linked list** only has **one** pointer that points to the next element. We will be implementing a doubly-linked list as it is more efficient and it'll be easier to understand a singly-linked list after implementing a doubly-linked list.

### Relevant Methods
First, let's implement the straightforward methods of a list.
\`\`\`java
public int size(){ 
    return n 
}

public int isEmpty(){
    return n == 0;
}
\`\`\`


### Stacks (LIFO)
Let's introduce the concept of a **stack** as it serves as an important concept in computer science. A **stack** data structure works as **Last In, First Out (LIFO).** An analogy for this data structure is to image a pile of pancakes. Which pancake is the first one removed? The last pancake that was put into the pile will most likely result in it being the first one removed. This concept is easily explained by the image below.

[TO DO IMAGE]

We can now implement the relevant methods of a LinkedList that serve the purpose of a **stack** data structure. We will name the methods **addLast()** and **removeLast()**, but these methods can also be represented as **push()** and **pop().**

\`\`\`java
public void addLast(E data){
    // save the "oldTail" in a temp variable (as this will become the old tail)
    Node oldTail = tail;
    // initialize new tail with new data, prev Node will always be the oldTail
    tail = new Node(data);
    tail.prev = oldTail;
    // when we first add into our list, the head will be equal to the tail
    if(isEmpty()){
        head = tail;
    } 
    // after that, the next value of the old tail will be the current tail
    else {
        oldTail.next = tail;
    }
    n++;
}

public E removeLast(){
    // throw an exception if element is being removed when list is empty
    if (isEmpty()) {
        throw new NoSuchElementException();
    }  
    // make a variable for the old tail so we can return the data when the element is removed
    Node oldTail = tail;
    // make new tail be equal to the prev node of the tail
    // then make the next value null for garbage collection
    if (size() > 1){
        tail = tail.prev;
        tail.next = null;  
    }
    // this essentially means the list is empty so make both values null
    else {
        head = null;
        tail = null;
    }
    n--;
    return oldTail.data;
}
\`\`\`

### Queues (LIFO)
Let's introduce the concept of a **queue** as it serves as an important concept in computer science. A **queue** data structure works as **First In, First Out (FIFO).** An analogy for a queue is to imagine being the first person in line for Subway, eventually, you will be the first one out of line and will go on your day to enjoy your subway! This concept is easily explained by the image below. 

[TO DO IMAGE]

We can now implement the relevant methods of a LinkedList that serve the purpose of a **queue** data structure. We will name the methods **addFirst()** and **removeFirst()**, but these methods can also be represented as **enqueue()** and **dequeue().**

\`\`\`java
public void addFirst(E data){
    // save the "oldHead" in a temp variable (as this will become the old head)
    Node oldHead = head;
    // initialize new head with new data, next Node will always be the oldHead
    head = new Node(data);
    head.next = oldHead;
    // when we first add into our list, the tail will be equal to the head
    if (isEmpty()){
        tail = head;
    } 
    // after that, the prev value of the old head will be the current head
    else {
        oldHead.prev = head;
    }
    n++;
}

public E removeFirst(){
    // throw an exception if element is being removed when list is empty
    if (isEmpty()) {
        throw new NoSuchElementException();
    } 
    // make a variable for the old head so we can return the data when the element is removed
    Node oldHead = head;
    // make new head be equal to the next node of the head
    // then make the prev value null for garbage collection
    if (size() > 1){
        head = head.next;
        head.prev = null;
    } 
    // this essentially means the list is empty so make both values null
    else {
        head = null;
        tail = null;
    }
    n--;
    return oldHead.data;
}
\`\`\`

### Deque
A **deque** is simply a combination of a stack and queue data structure. As a result, our LinkedList can be defined as deque data structure as it supports the operations of a stack and queue data structure.

### Iterator
Let's now implement an iterator for our LinkedList. 
\`\`\`java
public Iterator<E> iterator() {
    return new LinkedListIterator();
}

private class LinkedListIterator implements Iterator<E> {
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
`