const Node = require('./node')

const _keys    = [ 0, 1,    '1', {1: 0} ],
      _values  = [ 1, null, '0', {}     ],
      _nodes   = 4

test('new Node has correct <k,v>', () => {
  const node = new Node(_keys[0], _values[0])
  expect(node.key).toBe(_keys[0])
  expect(node.value).toBe(_values[0])
})

test('new Node with no arguments has undefined <k,v>', () => {
  const node = new Node()
  expect(node.key).toBeUndefined()
  expect(node.value).toBeUndefined()
})

test('new Node has null links', () => {
  const node = new Node()
  expect(node.next).toBe(null)
  expect(node.prev).toBe(null)
})
