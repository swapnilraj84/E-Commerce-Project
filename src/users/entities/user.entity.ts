import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "src/utility/common/user-roles.enum";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    name: string;
    @Column()
    password: string;
    @Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
    roles:Roles[]
}


