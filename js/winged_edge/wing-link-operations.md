#### Wing Link Operations
##### WING(E1, E2);
> " stores edge pointers into edges so that the face perimeters
    and vertex perimeters are made; and so that surface parity
    is preserved "
  " Given two edges which have a vertex and a face in common,
    the WING operation places the first edge in the proper
    relationship (PCW, NCCW, NCW, or PCCW) with respect to the
    second, and the second in the proper relationship with
    respect to the first. "

In other words, if E1 and E2 share a vertex and a face: associate E1 and E2 by setting their wing pointers appropriately

*NOTE:* this mockup/example/pseudo-code is a fucking snake's nest of conditional logic but I can't think of a clean way to handle it

```js
function WING(E1, E2) {
  // if E1 "leads into" E2
  if(E1.nvt == E2.pvt)
    // if E1 and E2 share a right face
    if(E1.nface == E2.nface)
      // E2 is E1's next clockwise edge
      E1.ncw = E2
      // and E1 is E2's next counter-clockwise edge
      E2.nccw = E1
    // or left face
    if(E1.pface == E2.pface)
      // E2 is E1's previous clockwise edge
      E1.pcw = E2
      // and E1 is E2's previous counter-clockwise edge
      E2.pccw = E1
  // or vice versa
  if(E1.pvt == E2.nvt)
    // if E1 and E2 share a right face
    if(E1.nface == E2.nface)
      // E1 is E2's next clockwise edge
      E2.ncw = E1
      // and E2 is E1's next counter-clockwise edge
      E1.nccw = E2
    // or left face
    if(E1.pface == E2.pface)
      // E1 is E2's previous clockwise edge
      E2.pcw = E1
      // and E2 is E1's previous counter-clockwise edge
      E1.pccw = E2
  // if E1 and E2 end at the same vertex
  if(E1.nvt == E2.nvt)
    // if E1's right face is E2's left face
    if(E1.nface == E2.pface)
      // E2 is E1's next clockwise edge
      E1.ncw = E2
      // and E1 is E2's previous counter-clockwise edge
      E2.pccw = E1
    // or vice versa
    if(E1.pface == E2.nface)
      // E2 is E1's previous counter-clockwise edge
      E1.pccw = E2
      // and E1 is E2's next clockwise edge
      E2.ncw = E1
  // or start at the same vertex
  if(E1.pvt == E2.pvt)
    // if E1's right face is E2's left face
    if(E1.nface == E2.pface)
      // E2 is E1's next counter-clockwise edge
      E1.nccw = E2
      // and E1 is E2's previous clockwise edge
      E2.pcw = E1
    // or vice versa
    if(E1.pface == E2.nface)
      // E2 is E1's previous clockwise edge
      E1.pcw = E2
      // and E1 is E2's next counter-clockwise edge
      E2.nccw = E1
}
```

##### INVERT(E)
>  " swaps the vertex, face, clockwise wing, and counter
>    clockwise wing pointers of an edge. INVERT preserves
>    surface parity, but flips edge parity. "

So, do the following:
1. swap E.nvt with E.pvt
2. swap E.nface with E.pface
3. swap E.ncw with E.pcw
4. swap E.nccw with E.pccw

*NOTE:* Below pseudo-code does this with an XOR swap. Could maybe pull out the XOR swap, but also it probably doesn't even work in JS like this, the object properties aren't pointers

```js
function(E) {
  // swap vertex pointers
  E.nvt = E.nvt ^ E.pvt
  E.pvt = E.pvt ^ E.nvt
  E.nvt = E.nvt ^ E.pvt
  // swap face pointers
  E.nface = E.nface ^ E.pface
  E.pface = E.pface ^ E.nface
  E.nface = E.nface ^ E.pface
  // swap clockwise edge pointers
  E.ncw = E.ncw ^ E.pcw
  E.pcw = E.pcw ^ E.ncw
  E.ncw = E.ncw ^ E.pcw
  // swap counter-clockwise edge pointers
  E.nccw = E.nccw ^ E.pccw
  E.pccw = E.pccw ^ E.nccw
  E.nccw = E.nccw ^ E.pccw
}
```
