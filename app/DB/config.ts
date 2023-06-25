import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './app.sqlite',
  define: {
    timestamps: false, // Disable timestamps for all models
    underscored: true, // Use underscored naming convention for columns
  },
  logging: false, // Disable logging (optional)
});

export default sequelize;
