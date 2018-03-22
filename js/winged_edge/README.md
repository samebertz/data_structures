# Winged Edge BFEV
Winged Edge (BFEV) data structure implementation using the original "WINGED EDGE POLYHEDRON REPRESENTATION" paper from Baumgart, which can be found [here](http://www.dtic.mil/dtic/tr/fulltext/u2/755141.pdf).

Quote blocks are directly from the paper, reproduced for readability and easy reference.

## Relevant Excerpts

![BASIC NODE STRUCTURE](assets/Figure_2.1_-_BASIC_NODE_STRUCTURE.png)

<!--
| WORD | BODY-BLOCK | FACE-BLOCK | EDGE-BLOCK | VERTEX-BLOCK |
| ---: | ---------- | ---------- | ---------- | ------------ |
| -3 | part, copart |              |              | XWC      |
| -2 |              |              |              | YWC      |
| -1 |              |              |              | ZWC      |
|  0 | type         | type         | type         | type     |
| +1 | nface, pface | nface, pface | nface, pface |          |
| +2 | ned, ped     | ped          | ned, ped     | ped      |
| +3 | nvt, pvt     |              | nvt, pvt     | nvt, pvt |
| +4 |              |              | ncw, pcw     |          |
| +5 |              |              | nccw, pccw   |          |
-->

### A SUMMARY OF WINGED EDGE OPERATIONS
Notes:
1. ***Q*** here is any ***BLOCK***, and ***A*** is "***A different EDGE***"
2. __FUNCTION.(X,Y)__ notation describes a setter function which somehow associates X with Y
    + e.g. __PVT(V,E)__ sets the ***pvt*** word of ***E*** to point to ***V*** )

#### Dynamic Storage Allocation

<pre>
DYNAMIC STORAGE ALLOCATION

1. Q ← GETBLK(SIZE);
2. RELBLK(Q, SIZE);
</pre>

> " At the very bottom, of what is becoming a rather deep nest of
    primitives within primitives, are the two dynamic storage allocation
    functions GETBLK and RELBLK. GETBLK allocates from 1 to 4K words of
    memory space in a contiguous block and returns the machine address of
    the first word of that block. RELBLK releases the indicated block to
    the available free memory space. (It is sad that the machines of our
    day do not come with dynamic free storage). A good reference for
    implementing such dynamic storage, mentioned earlier, is Knuth
    [reference 7]. Although a fixed block size of ten or fewer words can
    be made to handle the BFEV entities, grandiose and fickle research
    applications (as well as memory use optimization) demand the
    flexibility of a variable block size. "

#### BFEV Make & Kill Operations

<pre>
BFEV MAKE & KILL OPERATIONS

1. BNEW ← MKB(B);		KLB(BNEW);
2. FNEW ← MKF(B);		KLF(FNEW);
3. ENEW ← MKE(B);		KLE(ENEW);
4. VNEW ← MKV(B);		KLV(VNEW);
</pre>

> " Just above the free storage routines are the four pairs of
    make and kill operations. The MKB operation creates a body block and
    attaches it as a sub-part of the given body. The world body always
    exists so that MKB(WORLD) will make a body attached to the world. In
    this paper, the terms 'attach' and 'detach' refer to Operations on
    the parts-tree linkages. The FEV make operations: MKF, MKE, MKV
    create the corresponding FEV entitles and place them in their
    respective FEV rings of the given body. In the current
    implementation, the FEV makers set the type bits of the entity, and
    increment the proper total FEV Counter, as well as the proper body
    FEV counter in the given body's node, (the Fcnt, Ecnt, Vcnt node
    positions are shown in figure 2.3), The kill operations: KLB, KLF,
    KLE, and KLV; delete the entity from its ring (or remove it from the
    parts-tree), release its space by calling RELBLK, and then decrement
    the appropriate counters. The body of the entity is needed by the
    kill primitives and can be provide directly as an argument or if
    missing, will be found in the data by the primitive itself. "

#### Fetch Link and Store Link Operations

<pre>
FETCH LINK AND STORE LINK OPERATIONS

1. F ← NFACE(Q);	F ← PFACE(Q);	NFACE.(F, Q);	PFACE.(F, Q);
2. E ← NED(Q);		E ← PED(Q);		NED.(E, Q);		PED.(E, Q);
3. V ← NVT(Q);		V ← PVT(Q);		NVT.(V, Q);		PVT.(V, Q);
4. A ← NCW(E);		A ← PCW(E);		NCW.(A, E);		PCW.(A, E);
5. A ← NCCW(E);		A ← PCCW(E);	NCCW.(A, E);	PCCW.(A, E);
</pre>

> " Each of the fetch link and store link operations named in the
    summary is a single machine instruction that accesses the
    corresponding link position in a node. Once BFEV nodes exist, with
    their rings and parts-tree already in place; the fetch and store link
    operations are used to construct or modify a polyhedron's surface, At
    this lowest level, constructing a polyhedron requires three steps:
    first the two vertex and two face pointers are placed into each edge
    in counter clockwise order as they appear when that edge is viewed
    from the exterior of the solid; second an edge pointer is placed in
    each face and vertex, so that one can later get from a given face or
    vertex to one of its edges; and third the edge wings are linked so
    that all the ordered perimeter accessing operations described below
    will work. Wing linking is facilitated by the WING operation. "

#### The Wing Link Operation

<pre>
WING LINK OPERATIONS

