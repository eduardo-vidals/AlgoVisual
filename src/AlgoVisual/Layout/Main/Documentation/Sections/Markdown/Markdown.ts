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

// data structures markdown
export let datastructuresMarkdown = `
# Data Structures
This part of the page will go over the many relevant data strucures that are implemented throughout the site. 
`

export let timeComplexityMarkdown = `
# Time Complexity
This section will go over time complexity.

## Brief Explanation
Time complexity can be defined as the **asymptomatic** behavior of the graph. In simpler terms, as the size of the function gets progressively larger, we can put functions in the same asymptomatic category. For example, let's say we have the following functions: *$f(x) = 100n* and *$g(x) = n*. As *$n* gets larger, both functions become categorized under the same asymptomatic bound because the difference becomes negligible as *$n* gets larger. 

## Big-O Notation
To categorize the asymptomatic bound of an algorithm, we use Big-O notation. For example, Bubble Sort has a **worst-case** of *$O(n^2)*, which is pronounced as "Big O of *$n^2*." This algorithm will be explained in the sorting section of the documentation page.  

## Graph Representation
Here is a representation of the asymptomatic bounds used when regarding data structures and algorithms. 
![Time Complexity Graph](https://he-s3.s3.amazonaws.com/media/uploads/ece920b.png)

## Importance
Time complexity is an important concept to grasp right away, as we will be analyzing the time complexity of the data structures and algorithms that will be implemented throughout the site. Click below to go to the next section. 
`

export let heapsMarkdown = `
# Heaps
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
`

export let binarySearchTreesMarkdown = `
# Binary Search Trees
`

export let analysisOfDataStructuresMarkdown = `
# Analysis of Data Structures
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

### Relevant Methods
First, let's implement the straightforward methods of a list.
\`\`\`java
public boolean isEmpty() {
    return n == 0;
}

public int size() {
    return n;
}
\`\`\`

### Helper Method (Resizing Array)
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

### Instance Methods
With the help of the previous helper method, we are now able to implement our add and remove methods. 

\`\`\`java
public void add(E item){
    // resize once we reach max capacity
    if (n == arr.length) {
        // resizing by 2x ensures we don't resize too frequently and don't allocate too much memory
        resize(arr.length * 2);
    }
    arr[n++] = item;
}

public E remove(int index){
    E removed = arr[index];
    int numMoved = n - index - i; // numOfNumbers that need to be moved
    System.arraycopy(arr, index + 1, arr, index, numMoved); // shifts elements to left by 1
    arr[n--] = null; // decrement size and ensure last arr value is null 
    
    // resize to ensure you don't allocate too much memory when you have a few amount of elements
    if (n > 0 && n == arr.length / 4){
        resize(arr.length / 2);
    }
    return removed;
}
\`\`\`

### Iterator
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
            throw new NoSuchElementException();
        }
        return copy[i++];
    }
    
    @Override 
    public void remove() {
        if (i == 0) {
            throw new IllegalStateException();
        }
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
There is sometimes confusion when linked lists are introduced due to not understanding the concept of objects and classes. Therefore, it is important that you understand the idea of having a **inner** class within a class. The idea of a Linked List is that an inner class can essentially act as a *pointer* that keeps track of **previous** and **next** nodes. This idea is explained in the image below. 

[TO DO IMAGE]

## LinkedList Implementation
Keeping the logic of the last section in mind, we can now initialize the barebones logic of a LinkedList. We will be using generics for our implementation to easily apply our LinkedList across all objects.

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
    return n;
}

public boolean isEmpty(){
    return n == 0;
}
\`\`\`


### Stacks (LIFO)
Let's introduce the concept of a **stack** as it serves as an important concept in computer science. A **stack** data structure works as **Last In, First Out (LIFO).** An analogy for this data structure is to imagine a pile of pancakes. Which pancake is the first one to be removed? The last pancake that was put into the pile will most likely result in it being the first one removed. This concept is easily explained by the image below.

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
Let's introduce the concept of a **queue** as it serves as an important concept in computer science. A **queue** data structure works as **First In, First Out (FIFO).** An analogy for a queue is to imagine being the first person in line for Subway, eventually, you will be the first one out of line and will go about your day and enjoy your subway sandwich! This concept is easily explained by the image below. 

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
    return new LinkedIterator();
}

private class LinkedIterator implements Iterator<E> {
    // keep track of current and lastAccessed nodes
    private Node current = head;
    private Node lastAccessed = null;

    @Override
    public boolean hasNext() {
        return current != null;
    }

    @Override
    public E next() {
        if (!hasNext()) {
            throw new NoSuchElementException();
        }
        // update lastAccessed node since it will be used to remove the lastAccessed element
        // since the current element always updates when next() is called, thus it cannot
        // be used within remove()
        lastAccessed = current;
        E data = current.data;
        current = current.next;
        return data;
    }

    @Override
    public void remove() {
        if (lastAccessed == null) {
            throw new IllegalStateException();
        }
        if (lastAccessed == head) {
            LinkedList.this.removeFirst();
        } else if (lastAccessed == tail) {
            LinkedList.this.removeLast();
        } 
        // update the prev and next pointers of the lastAccessed node
        // make the lastAccessed node null for garbage collection
        else {
            Node prev = lastAccessed.prev;
            Node next = lastAccessed.next;
            prev.next = next;
            next.prev = prev;
            n--;
            lastAccessed = null;
        }
    }        
}
\`\`\`

The **remove()** method might be a bit hard to understand so images will be provided for each case.

[TO DO IMAGE] (removeFirst)
[TO DO IMAGE] (removeLast)
[TO DO IMAGE] (otherCases)

## Visualizer
...And that's it! Our implementation of a LinkedList should be working just fine. Remember, there is also a visualization tool of how the pointers operate in a LinkedList. Click the button below to check out the visualizer!
`

