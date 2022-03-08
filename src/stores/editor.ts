import { stringToNode } from "@/views/utils";
import { defineStore } from "pinia";

export const useEditorStore = defineStore({
  id: "editor",
  state: (): State => {
    return {
      wrapElement: undefined,
    };
  },
  // "<h1 class=\"text-center text-yellow-500\">这是标题1</h1>"
  actions: {
    changeClassName(uuid: string, className: string) {
      const node = this.wrapElement?.querySelector(`[data-uuid="${uuid}"]`);
      if (node) {
        node.className = className;
      }
    },

    init(wrapElement: Element) {
      this.wrapElement = wrapElement;
    },

    // 添加元素到画布
    // el存在 会放在el后面
    addNode(str: string, el?: HTMLElement | null) {
      const newEl = stringToNode(str);
      if (el && el.id != "iframe-main") {
        const parentNode = el.parentNode;
        const referenceNode = this.wrapElement?.querySelector(
          `[data-uuid="${el.getAttribute("data-uuid")}"]`
        );
        if (typeof newEl != "string" && referenceNode) {
          // parentNode === wrapElement 的情况，如果不是暂未测试
          parentNode?.insertBefore(newEl, referenceNode.nextSibling);
        }
      } else {
        this.wrapElement?.append(newEl);
      }
    },
  },
});

interface State {
  wrapElement: Element | undefined;
}