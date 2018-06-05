const Ring = require('./ring').Ring,
      Node = require('./ring').Node

// ######
// Node test suite
describe('new Node', () => {
  test('has correct <k,v>', () => {
    let node = new Node(_keys[0], _values[0])
    expect(node.key).toBe(_keys[0])
    expect(node.value).toBe(_values[0])
  })
  test('with no arguments has <k,v> undefined', () => {
    let node = new Node()
    expect(node.key).toBeUndefined()
    expect(node.value).toBeUndefined()
  })
  test('has null links', () => {
    let node = new Node()
    expect(node.next).toBe(null)
    expect(node.prev).toBe(null)
  })
})

describe('new Ring', () => {
  test('has null head', () => {
    const ring = new Ring()
    expect(ring.head).toBe(null)
  })
  test('has 0 length', () => {
    const ring = new Ring()
    expect(ring.length).toBe(0)
  })
})

describe('ring insert', () => {
  test('updates ring length', () => {
    const ring = new Ring()
    const node1 = new Node()
    ring.insert(node1)
    expect(ring.length).toBe(1)
    const node2 = new Node()
    ring.insert(node2)
    expect(ring.length).toBe(2)
  })
  test('updates ring head on empty ring', () => {
    const ring = new Ring()
    const node = new Node()
    ring.insert(node)
    expect(ring.head).toBe(node)
  })
  test('creates circular links on empty ring', () => {
    const ring = new Ring()
    const node = new Node()
    ring.insert(node)
    expect(node.next).toBe(node)
    expect(node.prev).toBe(node)
  })
  test('updates new node links', () => {
    const ring = new Ring()
    const head = new Node()
    ring.insert(head)
    const node = new Node()
    ring.insert(node)
    expect(node.next).toBe(head)
    expect(node.prev).toBe(head)
  })
  test('updates adjacent (head and tail) node links', () => {
    const ring = new Ring()
    const head = new Node()
    ring.insert(head)
    const node1 = new Node()
    ring.insert(node1)
    const node2 = new Node()
    ring.insert(node2)
    expect(node1.next).toBe(node2)
    expect(head.prev).toBe(node2)
  })
})

// ######
// Search test suite constants
const _keys    = [ 0, 1,    '1', {1: 0} ],
      _values  = [ 1, null, '0', {}     ],
      _nodes   = 4,
      _notkey  = -1

describe('ring search', () => {
  test('returns null on empty ring', () => {
    const ring = new Ring()
    expect(ring.search(_keys[0])).toBe(null)
  })
  test('returns null when no match is found', () => {
    const ring = new Ring()
    for(let i=0; i<_nodes; i++) {
      ring.insert(new Node(_keys[i], _values[i]))
    }
    expect(ring.search(_notkey)).toBe(null)
  })
  test('returns match on single element ring', () => {
    const ring = new Ring()
    const node = new Node(_keys[0], _values[0])
    ring.insert(node)
    const result = ring.search(_keys[0])
    expect(result).toBe(node)
    expect(result.key).toBe(_keys[0])
    expect(result.value).toBe(_values[0])
  })
  test('returns first match', () => {
    const ring = new Ring()
    const node = new Node(_keys[0], _values[0])
    ring.insert(node)
    for(let i=0; i<_nodes; i++) {
      ring.insert(new Node(_keys[i], _values[i]))
    }
    const result = ring.search(_keys[0])
    expect(result).toBe(node)
  })
})

describe('ring delete', () => {
  test('sets deleted node links to null', () => {
    const ring = new Ring()
    const node = new Node()
    ring.insert(node)
    ring.delete(node)
    expect(node.next).toBe(null)
    expect(node.prev).toBe(null)
  })
  test('updates adjacent node links', () => {
    const ring = new Ring()
    const head = new Node()
    ring.insert(head)
    const node = new Node()
    ring.insert(node)
    ring.delete(node)
    expect(head.next).toBe(head)
    expect(head.prev).toBe(head)
  })
  test('properly updates ring and next node when deleting head', () => {
    const ring = new Ring()
    const head = new Node()
    ring.insert(head)
    const node = new Node()
    ring.insert(node)
    ring.delete(head)
    expect(ring.head).toBe(node)
    expect(node.next).toBe(node)
    expect(node.prev).toBe(node)
  })
  test('sets head to null and length to 0 on single element ring', () => {
    const ring = new Ring()
    const node = new Node()
    ring.insert(node)
    ring.delete(node)
    expect(ring.head).toBe(null)
    expect(ring.length).toBe(0)
  })
})