// sorting markdown
export let sortingMarkdown = `
# Sorting Algorithms
This part of the page will go over the many relevant sorting algorithms that are implemented throughout the site. 
`

export let bubbleSortMarkdown = `
# Bubble Sort
This section will go over an implementation of Bubble Sort.

## Bubble Sort Implementation
We will be using generics for our implementation to easily apply our sorting algorithm across all types of arrays.

### Rationale
The basis of Bubble Sort is to swap elements if the current element is greater than the element ahead.

### Helper Method
We will be using the following **swap()** helper method to swap values from the array.
\`\`\`java
private static <E> void swap(E[] arr, int i, int j){
    E temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
\`\`\`

### Sorting Algorithm
This is the setup used for Bubble Sort.

\`\`\`java
// <E extends Comparable> just means that E (the data type of the array) must
// implement the Comparable interface, <? super E> means that E itself or the
// super class can implement Comparable
public static <E extends Comparable<? super E>> void sort(E[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        for (int j = 0; j < arr.length - 1 - i; j++) {
            // compare elements from indices j and j + 1, swap if j > j + 1
            if (arr[j].compareTo(arr[j + 1]) > 0){
                swap(arr, j, j + 1);
            }
        }
    }
}
\`\`\`

## Time Complexity (Analysis)
Bubble Sort is a **stable** sorting algorithm but it is often regarded as the **worst** sorting algorithm.
- The best case can be *$O(n)*, but this implementation has a best case of *$O(n^2)*
- The average case is *$O(n^2)*
- The worst case is *$O(n^2)*


## Visualizer
...And that's it! Our implementation of Bubble Sort should be working just fine. Remember, there is also a simple visualization tool for sorting algorithms. Click the button below to check out the visualizer!
`

export let insertionSortMarkdown = `
# Insertion Sort
This section will go over an implementation of Insertion Sort.

## Insertion Sort Implementation 
We will be using generics for our implementation to easily apply our sorting algorithm across all types of arrays.

### Rationale
The basis of Insertion Sort is to swap until there isn't an element greater than the key. This process starts with index one as the key and progressively increments until the array is fully sorted.

### Sorting Algorithm
This is the setup used for Selection Sort.
\`\`\`java
public static void <E extends Comparable<? super E>> sort(E[] arr){
    for (int i = 1; i < arr.length; i++){
        // keep track of the key for the last swap
        T key = arr[i];
        // starting index will always be one below i
        int j = i - 1;
        // if the val to the left is bigger, then replace it
        while(j >= 0 && arr[j].compareTo(key) > 0){
            arr[j + 1] = arr[j];
            j--;
        }
        // we can replace arr[j + 1] with the key since that is the last swap we need to do
        arr[j + 1] = key;
    }
}
\`\`\`

## Time Complexity (Analysis)
Insertion Sort is a **stable** sorting algorithm and better than Bubble Sort. However, the worst case is still *$O(n^2)*
- The best case is *$O(n)*
- The average case is *$O(n^2)*
- The worst case is *$O(n^2)*

## Visualizer
...And that's it! Our implementation of Bubble Sort should be working just fine. Remember, there is also a simple visualization tool for sorting algorithms. Click the button below to check out the visualizer!
`

export let selectionSortMarkdown = `
# Selection Sort
This section will go over an implementation of Selection Sort.

## Selection Sort Implementation
We will be using generics for our implementation to easily apply our sorting algorithm across all types of arrays.

### Rationale
The basis of Selection Sort is to find the minimum element in the array and replace it with the current index of the outer loop. The inner loop start index increments after each iteration in the outer loop. (This allows us to ignore already sorted elements.)

### Helper Method
We will be using the following **swap()** helper method to swap values from the array.
\`\`\`java
public static <E> void swap(E[] arr, int i, int j){
    E temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
\`\`\`

### Sorting Algorithm
This is the setup used for Selection Sort. 

\`\`\`java
public static <E extends Comparable<? super E> sort(E[] arr){
    for (int i = 0; i < arr.length; i++){
        // get min value and its index (we're only aware of 1 value so this is our min)
        T min = arr[i];
        int minIndex = i;
        // start loop from i since any previous element will already be sorted
        for (int j = i; j < arr.length; j++){
            // if there's a new min, then update it
            if (min.compareTo(arr[j] > 0){
                min = arr[j];
                minIndex = j;
            }
        }
        // once you're at the end of the loop, swap the index of the smallest element with i 
        // this will put the lowest element at the start of our array
        swap(arr, i, minIndex);
    }
}
\`\`\`

## Time Complexity (Analysis)
Selection Sort is an **unstable** sorting algorithm and better than Bubble Sort. However, the worst case is still *$O(n^2)*
- The best case is *$O(n^2)*
- The average case is *$O(n^2)*
- The worst case is *$O(n^2)*

## Visualizer
...And that's it! Our implementation of Insertion Sort should be working just fine. Remember, there is also a simple visualization tool for sorting algorithms. Click the button below to check out the visualizer!
`

