var q1={
    "id":1,
    "Question":"Which of the following are valid if/else statements in Python, assuming x and y are defined appropriately:",
    "Option 1":"if x < y: print('foo'); print('bar'); print('baz')",
    "Option 2":"if x < y: if x > 10: print('foo')",
    "Option 3":"if x < y: print('foo') else: print('bar')",
    "Option 4":"None of the above"
}
 
data1={
    id:1,
    "answer":1
}
 
 
var q2={
    "id":2,
    "Question":"What is the value of this expression: 'a' + 'x' if '123'.isdigit() else 'y' + 'b'",
    "Option 1":"’ab’",
    "Option 2":"’axyb’",
    "Option 3":"’ax’",
    "Option 4":"’axb’"
}
 
data2={
    id:2,
    "answer":3
}
 
var q3={
    "id":3,
    "Question":"What is the output from this print() function call:print('$100 $200 $300'.count('$'),'$100 $200 $300'.count('$', 5, 10),'$100 $200 $300'.count('$', 5))",
    "Option 1":"312",
    "Option 2":"321",
    "Option 3":"310",
    "Option 4":"311"
}
 
data3={
    id:3,
    "answer":1
}


 
 
var q4={
    "id":4,
    "Question":"Which type of copy is shown in the code below? l1=[[10, 20], [30, 40], [50, 60]] ls=list(l1) ls [[10, 20], [30, 40], [50, 60]]",
    "Option 1":"Shallow copy",
    "Option 2":"Deep copy",
    "Option 3":"Memberwise",
    "Option 4":"All of the above"
}
data4={
    id:4,
    "answer":1
}
 
var q5={
    "id":5,
    "Question":"Which of the statements regarding dictionaries is false?",
    "Option 1":"The values of the dictionary can be accessed as dict[key]",
    "Option 2":"Values of a dictionary must be unique",
    "Option 3":"Values of a dictionary can be a mixture of letters and numbers",
    "Option 4":"More than one key can have the same value"
}
data5={
    id:5,
    "answer":2
}
var q6={
    "id":6,
    "Question":"What will be the output for print('cba'.maketrans('abc', '123'))",
    "Option 1":"{97: 49, 98: 50, 99: 51}",
    "Option 2":"{65: 49, 66: 50, 67: 51}",
    "Option 3":"321",
    "Option 4":"123"
}
data6={
    id:6,
    "answer":1
}
 

 
var q7={
    "id":7,
    "Question":"Predict the output in python shell 12^7.",
  "Option 1":"35831808",
  "Option 2":"11",
  "Option 3":"13",
  "Option 4":"Error"
}
data7={
    id:7,
    "answer":2
}
var q8={
    "id":8,
    "Question":"What method in Python is used to check whether the given object belongs to a class or its subclasses?",
    "Option 1":"<isatty>",
    "Option 2":"<object>",
    "Option 3":"<isinstance>",
    "Option 4":"<issubclass>"
}
data8={
    id:8,
     "answer":3
}
var q9={
    "id":9,
    "Question":"Which two main modules would be used to monkeypatch closed entities inside functions in Python?",
    "Option 1":"<monk,patchy>",
    "Option 2":"<ast,inspect>",
    "Option 3":"<zodiac,unittest>",
    "Option 4":"<monk,diff-match-patch>"
}
data9={
    id:9,
     "answer":2
}

var q10={
    "id":10,
    "Question":"How do you find the 3rd element from last in a single pass?",
    "Option 1":"Use one pointer, start with the start and traverse the whole array, reaching the last",
    "Option 2":"Use two pointers, with one at the start and the other at the end. Increasing one pointer and decreasing the other one by one 3 times gives the result at the second pointer.",
    "Option 3":"Traverse through the array from first to last and then go back three times",
    "Option 4":"Start from the last of the array and take three steps forward to reach third from the start."
}
 
data10={
    id:10,
    "answer":2
}
 

