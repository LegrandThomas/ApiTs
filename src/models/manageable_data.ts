import { Table, Model, Column, DataType } from "sequelize-typescript";



@Table({
    timestamps: true,
    tableName: "manageable_data",
  })
  export class manageable_data extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    nom_manageable_data!: string;
  
    @Column({
      type: DataType.REAL,
      allowNull: false,
    })
    valeur_manageable_data!: string;

    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    createdAt!: Date;
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    updatedAt!: Date;
  }