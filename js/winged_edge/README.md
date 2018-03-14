## Winged Edge BFEV
Winged Edge (BFEV) data structure implementation using the original "WINGED EDGE POLYHEDRON REPRESENTATION" paper from Baumgart, which can be found [here](http://www.dtic.mil/dtic/tr/fulltext/u2/755141.pdf).

### Relevant Excerpts

#### BASIC NODE STRUCTURE

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

#### A SUMMARY OF WINGED EDGE OPERATIONS
Notes:
1. ***Q*** here is any ***BLOCK***
2. __FUNCTION.(X,Y)__ notation describes a setter function which somehow associates X with Y
    + e.g. __PVT(V,E)__ sets the ***pvt*** word of ***E*** to point to ***V*** )



<!--
  |      | DYNAMIC STORAGE ALLOCATION |
  | ---: | -------------------------- |
  | 1 | Q ← GETBLK(SIZE); |
  | 2 | RELBLK(Q, SIZE);   |

  |      | BFEV MAKE & KILL OPERATIONS |
  | ---: | --------------------------- |
  | 1 | BNEW ← MKB(B);		KLB(BNEW); |
  | 2 | FNEW ← MKF(B);		KLF(FNEW); |
  | 3 | ENEW ← MKE(B);		KLE(ENEW); |
  | 4 | VNEW ← MKV(B);		KLV(VNEW); |
-->

|      | FETCH LINK AND STORE LINK OPERATIONS |
| ---: | ------------------------------------ |
| 1 | F ← NFACE(Q);	F ← PFACE(Q);	NFACE.(F, Q);	PFACE.(F, Q);	|
| 2 | E ← NED(Q);		E ← PED(Q);		NED.(E, Q);		PED.(E, Q);		|
| 3 | V ← NVT(Q);		V ← PVT(Q);		NVT.(V, Q);		PVT.(V, Q);		|
| 4 | A ← NCW(E);		A ← PCW(E);		NCW.(A, E);		PCW.(A, E);		|
| 5 | A ← NCCW(E);	A ← PCCW(E);	NCCW.(A, E);	PCCW.(A, E);	|

|      | WING LINK OPERATIONS |
| ---: | -------------------- |
| 1 | WING(E1, E2); |
| 2 | INVERT(E);    |

|      | PERIMETER FETCH OPERATIONS |
| ---: | -------------------------- |
| 1 | E ← ECW(E, Q);   |
| 2 | E ← ECCW(E, Q);  |
| 3 | F ← FCW(E, V);   |
| 4 | F ← FCCW(E, V);  |
| 5 | V ← VCW(E, F);   |
| 6 | V ← VCCW(E, F);  |
| 7 | Q ← OTHER(E, Q); |

<!--
  |      | PARTS TREE OPERATIONS |
  | ---: | --------------------- |
  | 1 | B ← PART(B);		B ← COPART(B);	|
  | 2 | B ← BODY(B);		B ← SUPART(B);	|
  | 3 | ATT(B1, B2);		ATTACH(B1, B2);	|
  | 4 | DET(B);					DETACH(B);			|
-->
