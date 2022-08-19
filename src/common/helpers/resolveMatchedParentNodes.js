// 从数组中查找出元素的所有父节点
function resolveMatchedParentNodes(id, nodes) {
  const result = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === id) {
      const { children, ...self } = node;
      result.push({ ...self });
      break;
    } else if (node.children) {
      const matched = resolveMatchedParentNodes(id, node.children);
      if (matched.length) {
        const { children, ...self } = node;
        result.push({ ...self });
        result.push(...matched);
        break;
      }
    }
  }
  return result;
}

export default resolveMatchedParentNodes;
