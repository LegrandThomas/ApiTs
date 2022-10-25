import { Table, Model, Column, DataType, Unique } from "sequelize-typescript";



@Table({
    timestamps: true,
    tableName: "users_reviews",
  })
  export class Users_reviews extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    prenom_users_reviews!: string;
    
    
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique:true,
    })
    magasin_enseigne_users_reviews!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    poste_users_reviews!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      commentaire_users_reviews!: string;

      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      photo_users_reviews!: string;

      @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
      })
      pin_users_reviews!: boolean;

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