export let mergeSortMarkdown = `
# Merge Sort
This section will go over **two** versions of Merge Sort because it will show the importance in creating efficient algorithms. 

## Merge Sort Implementation (Version 1)
We will be using generics for our implementation to easily apply our sorting algorithm across all types of arrays.

### Rationale
The basis of Merge Sort is to think of one element by itself already being **sorted**. If we have **two elements** and **merge** them, then we will have 2 elements sorted. To accomplish this we recursively call the sorting method until we only have one element. Eventually, the recursive function will be at a point where we have **two** elements. Ultimately, we use the merge function for these pair of elements and this process continues until the array is fully sorted.

### Helper Method
We will be using the following **merge()** helper method to **merge** two arrays that are **already sorted.**
\`\`\`java
private static <E extends Comparable<? super E> void merge(E[] arr, int l, int m, int r){
    int nL = m - l + 1; // size of left aux array
    int nR = r - m; // size of right aux array
    
    E[] L = (E[]) new Comparable[nL];
    E[] R = (E[]) new Comparable[nR];
   
    // initialize left aux array with the values from the main array
    for (int i = 0; i < nL; i++){
        L[i] = arr[l + i];
    }
    
    // initialize right aux array with the values from the main array
    for (int j = 0; j < nR; j++){
        R[j] = arr[m + j + 1];
    }
    
    int i = 0; // starting index of left aux arr
    int j = 0; // starting index of right aux arr
    int k = l; // starting index of main arr
    
    while (i < nL && j < nR){
        // compare values from both aux arrays, determine which element is lower, then update
        // the main arr with the lowest value, then increment indices as needed
        if (L[i].compareTo(R[j]) <= 0){
            arr[k] = L[i++]
        } else {
            arr[k] = R[j++];
        }
        k++;
    }
    
    // update main arr with remaining elements from the left aux arr
    while (i < nL){
        arr[k] = L[i++];
        k++;
    }
    
    // update main arr with remaining elements from the right aux arr
    while (j < nR){
        arr[k] = R[j++];
        k++;
    }
}
\`\`\`

### Sorting Algorithm
This is the setup used for Merge Sort. 

\`\`\`java
public static <E extends Comparable<? super E> void sort(E[] arr){
    sort(arr, 0, arr.length - 1);
}
private static <E extends Comparable<? super E> void sort(E[] arr, int l, int r){ 
    if (l < r){
        int m = (l + r)/2; // middle index
        sort(arr, l, m); // left side of array
        sort(arr, m + 1, r); // right side of array
        merge(arr, l, m, r); // merge
    }
}
\`\`\`

### Time Complexity & Space Complexity (Analysis)
Merge Sort is a **stable** sorting algorithm and it is the first efficient sorting algorithm that will be covered.
- The best case is *$O(nlogn)*
- The average case is *$O(nlogn)*
- The worst case is *$O(nlogn)*

It also uses an **auxilary** array in **merge()**, as a result, this algorithm has a space complexity of *$O(n).*

## Merge Sort Implementation (Version 2)
This second version of Merge Sort will be more efficient than the previous one. It will only be creating the auxilary array **once** instead of creating multiple auxilary arrays as in the previous implementation. Therefore, this version of Merge Sort is more efficient.

### Sort Method
This will be the updated version of **sort()** that only relies on one auxilary array.
\`\`\`java
public static <E extends Comparable<? super E>> void sort(E[] arr) {
    E[] aux = arr.clone();
    sort(arr, 0, arr.length - 1, aux);
}
private static <E extends Comparable<? super E>> void sort(E[] arr, int l, int r, E[] aux) {
    if (l < r) {
        int m = (l + r) / 2;
        sort(aux, l, m, arr);
        sort(aux, m + 1, r, arr);
        merge(arr, l, m, r, aux);
    }
}
\`\`\`

### Merge Method
This will be the updated version of **merge()** that only relies on one auxilary array.
\`\`\`java
private static <E extends Comparable<? super E>> void merge(E[] arr, int l, int m, int r, E[] aux) {
    int k = l, i = l;
    int j = m + 1;
    while (i <= m && j <= r) {
        if (aux[i].compareTo(aux[j]) <= 0) {
            arr[k++] = aux[i++];
        } else {
            arr[k++] = aux[j++];
        }
    }
    while (i <= m) {
        arr[k++] = aux[i++];
    }
    while (j <= r) {
        arr[k++] = aux[j++];
    }
}
\`\`\`

### Time Complexity & Space Complexity (Analysis)
This version of Merge Sort is still a **stable** sorting algorithm.
- The best case is *$O(nlogn)*
- The average case is *$O(nlogn)*
- The worst case is *$O(nlogn)*

This algorithm has a space complexity of *$O(n)*, but it is more efficient as we only clone the auxilary array once. 

## Visualizer
...And that's it! Our implementation of Merge Sort should be working just fine. Remember, there is also a simple visualization tool for sorting algorithms. Click the button below to check out the visualizer!
`

