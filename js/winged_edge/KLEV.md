#### 7. E ← KLEV(VNEW); 	kill edge & Vertex leaving an edge.

> " This primitive kills an edge and a vertex leaving one edge. This primitive
    will eliminate spurs made with MKEV and midpoints made with ESPLIT; in a
    pure form it would have to leave vertices with a valence greater than two
    untouched, however it in fact “un-pyramids” them with a series of KLFE’s
    and then kills the remaining spur. "

TODO: delete remaining spur. just a diff logic when a pyramid i think. since won't be patching E or anything, but will be patching anything adjacent to enew that the KLFE calls didn't get. maybe could devolve pyramid to a single split edge, KLEV that, then KLFE the "repaired" edge? also doesn't handle KLEV(MKEV), i.e. just being called on a spur.

so essentially there are 3 possibilities for the local state of the vertex KLEV is called on:
1. the most basic, a spur created with MKEV
2. a "flat" vertex with valence 2, e.g. on the interior of a wire polyhedron, or created with ESPLIT
3. a "pyramid" vertex with valence greater than 2, e.g. the result of multiple MKFE calls sharing a vertex

to handle each case:
1. unlink ENEW (which is `PED(VNEW)`) from the vertex "opposite" VNEW, patch wings of ENEW
2. unlink ENEW, and unlink VNEW from E, link E to vertex "opposite" VNEW on ENEW, link wings of ENEW to E
3. KLFE all edges connected to VNEW other than ENEW, then perform process 1 on remaining spur

process 3 relies on KLFE working in the context shown below:
<pre>
●───────────●
│╲          │
│ ╲         │
│  ╲←←←ENEW │
│   ╲       │
│    ╲      │
│     ●-VNEW│
│      ╲    │
│       ╲   │
│        ╲  │
│         ╲ │
│          ╲│
●───────────●
</pre>
so that killing ENEW leaves a spur, i.e. what you would get from MKEV

<!--
```js
function KLEV(vnew) {
  const enew = vnew.ped,
        E = Fetch.V.ECCW(enew, vnew)
  let E2 = Fetch.V.ECW(enew, vnew) || E,
      E3 = E2
  while(!Object.is(E2, E)) {
    KLFE(E2)
    E2 = Fetch.V.ECW(E3, vnew)
    E3 = E2
  }
  // orient edges as to match output of MKEV
  if(!Object.is(enew.nvt, vnew)) Link.invert(enew)
  if(!Object.is(E.pvt, vnew)) Link.invert(E)
  // link E to enew.pvt
  E.pvt = enew.pvt
  const V = E.pvt
  // link wings for newly adjacent edges
  Link.wing(E, enew.pcw)
  Link.wing(E, enew.nccw)
  // replace enew if ped of face or vertex links
  if(Object.is(V.ped, enew)) V.ped = E
  if(Object.is(E.nface.ped, enew)) E.nface.ped = E
  if(Object.is(E.pface.ped, enew)) E.pface.ped = E
  // kill entities and return "repaired" edge
  BFEV_MAKE.KLV(vnew)
  BFEV_MAKE.KLE(enew)
  return E
}
```
-->
