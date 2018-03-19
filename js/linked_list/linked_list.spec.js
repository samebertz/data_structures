const LinkedList = require('./linked_list')
const Node = require('./node')

const _keys    = [ 0, 1,    '1', {1: 0} ],
      _values  = [ 1, null, '0', {}     ],
      _nodes   = 4

// test('Node has correct <k,v>', () => {
//   let node = new Node(_keys[0], _values[0])
//   expect(node.key).toBe(_keys[0])
//   expect(node.value).toBe(_values[0])
// })
//
// test('Node with no arguments has <k,v> undefined', () => {
//   let node = new Node()
//   expect(node.key).toBeUndefined()
//   expect(node.value).toBeUndefined()
// })
//
// test('Node has null links', () => {
//   let node = new Node()
//   expect(node.next).toBe(null)
//   expect(node.prev).toBe(null)
// })

describe('new LinkedList', () => {
  test('has null head', () => {
    const list = new LinkedList()
    expect(list.head).toBe(null)
  })
  test('has 0 length', () => {
    const list = new LinkedList()
    expect(list.length).toBe(0)
  })
})

describe('list insert', () => {
  test('updates list head and length', () => {
    const list = new LinkedList()
    const node = new Node()
    list.insert(node)
    expect(list.head).toBe(node)
    expect(list.length).toBe(1)
    const another_node = new Node()
    list.insert(another_node)
    expect(list.head).toBe(another_node)
    expect(list.length).toBe(2)
  })
  test('preserves null links on empty list', () => {
    const list = new LinkedList()
    const node = new Node()
    list.insert(node)
    expect(node.next).toBe(null)
    expect(node.prev).toBe(null)
  })
  test('updates node next and old head prev', () => {
    const list = new LinkedList()
    const head = new Node()
    list.insert(head)
    const node = new Node()
    list.insert(node)
    expect(node.next).toBe(head)
    expect(head.prev).toBe(node)
  })
})

describe('list search', () => {
  test('returns null on empty list', () => {
    const list = new LinkedList()
    expect(list.search(_keys[0])).toBe(null)
  })
  test('returns null when no match is found', () => {
    const list = new LinkedList()
    expect(list.search(_keys[0])).toBe(null)
  })
  test('returns match on single element list', () => {
    const list = new LinkedList()
    const node = new Node(_keys[0], _values[0])
    list.insert(node)
    expect(list.search(_keys[0])).toBe(node)
  })
  test('returns first match', () => {
    const list = new LinkedList()
    const node = new Node(_keys[0], _values[0])
    list.insert(node)
    const node_with_same_key = new Node(_keys[0], _values[1])
    list.insert(node_with_same_key)
    expect(list.search(_keys[0])).toBe(node_with_same_key)
  })
})

describe('list delete', () => {
  test('sets deleted node links to null', () => {
    const list = new LinkedList()
    const node = new Node()
    list.insert(node)
    list.delete(node)
    expect(node.next).toBe(null)
    expect(node.prev).toBe(null)
  })
  test('updates adjacent node links', () => {
    const list = new LinkedList()
    const tail_node = new Node()
    list.insert(tail_node)
    const node = new Node()
    list.insert(node)
    const head_node = new Node()
    list.insert(head_node)
    list.delete(node)
    expect(head_node.next).toBe(tail_node)
    expect(tail_node.prev).toBe(head_node)
  })
  test('properly updates list and next node when deleting head', () => {
    const list = new LinkedList()
    const node = new Node()
    list.insert(node)
    const head_node = new Node()
    list.insert(head_node)
    list.delete(head_node)
    expect(list.head).toBe(node)
    expect(node.prev).toBe(null)
  })
  test('sets head to null and length to 0 on single element list', () => {
    const list = new LinkedList()
    const node = new Node()
    list.insert(node)
    list.delete(node)
    expect(list.head).toBe(null)
    expect(list.length).toBe(0)
  })
})