export let quickSortMarkdown = `
# Quick Sort
This section will go over **two** versions of Quick Sort because it will show the importance in creating efficient algorithms.

## Quick Sort Implementation (Version 1)
We will be using generics for our implementation to easily apply our sorting algorithm across all types of arrays.

### Rationale
The basis of Quick Sort is to pick an element from the list and to put all elements less than the pivot to the **left** and all elements greater the pivot to the **right.** As a result, we end up finding the **pivot**, which results in that element being **sorted.** This process is known as **partitioning** and we will be implementing it as a helper method. 

### Helper Method 
We will be using the following **swap()** and **partition()** helper method to find the **pivot.**
\`\`\`java
private static <E extends Comparable<? super E>> int partition(E[] arr, int l, int h){
    E pivot = arr[l]; // we will be using the lowest element given as the pivot
    int i = l - 1; // start index
    int j = h + 1; // end index
    while (true){
        // increment i every time arr[i] is less than the value of the pivot
        do {
            i++;
        } while(arr[i].compareTo(pivot) < 0);
    
        // increment j every time arr[j] is greater than the pivot
        do {
            j--;
        } while(arr[j].compareTo(pivot) > 0);

        // return pivot index once i >= j
        if (i >= j){
            return j;
        }
        
        // swap once you find a value less than pivot and a value greater than pivot
        swap(arr, i, j);
    }
}

private static <E> void swap(E[] arr, int i, int j){
    E temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
\`\`\`


### Sorting Algorithm
This is the setup used for Quick Sort. 

\`\`\`java
public static <E extends Comparable<? super E>> void sort(E[] arr){
    sort(arr, 0, arr.length - 1);
}

private static <E extends Comparable<? super E>> void sort(E[] arr, int l, int h){
    if (l < h){
        int pivot = partition(arr, l, h);
        sort(arr, l, pivot);
        sort(arr, pivot + 1, h);
    }
}
\`\`\`

## Time Complexity (Analysis)
Quick Sort is an **unstable** sorting algorithm. However, the worst case is *$O(n^2)*.
- The best case is *$O(nlogn)*
- The average case is *$O(nlogn)*
- The worst case is *$O(n^2)*

## Quick Sort Implementation (Version 2)
This second version of Quick Sort will be more efficient as we will be using a **random** pivot within our partition() method. This essentially results into the worst case having an **extremely** low probability of occuring. Therefore, this version of Quick Sort is more efficient.

### Sort Method
The sort() method will stay the same as we only have to change the pivot that is chosen.

### Partition Method
This will be the updated version of partition() that relies on a random pivot. 
\`\`\`java
private static <E extends Comparable<? super E>> int partition(E[] arr, int l, int h){
    int randomIndex = ThreadLocalRandom.current().nextInt(l, h);
    E pivot = arr[randomIndex];
    /* use code from previous partition() */
}
\`\`\`

### Time Complexity & Space Complexity (Analysis)
This version of Quick Sort is still an **unstable** sorting algorithm.
- The best case is *$O(nlogn)*
- The average case is *$O(nlogn)*
- The worst case is *$O(nlogn)*

## Visualizer
...And that's it! Our implementation of Quick Sort should be working just fine. Remember, there is also a simple visualization tool for sorting algorithms. Click the button below to check out the visualizer!
`

export let heapSortMarkdown = `
# Heap Sort
`

export let analysisOfSortingAlgorithmsMarkdown = `
# Analysis of Sorting Algorithms
`

export let pathfindingMarkdown = `
# Pathfinding
This part of the page will go over the many relevant pathfinding algorithms that are implemented throughout the site.
`

