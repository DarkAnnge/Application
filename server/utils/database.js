import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('réservation de mobile home', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
});

export default sequelize;