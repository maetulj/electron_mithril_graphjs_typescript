import * as m from "mithril";
import Layout from "./views/Layout";

// Models.
import doughnutModel from "./models/Doughnut";

// Views.
import doughnutChart from "./views/DoughnutChart";

// Fetch data.
doughnutModel.getData();

// Create routes for the app.
const routes = {
    "/": Layout(doughnutChart)
};

// Register routes. Add to document body.
m.route(document.body, "/", routes);
