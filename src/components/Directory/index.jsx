import React, { useState } from "react";
import { UncontrolledTreeEnvironment, Tree } from "react-complex-tree";
import "react-complex-tree/lib/style.css";

function Directory() {
  const [items, setItems] = useState({
    root: {
      index: "root",
      isFolder: true,
      children: [],
      data: "Root item",
    },
  });

  const handleAddFolder = () => {
    const newItemIndex = `folder${Object.keys(items).length + 1}`;
    const newItem = {
      index: newItemIndex,
      isFolder: true,
      canRename: true,
      children: [],
      data: `Folder ${newItemIndex}`,
    };

    const updatedItems = {
      ...items,
      [newItemIndex]: newItem,
      root: {
        ...items.root,
        children: [...items.root.children, newItemIndex],
      },
    };

    setItems(updatedItems);
  };

  const handleAddFile = () => {
    const newItemIndex = `file${Object.keys(items).length + 1}`;
    const newItem = {
      index: newItemIndex,
      children: [],
      canRename: true,
      data: `File ${newItemIndex}`,
    };

    const updatedItems = {
      ...items,
      [newItemIndex]: newItem,
      root: {
        ...items.root,
        children: [...items.root.children, newItemIndex],
      },
    };

    setItems(updatedItems);
  };

  const dataProvider = {
    getTreeItem: (itemId) => Promise.resolve(items[itemId]),
    onChangeItemChildren: (itemId, newChildren) => {
      items[itemId].children = newChildren;
      const changedItemIds = [itemId, ...newChildren];
      Object.values(handlers).forEach((handler) => handler(changedItemIds));
    },
    onDidChangeTreeData: (listener) => {
      const id = (Math.random() + 1).toString(36).substring(7);
      handlers[id] = listener;
      return {
        dispose: () => {
          delete handlers[id];
        },
      };
    },
    onRenameItem: function (item, newName) {
      item.data = newName;
    },
  };

  const handleSelectItems = (items, treeId) => {
    console.log(items);
    console.log(treeId);
  };

  const handlers = {};
  const setItemName = null;

  return (
    <div>
      <UncontrolledTreeEnvironment
        key={Object.keys(items).length} // Add key prop
        dataProvider={dataProvider}
        getItemTitle={(item) => {
          // console.log(item);
          // console.log(item.data);
          return item.data;
        }}
        viewState={{}}
        canDragAndDrop={true}
        onSelectItems={handleSelectItems}
        canDropOnFolder={true}
        canReorderItems={true}
        canRename={true}
        onRenameItem={dataProvider.onRenameItem}
      >
        <div>
          <button className="btn" onClick={handleAddFolder}>
            Make a folder
          </button>
          <button className="btn" onClick={handleAddFile}>
            Make a file
          </button>
        </div>
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment>
    </div>
  );
}

export default Directory;
