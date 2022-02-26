export const nodeToJson = (currentNode, jQuery) => {
  const node = {};
  Object.entries(currentNode.attr()).forEach(([key, value]) => {
    if (key === 'class') {
      node[key] = value.split(' ').filter((cl) => !!cl.length);
    } else {
      node[key] = value;
    }
  });
  node['tag'] = currentNode[0].name;
  node['children'] = [];
  if (isTextElement(currentNode.children())) {
    node['textNode'] = currentNode
      .text()
      .replace(/\n|\s{2,}/g, ' ')
      .trim();
  }
  for (const child of currentNode.children()) {
    node['children'].push(nodeToJson(jQuery(child), jQuery));
  }
  return node;
};

const isTextElement = (currentNode) => {
  return !currentNode.length;
};
