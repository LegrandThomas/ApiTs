import { RealDataType } from "sequelize";
import { Table, Model, Column, DataType } from "sequelize-typescript";



@Table({
    timestamps: true,
    tableName: "earnings_simulator",
  })
  export class earnings_simulator extends Model {
    @Column({
      type: DataType.REAL,
      allowNull: false,
    })
    CA!: RealDataType;
  
    @Column({
      type: DataType.REAL,
      allowNull: false,
    })
    marge!: RealDataType;

    @Column({
        type: DataType.REAL,
        allowNull: false,
      })
      CA_avec_WellEat!: RealDataType;

      @Column({
        type: DataType.REAL,
        allowNull: false,
      })
      marge_avec_WellEat!: RealDataType;

      @Column({
        type: DataType.REAL,
        allowNull: false,
      })
      benefice_avec_WellEat!: RealDataType;

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