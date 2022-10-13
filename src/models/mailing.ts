
import { Table, Model, Column, DataType, } from "sequelize-typescript";



@Table({
    timestamps: true,
    tableName: "contact_form",
  })
  export class contact_form extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    nom_contact!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    prenom_contact!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    email_contact!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      societe_contact!: string;

      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      message_contact!: string;

     
  }