/**
 * Walk the DOM
 * Pass through each child node recursively and run the given function
 * @param node
 * @param func
 */
export default function walkDOM(node, func) {
  func(node);
  node = node.firstChild;
  while(node) {
    walkDOM(node, func);
    node = node.nextSibling;
  }
}
