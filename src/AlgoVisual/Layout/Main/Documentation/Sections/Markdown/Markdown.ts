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

## Insertion Sort Implementation
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