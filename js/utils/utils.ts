/**
 * Interface for the data model.
 */
interface Model {
    loaded: Boolean;
    instance: any;
    config: any;
    getData(): void;
};

/**
 * Define some chart colors.
 */
export const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

/**
 * Create a random scaling factor.
 */
export const randomScalingFactor = () => Math.round(Math.random() * 100);

/**
 * Reload the data.
 * 
 * @param model Data model to use.
 */
export const reloadData = (model: Model) => {
    model.loaded = false;
    model.getData();
};

/**
 * Randomize the data.
 * 
 * @param model Data model to use.
 */
export const randomizeData = (model: Model) => {
    model.config.data.datasets.forEach((dataset: any) => {
        dataset.data = dataset.data.map(() => randomScalingFactor());
    });
    model.instance.update();
}