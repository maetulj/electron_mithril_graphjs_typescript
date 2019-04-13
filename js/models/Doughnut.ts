import * as m from "mithril";
import { chartColors } from "../utils/utils";

/**
 * Interface for the Items object.
 */
interface Items {
    labels: string[];
    employees: string[];
};

/**
 * Default export the Doughnut ChartJS object.
 */
export default {
    loaded: false,
    instance: undefined,
    config: {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                label: 'Dataset 1',
                data: [],
                backgroundColor: [
                    chartColors.red,
                    chartColors.orange,
                    chartColors.yellow,
                    chartColors.green,
                    chartColors.blue,
                    chartColors.grey
                ]
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Employees'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    },
    /**
     * Get data from the doughnut.json file.
     */
    getData() {
        m.request({
            method: 'GET',
            url: '../data/doughnut.json',
        })
            .then((items: Items) => {
                this.config.data.labels = items.labels;
                this.config.data.datasets[0].data = items.employees;
                this.loaded = true;
            });
    }
};