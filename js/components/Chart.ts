import * as m from "mithril";
import * as ChartJS from "chart.js";

import { randomizeData, reloadData } from "../utils/utils";

export default {
    /**
     * Render the Chart.
     */
    view: (vnode: m.Vnode<any>) => {
        const model = vnode.attrs.model

        return m(`.${model.config.type}`, [
            m(".canvas-container", [
                m("canvas.chart-canvas", {
                    oncreate: (vnode: m.VnodeDOM) => {
                        const dom = <HTMLCanvasElement>vnode.dom;
                        const ctx = dom.getContext("2d");
                        model.instance = new ChartJS(ctx, model.config);
                    }
                }),
            ]),
            m("a.button[href='#']#randomizeData", {

                onclick: (e: Event) => {
                    e.preventDefault();
                    randomizeData(model);
                }
            }, 'Randomize Data'),
            m("a.button[href='#']#reloadData", {
                onclick: (e: Event) => {
                    e.preventDefault();
                    reloadData(model);
                }
            }, "Reload Data"),
        ]);
    }
};
