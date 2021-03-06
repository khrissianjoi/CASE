from itertools import *

def calculate_q(iVal, jVal):
  if(jVal == 1 and iVal == 1):
    return 1
  return 0

def calculate_r(iVal, jVal):
  if (iVal == 1 and jVal == 0):
    return 1
  return 0

def calculate_s(iVal, jVal):
  if (iVal == 0 and jVal == 1):
    return 1
  return 0

def calculate_t(iVal, jVal):
  if (iVal == 0 and jVal == 0):
    return 1
  return 0

def calculate_p(q, r, s, t):
  return sum(q, r, s, t)

def asymmetricBinaryDissimilarity(table, labels):
  counter = 0
  for currentPair in combinations(labels, 2):
    counter += 1 
    i = currentPair[0]
    j = currentPair[1]

    r = 0
    s = 0
    q = 0
    for count, iVal in enumerate(table[i]):
      jVal = table[j][count]
      
      q += calculate_q(iVal, jVal)
      r += calculate_r(iVal, jVal)
      s += calculate_s(iVal, jVal)

    top = r + s
    bottom = q + r + s
    finalValue = top / bottom

    equation=' ({0} + {1}) / ({2} + {3} + {4})'.format(r, s, q, r, s)
    
    print(equation)
    print(currentPair, finalValue)
  print("total combinations:", counter)
table = {
  "A" : [1,1,1,1,1,0],
  "B" : [1,0,0,0,1,1],
  "C" : [1,1,1,0,1,0],
  "D" : [1,0,0,0,0,0],
  "E" : [0,1,1,1,1,0],
  }
  
labels = ["A",
"B",
"C",
"D",
"E"]

asymmetricBinaryDissimilarity(table, labels)