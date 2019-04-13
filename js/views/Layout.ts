import * as m from "mithril";

const layout = {
    /**
     * Render the app container.
     */
    view: (vnode: m.Vnode) => {
        return [
            m(`section.section`, [
                m(`.container`, vnode.children),
            ]),
        ];
    },
};

export default (view: any) => {
    return {
        render: () => m(layout, m(view)),
    }
}