1. WING(E1, E2);
2. INVERT(E);
</pre>

> " The WING operation stores edge pointers into edges so that
    the face perimeters and vertex perimeters are made; and so that
    surface parity is preserved. Given two edges which have a vertex and
    a face in common, the WING operation places the first edge in the
    proper relationship (PCW, NCCW, NCW, or PCCW) with respect to the
    second, and the second In the proper relationship with respect to the
    first. The INVERT operation swaps the vertex, face, clockwise wing,
    and counter clockwise wing pointers of an edge. INVERT preserves
    surface parity, but flips edge parity "

#### Perimeter Fetch and Store Operations

<pre>
PERIMETER FETCH OPERATIONS

1. E ← ECW(E, Q);
2. E ← ECCW(E, Q);
3. F ← FCW(E, V);
4. F ← FCCW(E, V);
5. V ← VCW(E, F);
6. V ← VCCW(E, F);
7. Q ← OTHER(E, Q);
</pre>

> " There are seven Perimeter fetch primitives, which when given
    an edge and one of its links will fetch another link in a certain
    fashion. Using the winged edge data structure these primitives are
    easily implemented in a few machine instructions which test the type
    bits and typically do one or two compares. Clockwise and counter
    clockwise are always determined from the outside of a polyhedron
    looking down on a particular face, edge or vertex. I apologize for
    the high redundancy on the next page, but felt that it was necessary
    to make the explanations independent for reference. "

##### The Perimeter Fetch Operations

`E ← ECW(E,F);` Get Edge Clockwise from E about F's perimeter.<br>
`E ← ECCW(E,F);` Get Edge Counter Clockwise from E about F's perimeter.
> " Given an edge and a face belonging to that edge, the ECW
    fetch primitive returns the next edge clockwise belonging to the
    given face's perimeter and the ECCW fetch primitive returns the next
    edge counter clockwise belonging to the given face's perimeter. "

`E ← ECW(E,V);` Get Edge Clockwise from E about V's perimeter.<br>
`E ← ECCW(E,V);` Get Edge Counter Clockwise from E about V's perimeter.
> " Given an edge and a vertex belonging to that edge, the ECW
    fetch primitive returns the next edge clockwise belonging to the
    given vertex's perimeter and the ECCW fetch primitive returns the
    next edge counter clockwise belonging to the given vertex's
    perimeter. "

`F ← FCW(E,V);` Get the face clockwise from E about V.<br>
`F ← FCCW(E,V);` Get the face counter clockwise from E about V.
> " Given an edge and a vertex belonging to that edge, the FCW
    fetch primitive returns the face clockwise from the given edge about
    the given vertex and the FCCW fetch primitive returns the face
    counter clockwise from the given edge about the given vertex. "

`V ← VCW(E,F);` Get the vertex clockwise from E about F.<br>
`V ← VCCW(E,F);` Get the vertex counter clockwise from E about F.
> " Given an edge and a face belonging to that edge, the VCW
    fetch primitive returns the vertex clockwise from the given edge
    about the given face and the VCCW fetch primitive returns the vertex
    counter clockwise from the given edge about the given face. "

`F ← OTHER(E,F);` Get the other face of an edge.<br>
`V ← OTHER(E,V);` Get the other vertex of an edge.
> " Given an edge and one face of that edge the OTHER fetch
    primitive returns the other face belonging to that edge. Given an
    edge and one vertex of that edge the OTHER fetch primitive returns
    the other vertex belonging to that edge. "

#### The Parts-Tree Operations

<pre>
PARTS TREE OPERATIONS.

1. B ← PART(B);		B ← COPART(B);
2. B ← BODY(B);		B ← SUPART(B);
3. ATT(B1, B2);		ATTACH(B1, B2);
4. DET(B);				DETACH(B);
</pre>

> " As shown in figure 2,1, each body node has two parts-tree
    links named PART and COPART. The PART link is the head of a list of
    sub-Parts of the body. When a body has no sub-parts the PART link is
    the negative of that body's pointer; that is the body Points at
    itself. When a body has parts, the first part is pointed at by PART
    and the second is pointed at by the COPART link of the first and so
    on until a negative pointer is retrieved which indicates the end of
    the parts list. The negative pointer at the end of a parts list
    points back to the original body, which is the supra-part or "supart"
    of all those bodies in that list.<br>
    The parts may be accessed by its link names PART and COPART.
    Also the SUPART of a body returns the (positive) pointer to the
    supart of a body. The BODY operation returns the body to which a face
    edge or vertex belongs; this might be found by CDR'ing a FEV ring
    until a body node is reached, but for the sake of speed each edge (as
    shown in figure 2.3) has a PBODY link which points back to the body
    to which the edge belongs, and since each face and vertex points at
    an edge, the body of an FEV entity can be retrieved by fetching only
    one or two links.<br>
    The parts-tree is altered by the DET(B) operation which
    removes a body B from its supart and leaves it hanging free; and the
    ATT(B1,B2) operation which places a free body B1 into the parts list
    of a body B2. Since bodies are made attached to the world body and
    generally kept attached to something, two further parts-tree
    operations are provided, compounding the first two in the necessary
    manner. The DETACH(B) operation DET's B from its current owner and
    ATT's it to the world; and the ATTACH(B1,B2) operation will DET B1
    from its supart and attach it to a new supart. In normal (one world)
    circumstances one only needs to use ATTACH to build things. "