var q11={
    "id":11,
    "Question":"Given two arrays 1,2,3,4,5 and 2,3,4,5,6 find which number is not present in the second array",
    "Option 1":"Put elements of the second array in Hashtable and for every element of the first array, check if present in hash or not.",
    "Option 2":"Create a new array consisting of both the arrays and check if first half equal to second half.",
    "Option 3":"The numbers in both the arrays needs to be different always to find if present in the second array",
    "Option 4":"The array elements can’t be checked with each other for each element in first array is unique."
}
 
data11={
    id:11,
    "answer":1
}
 

 

 

var q12={
    "id":12,
    "Question":"What Is Rstrip() In Python?",
    "Option 1":"Duplicates the string but leaves out the whitespace characters from the end.",
    "Option 2":"Duplicates the string but removes all the whitespaces from a string.",
    "Option 3":"Copies the entire string into another variable.",
    "Option 4":"It is not a function in python."
}
 
data12={
    id:12,
    "answer":1
}
 
var q13={
    "id":13,
    "Question":"What Is a Dictionary In Python?",
    "Option 1":"A data structure in Python that is a mutable, or changeable, and has ordered sequence of elements.",
    "Option 2":"Used to look through all built-in functions and keywords in Python.",
    "Option 3":"A group of objects mapped to another group of objects.",
    "Option 4":"It is a sequence of immutable Python objects."
}
 
data13={
    id:13,
    "answer":3
}
 
var q14={
    "id":3,
    "Question":"What Is The Output of 10>>1",
    "Option 1":"Syntax Error.",
    "Option 2":"1",
    "Option 3":"10",
    "Option 4":"5"
}
 
data14={
    id:14,
    "answer":4
}
 
var q15={
    "id":15,
    "Question":"Which Of The Following Is Mutable In Python?",
    "Option 1":"List.",
    "Option 2":"Tuple.",
    "Option 3":"Both.",
    "Option 4":"None."
}
 
data15={
    id:15,
    "answer":1
}

var q16={
    "id":16,
    "Question":"How to find the two maximum numbers in a randomly arranged array of numbers?",
    "Option 1":"Take max() of array.",
    "Option 2":"Arrange the array in ascending order and take the first two elements in the array.",
    "Option 3":"Take the array and find the last two elements.",
    "Option 4":"Take two loops and arrange in descending order. Take first two elements in the new array"
}
 
data16={
    id:16,
    "answer":4
}

var q17={
	"id":17,
	"Question":"You want to create a ‘bytes’ object consisting of five null (0x00) bytes.All of the following will work except:",
	"Option 1":"bytes(‘\x00\x00\x00\x00\x00’,’utf-8’)",
	"Option 2":"bytes(5)",
	"Option 3":"bytes([0]*5)",
	"Option 4":"bytes(0,0,0,0,0)"
}
data17={
	id:17,
	"answer":4
}

var q18={
    "id":18,
    "Question":"Which of these is not true for Python?",
    "Option 1":"It supports automatic garbage collection",
    "Option 2":"It can be easily integrated with C, C++, COM, ActiveX, CORBA, and Java",
    "Option 3":"It provides very high-level dynamic data types and supports dynamic type checking",
    "Option 4":"It is strictly Object Oriented"
}
data18={
    id:18,
    "answer":4
}
 

 

var q19={
    "id":19,
    "Question":"Which Of The Following Statements Is Most Accurate For The Declaration X = Circle()?",
    "Option 1":"x contains an int value.",
    "Option 2":"x contains an object of the Circle type.",
    "Option 3":"x contains a reference to a Circle object.",
    "Option 4":"You can assign an int value to x."
}
data19={
    id:19,
    "answer":3
}

var q20={
    "id":20,
    "Question":"What is the output of 13 << 2?",
    "Option 1":"3",
    "Option 2":"52",
    "Option 3":"26",
    "Option 4":"6"
}
data20={
    id:20,
    "answer":2
}

 

 

var q21={
    "id":21,
    "Question":"If a function does not return any value, what value is shown when executed in the shell?",
    "Option 1":"bool",
    "Option 2":"int",
    "Option 3":"None",
    "Option 4":"void"
}
data21={
    id:21,
    "answer":3
}
 

 

 




 

 



 
 

 	
	
 
 
 
 
