export class TreeNodeValue {
  value: string | number;
  constructor(value: string | number) {
    this.value = value;
  }

  toString() {
    return String(this.value);
  }
}

export class TreeNode {
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  parent: TreeNode | null = null;
  value: string | number;

  constructor(value: string | number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  get leftHeight(): number {
    if (!this.left) {
      return 0;
    }
    return this.left.height + 1;
  }

  get rightHeight(): number {
    if (!this.right) {
      return 0;
    }
    return this.right.height + 1;
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  setLeft(node: TreeNode | null) {
    if (this.left) {
      this.left.parent = null;
    }
    this.left = node;
    if (this.left) {
      this.left.parent = this;
    }
    return this;
  }

  setRight(node: TreeNode | null) {
    if (this.right) {
      this.right.parent = null;
    }
    this.right = node;
    if (this.right) {
      this.right.parent = this;
    }
    return this;
  }
}
