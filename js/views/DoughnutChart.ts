import * as m from "mithril";

import doughnutModel from "../models/Doughnut";
import chartComponent from "../components/Chart";

export default {
    /**
     * Render the view for the Doughnut chart.
     */
    view: (vnode: m.Vnode) => {
        return [
            m("h1.title", "Doughnut Chart of the Employees"),
            m(".columns", [
                doughnutModel.loaded ? m(".column", m(chartComponent, { model: doughnutModel })) : m(".coolumn", "Loading ...")
            ]),
        ];
    },
};