export let graphsMarkdown = `
# Graphs
This part of the page will go over an implementation of an **undirected** graph and a **directed** graph.

## Undirected Graphs Terminology
The images below explain the terminology that will be used regarding undirected graphs.
|   |   |   |
|:-:|:-:|:-:|
|![Graph Anatomy](https://algs4.cs.princeton.edu/41graph/images/graph-anatomy.png)   | ![Graph Tree](https://algs4.cs.princeton.edu/41graph/images/tree.png)| ![Graph Spanning Forest](https://algs4.cs.princeton.edu/41graph/images/forest.png) |

 Image credits go to Robert Sedgewick & Kevin Wayne. Images can be obtained via their algorithms textbook [website.](https://algs4.cs.princeton.edu/41graph/)

## Undirected Graph Implementation
Keeping the last section in mind, we will be using adjacency-list representation for our implementation of a graph. We will be implementing the barebones logic of a graph. 

**NOTE**: We will also be using a **Bag** data structure, it is similar to an ArrayList, **except that it does NOT support removal of elements.**
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/
public class Graph {
    private static final String NEWLINE = System.getProperty("line.separator");
    private final int V; // number of vertices
    private int E; // number of edges
    private Bag<Integer>[] adj; // adj list for vertex v
    // initialize our instance variables
    public Graph(int V){  
        if (V < 0) {
            throw new IllegalStateException();
        }
        this.V = V;
        this.E = 0;
        adj = (Bag<Integer>[]) new Bag[V]; // array of lists
        for (int v = 0; v < V; v++){
            adj[v] = new Bag<Integer>(); // initialize adj lists
        }
    }
}
\`\`\`

### Helper Method
We will use the following helper method to validate that our vertices are within the bounds *$[0,V - 1]*
\`\`\`java
private void validateVertex(int v) {
    if (v < 0 || v >= V){
        throw new IllegalArgumentException();
    }
}
\`\`\`

### Getters
We will be using the following methods to get the number of vertices and edges.
\`\`\`java
public int V(){
    return V;
}

public int E(){
    return E;
}
\`\`\`

### Adding Edges
We will using the following method to add edges into our graph. Remember, this is an **undirected** graph, so both vertices **must** connect to one another. In a **directed** graph we would only add the edge from *$V \\rightarrow W*.
\`\`\`java
public void addEdge(int v, int w){
    validateVertex(v);
    validateVertex(w);
    adj[v].add(w);
    adj[w].add(v);
    E++;
}
\`\`\`

### Relevant Methods
We will go over two important methods for graphs, **degree()** and **adj()**.

### Adjacent Vertices
We will want to get an iterable that includes all vertices adjacent to a vertex. 
\`\`\`java
public Iterable<Integer> adj(int v){
    validateVertex(v);
    return adj[v];
}
\`\`\`

### Degree
We will also want to know the number of vertices connected to a vertex.
\`\`\`java
public int degree(int v){
    validateVertex(v);
    return adj[v].size();
}
\`\`\`

### String Representation
We will use the following string representation for our graph.
\`\`\`java
public String toString() {
    StringBuilder s = new StringBuilder();
    s.append(V).append(" vertices, ").append(E).append(" edges ").append(NEWLINE);
    for (int v = 0; v < V; v++) {
        s.append(v).append(": ");
        for (int w : adj[v]) {
            s.append(w).append(" ");
        }
        s.append(NEWLINE);
    }
    return s.toString();
}
\`\`\`

## Directed Graphs Terminology
The images below explain the terminology that will be used regarding directed graphs.
|   |   |   |
|:-:|:-:|:-:|
|![Digraph Anatomy](https://algs4.cs.princeton.edu/42digraph/images/digraph-anatomy.png)   | ![Strong Components](https://algs4.cs.princeton.edu/42digraph/images/strong-components.png)|

 Image credits go to Robert Sedgewick & Kevin Wayne. Images can be obtained via their algorithms textbook [website.](https://algs4.cs.princeton.edu/41graph/)

## Undirected Graph Implementation
For the most part, an implementation of a digraph is similar to an implementation of an undirected graph, but it has a few important key differences that we will examine.

**NOTE**: We will also be using a **Bag** data structure, it is similar to an ArrayList, **except that it does NOT support removal of elements.**
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/

public class Digraph {
    private static final String NEWLINE = System.getProperty("line.separator");
    
    private final int V; // number of vertices
    private int E; // number of edges
    private Bag<Integer>[] adj; // adj list for vertex v
    private int[] indegree; // indegree of vertex v
    
    // initialize our instance variables
    public Digraph(int V){  
        if (V < 0) {
            throw new IllegalStateException();
        }
        this.V = V;
        this.E = 0;
        indegree = new int[V];
        adj = (Bag<Integer>[]) new Bag[V]; // array of lists
        for (int v = 0; v < V; v++){
            adj[v] = new Bag<Integer>(); // initialize adj lists
        }
    }
}
\`\`\`

### Helper Method
We will use the following helper method to validate that our vertices are within the bounds *$[0,V - 1]*
\`\`\`java
private void validateVertex(int v) {
    if (v < 0 || v >= V){
        throw new IllegalArgumentException();
    }
}
\`\`\`

### Getters
We will be using the following methods to get the number of vertices and edges.
\`\`\`java
public int V(){
    return V;
}

public int E(){
    return E;
}
\`\`\`

### Adding Edges
We will using the following method to add edges into our graph. In a **directed** graph we **only** add the edge from *$V \\rightarrow W*. We also update the indegree value of vertex *$W*.
\`\`\`java
public void addEdge(int v, int w){
    validateVertex(v);
    validateVertex(w);
    adj[v].add(w);
    indegree[w]++;
    E++;
}
\`\`\`

### Relevant Methods
We will go over two important methods for graphs, **degree()** and **adj()**.

### Adjacent Vertices
We will want to get an iterable that includes all vertices adjacent to a vertex. 
\`\`\`java
public Iterable<Integer> adj(int v){
    validateVertex(v);
    return adj[v];
}
\`\`\`

### Degree
We will also want to know the number of vertices connected to a vertex. For digraphs we have **outdegree** and **indegree**. Outdegree is the number of edges pointing **from** it. Indegree is the number of edges pointing **to** it.
\`\`\`java
public int outdegree(int v){
    validateVertex(v);
    return adj[v].size();
}

public int indegree(int v){
    validateVertex(v);
    return indegree[v];
}
\`\`\`

### String Representation
We will use the following string representation for our digraph.
\`\`\`java
public String toString() {
    StringBuilder s = new StringBuilder();
    s.append(V).append(" vertices, ").append(E).append(" edges ").append(NEWLINE);
    for (int v = 0; v < V; v++) {
        s.append(v).append(": ");
        for (int w : adj[v]) {
            s.append(w).append(" ");
        }
        s.append(NEWLINE);
    }
    return s.toString();
}
\`\`\`

## Visualizer
...And that's it! Our implementation of a Graph & Digraph should be working just fine. Remember, there is also a visualization tool for visualizing a graph and digraph! Click the button below to check out the visualizer!

`

