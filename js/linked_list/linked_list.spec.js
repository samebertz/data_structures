const assert = require('assert')
const linkedlist = require('./linked_list')

const Node = linkedlist.Node
const LinkedList = linkedlist.LinkedList

// var tests = []
// function setup() {
//   const SUCCESS = '%s: successful',
//         ERROR_ASSERT = '%s: failed: assert( %o )'
//   var test_node_keys = [0, 1, '1', {1: 0}],
//       test_node_values = [1, null, '0', {}],
//       test_nodes = Math.min(test_node_keys.length, test_node_values.length)
//   function success(id) {
//     console.log(SUCCESS, id)
//   }
//   function assert(assertion, id) {
//     if(!assertion()) {
//       console.error(ERROR_ASSERT, id, assertion)
//       // console.log(assertion.SCOPES)
//       return 1
//     } else {
//       return 0
//     }
//   }
//   /* function test() {
//     var test_name = 'test_name'
//     assert(() => {}, test_name)
//     success(test_name)
//   }
//   test() */
//   tests.push(() => {
//     var test_name = 'test_node_constructor',
//         results = 0
//     for(let i = 0; i < test_nodes; i++) {
//       let node = new Node(test_node_keys[i], test_node_values[i])
//       results += assert(() => node.key === test_node_keys[i], test_name)
//       results += assert(() => node.value === test_node_values[i], test_name)
//     }
//     if (results == 0) success(test_name)
//   })
//   tests.push(() => {
//     var test_name = 'test_linkedlist_constructor',
//         results = 0
//     var list = new LinkedList()
//     results += assert(() => list.head === null, test_name)
//     results += assert(() => list.length === 0, test_name)
//     if (results == 0) success(test_name)
//   })
//   tests.push(() => {
//     var test_name = 'test_insert',
//         results = 0
//     var list = new LinkedList()
//     for(let i = 0; i < test_nodes; i++) {
//       let old_head = list.head
//       let node = new Node(test_node_keys[i], test_node_values[i])
//       list.insert(node)
//       results += assert(() => list.head === node, test_name)
//       results += assert(() => node.next === old_head, test_name)
//     }
//     if (results == 0) success(test_name)
//   })
//   tests.push(() => {
//     var test_name = 'test_search',
//         results = 0
//     var list = new LinkedList(),
//         nodes = []
//     for(let i = 0; i < test_nodes; i++) {
//       let node = new Node(test_node_keys[i], test_node_values[i])
//       list.insert(node)
//       nodes.push(node)
//       results += assert(() => {
//         let found = list.search(node.key)
//         return found === node && found.value === node.value
//       }, test_name)
//     }
//     results += assert(() => list.search(test_node_keys[0]) === nodes[0], test_name)
//     if (results == 0) success(test_name)
//   })
//   tests.push(() => {
//     var test_name = 'test_delete',
//         results = 0
//     var list = new LinkedList(),
//         nodes = []
//     for(let i = 0; i < test_nodes; i++) {
//       let node = new Node(test_node_keys[i], test_node_values[i])
//       list.insert(node)
//       nodes.push(node)
//     }
//     for(let i = 0; i < nodes.length; i++) {
//       list.delete(nodes[i])
//       results += assert(() => list.search(nodes[i].key) === null, test_name)
//     }
//     if (results == 0) success(test_name)
//   })
//   tests.push(() => {
//     var test_name = 'test_delete_key',
//         results = 0
//     var list = new LinkedList(),
//         nodes = []
//     for(let i = 0; i < test_nodes; i++) {
//       let node = new Node(test_node_keys[i], test_node_values[i])
//       list.insert(node)
//       nodes.push(node)
//     }
//     for(let i = 0; i < nodes.length; i++) {
//       list.delete_key(test_node_keys[i])
//       results += assert(() => list.search(test_node_keys[i]) === null, test_name)
//     }
//     if (results == 0) success(test_name)
//   })
// }
// function run() { for(test of tests) test() }
