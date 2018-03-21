### Fetch and Store Link Operations
#### Face fetch/store link operations
*Note:* only Body, Edge, and Face blocks use the *nface* and *pface* words

##### F ← NFACE(Q);
Retrieve word *nface* of block *Q*, e.g. `[Block].nface` or `function(Q) { return Q.nface }`

##### F ← PFACE(Q);
Retrieve word *pface* of block *Q*, e.g. `[Block].pface` or `function(Q) { return Q.pface }`

##### NFACE.(F, Q);
Set word *nface* of block *Q* to point to Face block *F*, e.g. `[Block].nface = F` or `function(F, Q) { Q.nface = F }`

##### PFACE.(F, Q);
Set word *pface* of block *Q* to point to Face block *F*, e.g. `[Block].pface = F` or `function(F, Q) { Q.pface = F }`

#### Edge fetch/store link operations
*Note:* only Body and Edge blocks use the *ned* word, and in Face and Vertex blocks the *ped* word points to an associated edge

##### E ← NED(Q);
Retrieve word *ned* of block *Q*, e.g. `[Block].ned` or `function(Q) { return Q.ned }`

##### E ← PED(Q);
Retrieve word *ped* of block *Q*, e.g. `[Block].ped` or `function(Q) { return Q.ped }`

##### NED.(E, Q);
Set word *ned* of block *Q* to point to Edge block *E*, e.g. `[Block].ned = E` or `function(E, Q) { Q.ned = E }`

##### PED.(E, Q);
Set word *ped* of block *Q* to point to Edge block *E*, e.g. `[Block].ped = E` or `function(E, Q) { Q.ped = E }`

#### Vertex fetch/store link operations
*Note:* only Body, Edge, and Vertex blocks use the *nvt* and *pvt* words

##### V ← NVT(Q);
Retrieve word *nvt* of block *Q*, e.g. `[Block].nvt` or `function(Q) { return Q.nvt }`

##### V ← PVT(Q);
Retrieve word *pvt* of block *Q*, e.g. `[Block].pvt` or `function(Q) { return Q.pvt }`

##### NVT.(V, Q);
Set word *nvt* of block *Q* to point to Vertex block *V*, e.g. `[Block].nvt = V` or `function(E, Q) { Q.nvt = E }`

##### PVT.(V, Q);
Set word *pvt* of block *Q* to point to Vertex block *V*, e.g. `[Block].pvt = V` or `function(E, Q) { Q.pvt = E }`

##### Edge fetch/store wing link operations
*Note:* only Edge blocks use the *ncw*, *pcw*, *nccw*, and *pccw* words
*Note:* below, *A* means "a different edge"

##### A ← NCW(E);
Retrieve word *ncw* of Edge block *E*, e.g. `[Edge].ncw` or `function(E) { return E.ncw }`

##### A ← PCW(E);
Retrieve word *pcw* of Edge block *E*, e.g. `[Edge].pcw` or `function(E) { return E.pcw }`

##### A ← NCCW(E);
Retrieve word *nccw* of Edge block *E*, e.g. `[Edge].nccw` or `function(E) { return E.nccw }`

##### A ← PCCW(E);
Retrieve word *pccw* of Edge block *E*, e.g. `[Edge].pccw` or `function(E) { return E.pccw }`

##### NCW.(A, E);
Set word *ncw* of Edge block *E* to point to Edge block *A*, e.g. `[Edge].ncw = A` or `function(A, E) { E.ncw = A }`

##### PCW.(A, E);
Set word *pcw* of Edge block *E* to point to Edge block *A*, e.g. `[Edge].pcw = A` or `function(A, E) { E.pcw = A }`

##### NCCW.(A, E);
Set word *nccw* of Edge block *E* to point to Edge block *A*, e.g. `[Edge].nccw = A` or `function(A, E) { E.nccw = A }`

##### PCCW.(A, E);
Set word *pccw* of Edge block *E* to point to Edge block *A*, e.g. `[Edge].pccw = A` or `function(A, E) { E.pccw = A }`

*Note:* Really these are all just property accessors
