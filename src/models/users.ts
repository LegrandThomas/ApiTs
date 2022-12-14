import { Table, Model, Column, DataType, Unique } from "sequelize-typescript";



@Table({
    timestamps: true,
    tableName: "users",
  })
  export class Users extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string;
    
    
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique:true,
    })
    email!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password!: string;

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