export let dfsMarkdown = `
# Depth-First Search
This part of the page will go over an implementation of Depth-First Search. 

## Depth-First Search Implementation
DFS will be the first searching algorithm that will be examined. This algorithm works on both **graphs** and **digraphs.** An easy explanation for this is that a graph is essentially a digraph that always has two edges within both directions. 

### Rationale
Depth-First Search is a recursive algorithm that recursively visits all vertices that are adjacent to it and have not been marked. An easier way to visualize this is by using the visualizer implemented in the Pathfindings section of the website.

### Helper Method
We will be using the following helper method to validate our vertices are within the bounds *$[0, V-1]*
\`\`\`java
private void validateVertex(int v) {
    int V = marked.length;
    if (v < 0 || v >= V) {
        throw new IllegalArgumentException();
    }
}
\`\`\`

### Depth-First Search
This is the setup used for DFS.
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/
public class DepthFirstSearch {
    private boolean[] marked; // marked[v] = true iff v is reachable from s
    private int[] edgeTo; // edgeTo[v] = last edge on path from s to v
    private final int s; // source vertex
    
    // initialize instance variables and do DFS
    public DepthFirstSearch(Digraph G, int s){
        marked = new boolean[G.V()];
        edgeTo = new int[G.V()];
        this.s = s;
        validateVertex(s);
        dfs(G, s);
    }
    
    // implementation of DFS (only a few lines of code)
    private void dfs(Digraph G, int v){
        marked[v] = true;
        for (int w : G.adj(v)) {
            if (!marked[w]){
                edgeTo[w] = v; // last vertex that vertex w came from
                dfs(G, w); // keep on recursively calling dfs() 
            }
        }
    }
}
\`\`\`

### Paths
We will now focus on returning the path that DFS takes to go from *$S \\rightarrow V*. In other words, we want the path from the source to the target vertex.
\`\`\`java
// used to determine whether there's a path from s -> v
public boolean hasPathTo(int v) {
    validateVertex(v);
    return marked[v];
}

// loop from vertex and retrace steps using edgeTo[]
// we use a stack to return our iterable in last-first order (easy to implement)
// ex: [1, 4, 6] would return "6 4 1" within our iterable
public Iterable<Integer> pathTo(int v) {
    validateVertex(v);
    if (!hasPathTo(v)) return null;
    Stack<Integer> path = new Stack<Integer>();
    // keep looping until edgeTo[x] returns the source vertex
    for (int x = v; x != s; x = edgeTo[x]){
        path.push(x);
    }
    // push the source once we are done looping through our edgeTo[]
    path.push(s);
    return path;
}
\`\`\`

## Visualizer
...And that's it! Our implementation of a DFS should be working just fine. Remember, there is also a visualization tool for visualizing DFS! Click the button below to check out the visualizer!
`

export let bfsMarkdown = `
# Breadth-First Search
This part of the page will go over an implementation of Breadth-First Search. 

## Breadth-First Search Implementation
BFS is the second searching algorithm that will be examined. This algorithm works on both **graphs** and **digraphs.** An easy explanation for this is that a graph is essentially a digraph that always has two edges within both directions. 

### Rationale
Breadth-First Search is an algorithm that puts all vertices **adjacent** to the source vertex **in a queue.** Next, it uses the **first adjacent vertex** from the queue, **by removing it**, and puts all vertices adjacent to that vertex in the queue. This process continues until the queue is empty. An easier way to visualize this is by using the visualizer implemented in the Pathfindings section of the website.

### Helper Method
We will be using the following helper method to validate our vertices are within the bounds *$[0, V-1]*
\`\`\`java
private void validateVertex(int v) {
    int V = marked.length;
    if (v < 0 || v >= V) {
        throw new IllegalArgumentException();
    }
}
\`\`\`

### Breadth-First Search
This is the setup used for BFS.
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/
public class BreadthFirstSearch {
    private static final int INFINITY = Integer.MAX_VALUE;
    private boolean[] marked; // marked[v] = true iff v is reachable from s
    private int[] edgeTo; // edgeTo[v] = last edge on path from s to v
    private int[] disto; // distTo[v] = length of shortest path from s to v
    
    // initialize instance variables and do BFS
    public BreadthFirstSearch(Digraph G, int s){
        marked = new boolean[G.V()];
        edgeTo = new int[G.V()];
        distTo = new int[G.V()];
        for (int v = 0; v < G.V(); v++){
            distTo[v] = INFINITY;
        }
        validateVertex(s);
        bfs(G, s);
    }
    
    // implementation of BFS (only a few lines of code)
    private void bfs(Digraph G, int v){
        Queue<Integer> q = new Queue<>();
        marked[s] = true;
        distTo[s] = 0; // initialize dist as 0 for source vertex
        q.enqueue(s); // add source onto the queue
        // keep looping until the queue is empty
        while(!q.isEmpty()){
            // remove element from queue
            int v = q.dequeue();
            // add all elements adj to the removed vertex onto the queue
            for (int w : G.adj(v)){
                if (!marked[w]){
                    edgeTo[w] = v; // last vertex that vertex w came from
                    distTo[w] = distTo[v] + 1; // update distance
                    marked[w] = true; // mark the vertex as visited
                    q.enqueue(w); // add vertex to the queue
                }
            }
        }
    }
}
\`\`\`

### Paths
We will now focus on returning the path that BFS takes to go from *$S \\rightarrow V*. In other words, we want the path from the source to the target vertex.
\`\`\`java
// returns distance of path s -> v
public int distTo(int v){
    validateVertex(v);
    return distTo[v];
}

// used to determine whether there's a path from s -> v
public boolean hasPathTo(int v) {
    validateVertex(v);
    return marked[v];
}

// loop from vertex and retrace steps using edgeTo[]
// we use a stack to return our iterable in last-first order (easy to implement)
// ex: [1, 4, 6] would return "6 4 1" within our iterable
public Iterable<Integer> pathTo(int v) {
    validateVertex(v);
    if (!hasPathTo(v)) return null;
    Stack<Integer> path = new Stack<Integer>();
    int x; // we will need this once we are done looping to get our source vertex
    // keep looping until distTo[x] is 0 (which means it's the source)
    for (x = v; distTo[x] != 0; x = edgeTo[x]){
        path.push(x);
    }
    // push the source once we are done looping through our edgeTo[]
    path.push(x);
    return path;
}
\`\`\`

## Visualizer
...And that's it! Our implementation of a BFS should be working just fine. Remember, there is also a visualization tool for visualizing BFS! Click the button below to check out the visualizer!
`

export let edgeWeightedGraphsMarkdown = `
# Edge-Weighted Graphs
This part of the page will go over an implementation of an edge-weighted graph.

## Edge-Weighted Graph Implementation
An edge-weighted graph is an undirected graph that has edges that either have a **weight** or **cost.** Before implementing the graph itself, we will implement the **Edge** itself.

### Edge Implementation
We will use the following **Edge** implementation for our Edge-Weighted Graph.
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/
public class Edge implements Comparable<Edge> {
    private final int v; // vertex v
    private final int w; // vertex w
    private final double weight; // weight of the edge from v -> w

    // initialize instance variables
    public Edge(int v, int w, double weight){
        if (v < 0) throw new IllegalArgumentException();
        if (w < 0) throw new IllegalArgumentException();
        if (Double.isNaN(weight)) throw new IllegalArgumentException();
        this.v = v;
        this.w = w;
        this.weight = weight;
    }
    
    // returns weight
    public double weight(){
        return weight;
    }
    
    // returns either vertex
    public int either(){
        return v;
    }
    
    // returns vertex that is diff from given vertex
    public int other(int vertex){
        if      (vertex == v) return w;
        else if (vertex == w) return v;
        else throw new IllegalArgumentException();
    }
    
    // used for comparing edge weights
    @Override
    public int compareTo(Edge that) {
        return Double.compare(this.weight, that.weight);
    }
    
    // string representation of edge
    public String toString() {
        return String.format("%d-%d %.5f", v, w, weight);
    }
}
\`\`\`

### Edge-Weighted Graph
We will be implementing the barebones logic of an Edge-Weighted Graph.
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/
public class EdgeWeightedGraph {
    private static final String NEWLINE = System.getProperty("line.separator");
    private final int V; // number of vertices
    private int E; // number of edges
    private Bag<Edge>[] adj; // adj list for vertex v
    
    // initialize instance variables
    public EdgeWeightedGraph(int V) {
        if (V < 0) throw new IllegalArgumentException();
        this.V = V;
        this.E = 0;
        adj = (Bag<Edge>[]) new Bag[V]; // array of lists of type edge
        for (int v = 0; v < V; v++) {
            adj[v] = new Bag<Edge>(); // initialize adj lists
        }
    }
}
\`\`\`

### Helper Method 
We will use the following helper method to validate that our vertices are within the bounds *$[0, V-1]*
\`\`\`java
private void validateVertex(int v) {
    if (v < 0 || v >= V){
        throw new IllegalArgumentException();
    }
}
\`\`\`

### Getters
We will be using the following methods to get the number of vertices and edges.
\`\`\`java
public int V(){
    return V;
}

public int E(){
    return E;
}
\`\`\`

### Adding Edges
We will using the following method to add edges into our graph. Remember, this is an **undirected** graph, so both vertices **must** connect to one another. In a **directed** graph we would only add the edge from *$V \\rightarrow W*
\`\`\`java
public void addEdge(Edge e){
    int v = e.either();
    int w = e.other(v);
    validateVertex(v);
    validateVertex(w);
    adj[v].add(e);
    adj[w].add(e);
    E++;
}
\`\`\`

### Relevant Methods
We will go over two important methods for graphs, **degree()** and **adj()**.

### Adjacent Vertices
We will want to get an iterable that includes all vertices adjacent to a vertex. 
\`\`\`java
public Iterable<Integer> adj(int v){
    validateVertex(v);
    return adj[v];
}
\`\`\`

### Degree
We will also want to know the number of vertices connected to a vertex.
\`\`\`java
public int degree(int v){
    validateVertex(v);
    return adj[v].size();
}
\`\`\`

### Edges Iterable
We also want to be able to return all Edges within our Edge-Weighted graph.
\`\`\`java
public Iterable<Edge> edges() {
    Bag<Edge> list = new Bag<Edge>();
    for (int v = 0; v < V; v++) {
        int selfLoops = 0;
        for (Edge e : adj(v)) {
            // makes sure it only adds an edge from v -> w once 
            // since one vertex will always be greater in index
            if (e.other(v) > v) {
                list.add(e);
            }
            // handles the other case where v == w
            // add only one copy of each self loop (self loops will be consecutive)
            else if (e.other(v) == v) {
                if (selfLoops % 2 == 0) list.add(e);
                selfLoops++;
            }
        }
    }
    return list;
}
\`\`\`

### String Representation
We will use the following string representation for our graph.
\`\`\`java
public String toString() {
    StringBuilder s = new StringBuilder();
    s.append(V).append(" ").append(E).append(NEWLINE);
    for (int v = 0; v < V; v++) {
        s.append(v).append(": ");
        for (Edge e : adj[v]) {
            s.append(e).append("  ");
        }
        s.append(NEWLINE);
    }
    return s.toString();
}
## Visualizer
...And that's it! Our implementation of an Edge-Weighted Graph should be working just fine. Remember, there is also a visualization tool for visualizing an Edge-Weighted Graph! Click the button below to check out the visualizer!
`

export let mstsMarkdown = `
# Minimum Spanning Trees
This part of the page will go over **two** implementations in finding a **minimum spanning tree.**

## Terminology
A minimum spanning tree is the spanning tree of a graph with the least amount of total weight. The image below explains this concept.
![Minimum Spanning Trees](https://algs4.cs.princeton.edu/43mst/images/mst.png)

Image credits go to Robert Sedgewick & Kevin Wayne. Images can be obtained via their algorithms textbook [website.](https://algs4.cs.princeton.edu/43mst/)

## Kruskal's Algorithm Implementation
Kruskal's Algorithm will be the first algorithm we will go over as it is a simple but elegant way of finding a minimum spanning tree.

### Rationale
In-order to find the minimum spanning tree of a graph, we have the weights in order from least to greatest by sorting the edges by weight. Start the process from least to greatest, if the edge does not make a cycle, then it is part of the minimum spanning tree. This is the basic idea of Kruskal's algorithm.

### Kruskal's Algorithm
This is the setup used for Kruskal's Algorithm.
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/

public class KruskalMST {
    private double weight;
    private Queue<Edge> mst new Queue<>();
    
    public KruskalMST(EdgeWeightedGraph G){
        // get the edges of the graph
        Edge[] edges = new Edge(G.E());
        int t = 0;
        for (Edge e : G.edges()){
            edges[t++] = e;
        }
        // sort edges by weight (edge uses comparable)
        Arrays.sort(edges);
        
        // run greedy algorithm
        UF uf = new UF(G.V());
        for (int i = 0; i < G.E() && mst.size() < G.V() - 1; i++) {
            // gets the vertices v -> w from the edge
            Edge e = edges[i];
            int v = e.either();
            int w = e.other(v);

            // make sure that v-w does not create a cycle
            // in other words, make sure that both vertices aren't in the MST
            // if both vertices aren't in the MST, add edge to MST
            if (uf.find(v) != uf.find(w)) {
                uf.union(v, w);     // merge v and w components
                mst.enqueue(e);     // add edge e to mst
                weight += e.weight();
            }
        }
    }
}
\`\`\`

### Relevant Methods
Once we are done with the algorithm, we can get an iterable of the edges in the MST and we can get the total weigth of the MST.
\`\`\`java
public Iterable<Edge> edges(){
    return  mst;
}

public double weight(){
    return weight;
}
\`\`\`

## Prim's Algorithm Implementation
[TODO]
`

export let edgeWeightedDigraphsMarkdown = `
# Edge-Weighted Digraphs
This part of the page will go over an implementation of an edge-weighted digraph.

## Edge-Weighted Digraph Implementation
For the most part, an implementation of an edge-weighted digraph is similar to an implementation of an edge-weighted graph, as it just a digraph that has edges that either have a **weight** or **cost.** Before implementing the graph itself, we will implement the DirectedEdge itself.
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/
public class DirectedEdge implements Comparable<DirectedEdge> {
    private final int v; // vertex v
    private final int w; // vertex w
    private final double weight; // weight of the edge from v -> w

    // initialize instance variables
    public Edge(int v, int w, double weight){
        if (v < 0) throw new IllegalArgumentException();
        if (w < 0) throw new IllegalArgumentException();
        if (Double.isNaN(weight)) throw new IllegalArgumentException();
        this.v = v;
        this.w = w;
        this.weight = weight;
    }
    
    // returns weight
    public double weight(){
        return weight;
    }
    
    // returns either vertex
    public int from(){
        return v;
    }
    
    // returns vertex that is diff from given vertex
    public int to(int vertex){
        return w; // key difference as we can no longer go from w -> v
    }
    
    // used for comparing edge weights
    @Override
    public int compareTo(Edge that) {
        return Double.compare(this.weight, that.weight);
    }
    
    // string representation of edge
    public String toString() {
        return v + "->" + w + " " + String.format("%5.2f", weight);
    }
}
\`\`\`

### Edge-Weighted Digraph
We will be implementing the barebones logic of an Edge-Weighted Digraph.
\`\`\`java
/*
* Original authors:
* @author Robert Sedgewick
* @author Kevin Wayne
*
* Code can be obtained via their algorithms textbook website.
* Website: https://algs4.cs.princeton.edu/41graph/
*/

public class EdgeWeightedDigraph {
    private static final String NEWLINE = System.getProperty("line.separator");
    private final int V; // number of vertices
    private int E; // number of edges
    private Bag<DirectedEdge>[] adj; // adj list for vertex v
    private int[] indegree; // indegree of vertex v

    // initialize instance variables
    public EdgeWeightedDigraph(int V) {
        if (V < 0) throw new IllegalArgumentException();
        this.V = V;
        this.E = 0;
        this.indegree = new int[V];
        adj = (Bag<DirectedEdge>[]) new Bag[V]; // array of lists
        for (int v = 0; v < V; v++){
            adj[v] = new Bag<DirectedEdge>(); // initialize adj lists
        }
    }
}
\`\`\`

### Helper Method 
We will use the following helper method to validate that our vertices are within the bounds *$[0, V -1]*
\`\`\`java
private void validateVertex(int v){
    if (v < 0  || v >= V){
        throw new IllegalArgumentException();
    }
}
\`\`\`

### Getters 
We will be using the following methods to get the number of vertices and edges.
\`\`\`java
public int V(){
    return V;
}

public int E(){
    return E;
}
\`\`\`

### Adding Edges 
We will be using the following method to add edges into our graph. In a **directed** graph we **only** add the edge from *$V \\rightarrow W*
\`\`\`java
public void addEdge(DirectedEdge e) {
    int v = e.from();
    int w = e.to();
    validateVertex(v);
    validateVertex(w);
    adj[v].add(e);
    indegree[w]++;
    E++;
}
\`\`\`

`

export let shortestPathsMarkdown = `
# Shortest Paths

`

export let maxFlowMinCutMarkdown = `
# Maxflow-Mincut

`